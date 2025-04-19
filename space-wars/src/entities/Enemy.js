import { BasePlayer } from "./BasePlayer.js";
import { PlasmaBall } from "./PlasmaBall.js";
import { Bolt } from "./Bolt.js";

const enemySprite = new Image();
enemySprite.src = "./src/assets/enemy-run.png";
let isEnemySpriteLoaded = false;

enemySprite.onload = () => {
  isEnemySpriteLoaded = true;
};

export class Enemy extends BasePlayer {
  constructor(x, y) {
    super(x, y);
    this.isHero = false;
    this.maxHealth = 100;
    this.health = this.maxHealth;

    // AI properties
    this.aiUpdateTimer = 0;
    this.aiUpdateInterval = 60;
    this.aiTargetX = x;
    this.isDodging = false;
    this.dodgeDirection = 1;
    this.dodgeCooldown = 60;

    // Reduce initial difficulty properties
    this.difficultyLevel = 1;
    this.baseAccuracyError = 0.2; // Increased from 0.1 for more initial spread
    this.baseFireRate = 0.015; // Reduced from 0.03 for slower initial firing
    this.baseDodgeDistance = 300; // Reduced from 400 for less dodging
  }

  updateDifficultyLevel(score) {
    this.difficultyLevel = Math.floor(score / 500) + 1;

    // More gradual accuracy and fire rate scaling
    this.baseAccuracyError = Math.max(
      0.2 - (this.difficultyLevel - 1) * 0.015,
      0.02
    );
    this.baseFireRate = Math.min(
      0.015 + (this.difficultyLevel - 1) * 0.008,
      0.08
    );
    this.baseDodgeDistance = Math.min(
      300 + (this.difficultyLevel - 1) * 40,
      600
    );
  }

  calculateTargetAngle(targetPlayer) {
    const dx = targetPlayer.x - this.x;
    const dy = targetPlayer.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Scale gravity effect based on canvas width
    const canvasWidth = document.querySelector("canvas").width;
    const baseGravity = 0.03;
    const gravityScale = Math.min(1920 / canvasWidth, 2);
    const gravity = baseGravity * gravityScale;

    // Adjust plasma speed based on distance and difficulty
    const basePlasmaSpeed = 12;
    const distanceScale = Math.min(distance / 800, 1.5);
    const plasmaSpeed = basePlasmaSpeed * distanceScale;

    const time = distance / plasmaSpeed;

    // Enhanced prediction of target movement
    const predictedX = targetPlayer.x + targetPlayer.velocity.x * time * 0.5;
    const predictedY = targetPlayer.y + targetPlayer.velocity.y * time * 0.5;

    // Calculate gravity compensation
    const gravityAdjustment = 0.5 * gravity * time * time;

    // Aim at predicted position with gravity compensation
    const targetY = predictedY - gravityAdjustment;
    return Math.atan2(targetY - this.y, predictedX - this.x);
  }

  shouldDodge(projectiles) {
    if (!projectiles || projectiles.length === 0) return false;

    for (const projectile of projectiles) {
      if (projectile instanceof Bolt) {
        const dx = projectile.x - this.x;
        const dy = projectile.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Use enhanced dodge distance based on difficulty
        if (distance < this.baseDodgeDistance) {
          const platformSpace = {
            left: this.x - (this.platform.x - this.platform.width / 2),
            right: this.platform.x + this.platform.width / 2 - this.x,
          };

          this.dodgeDirection =
            platformSpace.left > platformSpace.right
              ? projectile.velocity.x > 0
                ? -1
                : 1
              : projectile.velocity.x > 0
              ? -1
              : 1;

          return true;
        }
      }
    }
    return false;
  }

  updateAI(targetPlayer, projectiles) {
    this.aiUpdateTimer++;

    if (!this.isDodging) {
      const activePlasmaBalls = projectiles.filter(
        (p) => p instanceof PlasmaBall
      ).length;
      if (activePlasmaBalls >= 2) return;

      const dx = targetPlayer.x - this.x;
      const distance = Math.abs(dx);
      const shouldFire =
        Math.random() < this.baseFireRate &&
        !this.isDodging &&
        this.aiUpdateTimer > Math.max(180 - this.difficultyLevel * 20, 100);

      if (shouldFire && projectiles) {
        const targetAngle = this.calculateTargetAngle(targetPlayer);
        const distance = Math.abs(targetPlayer.x - this.x);

        // Scale accuracy based on distance and difficulty
        const baseAccuracy = this.baseAccuracyError;
        const distanceAccuracy = Math.min(distance / 1200, 0.2);
        const accuracyFactor = Math.min(
          distanceAccuracy * (1 - (this.difficultyLevel - 1) * 0.15),
          baseAccuracy
        );

        const randomSpread = (Math.random() - 0.5) * accuracyFactor;

        // Scale plasma speed with distance and difficulty
        const baseSpeed = 10;
        const distanceBonus = Math.min(distance / 800, 1.5);
        const difficultyBonus = Math.min(this.difficultyLevel * 0.5, 2);
        const plasmaSpeed = baseSpeed * distanceBonus * (1 + difficultyBonus);

        const plasma = new PlasmaBall(
          this.x,
          this.y,
          targetAngle + randomSpread,
          plasmaSpeed
        );
        projectiles.push(plasma);
        this.aiUpdateTimer = -Math.max(120 - this.difficultyLevel * 10, 80);
      }
    }

    if (!this.isDodging && this.shouldDodge(projectiles)) {
      this.isDodging = true;
      this.lastDodgeTime = 0;
      this.maxSpeed = 8;
    }

    this.updateDodging();
    this.updatePositioning(targetPlayer);
  }

  updateDodging() {
    if (this.isDodging) {
      this.lastDodgeTime++;
      const dodgeDistance = this.platform.width * 0.4;
      const dodgeTarget = this.platform.x + dodgeDistance * this.dodgeDirection;
      this.isMovingLeft = dodgeTarget < this.x;
      this.isMovingRight = dodgeTarget > this.x;

      if (this.lastDodgeTime > this.dodgeCooldown) {
        this.isDodging = false;
        this.maxSpeed = 5;
      }
    }
  }

  updatePositioning(targetPlayer) {
    if (!this.isDodging) {
      const dx = targetPlayer.x - this.x;
      const distance = Math.abs(dx);
      const optimalDistance = 350;
      const platformWidth = this.platform.width;
      const playerThreat = targetPlayer.isCharging
        ? targetPlayer.power / 50
        : 0;

      if (playerThreat > 0.7) {
        this.aiTargetX =
          this.platform.x +
          (Math.random() > 0.5 ? -1 : 1) * (platformWidth * 0.4);
      } else if (distance < optimalDistance * 0.7) {
        this.aiTargetX =
          this.platform.x +
          (dx > 0 ? -platformWidth * 0.4 : platformWidth * 0.4);
        this.maxSpeed = 6;
      } else {
        this.maxSpeed = 5;
        if (Math.random() < 0.1) {
          this.aiTargetX =
            this.platform.x + (Math.random() - 0.5) * (platformWidth * 0.8);
        }
      }

      this.isMovingLeft = this.x > this.aiTargetX + 5;
      this.isMovingRight = this.x < this.aiTargetX - 5;
    }
  }

  update(targetPlayer, projectiles, deltaTime) {
    if (this.isDead) {
      this.updateAnimation(deltaTime);
      return;
    }
    this.updateAI(targetPlayer, projectiles);
    this.handleMovement(deltaTime);
    this.applyFriction();
    this.updatePosition(deltaTime);
    this.updateAnimation(deltaTime);
    this.checkPlatformBounds();
  }

  draw(ctx) {
    // Draw health bar with white outline
    const healthBarWidth = this.scale * 4;
    const healthBarHeight = this.scale * 0.4;
    const healthPercentage = this.health / this.maxHealth;
    const healthBarX = this.x - healthBarWidth / 2;
    const healthBarY = this.y - this.spriteScale - healthBarHeight;

    // Health bar
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(
      healthBarX,
      healthBarY,
      healthBarWidth * healthPercentage,
      healthBarHeight
    );

    // Draw sprite
    if (isEnemySpriteLoaded) {
      ctx.save();
      if (this.facingRight) {
        ctx.scale(-1, 1);
        ctx.translate(-this.x * 2, 0);
      }

      ctx.drawImage(
        enemySprite,
        this.frameIndex * this.spriteWidth,
        this.spriteRow * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - this.spriteScale * 0.5,
        this.y - this.spriteScale * 0.8,
        this.spriteScale,
        this.spriteScale
      );
      ctx.restore();
    }
  }
}

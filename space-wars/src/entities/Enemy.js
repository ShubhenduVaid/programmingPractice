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
  }

  calculateTargetAngle(targetPlayer) {
    const dx = targetPlayer.x - this.x;
    const dy = targetPlayer.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const gravity = 0.03;
    const plasmaSpeed = 12;
    const time = distance / plasmaSpeed;
    const gravityAdjustment = 0.5 * gravity * time * time;
    const targetY =
      targetPlayer.y - gravityAdjustment + targetPlayer.velocity.y * time;
    return Math.atan2(targetY - this.y, dx);
  }

  shouldDodge(projectiles) {
    if (!projectiles || projectiles.length === 0) return false;

    for (const projectile of projectiles) {
      if (projectile instanceof Bolt) {
        const dx = projectile.x - this.x;
        const dy = projectile.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const futureX = projectile.x + projectile.velocity.x * 5;
        const futureY = projectile.y + projectile.velocity.y * 5;
        const futureDx = futureX - this.x;
        const futureDy = futureY - this.y;
        const futureDistance = Math.sqrt(
          futureDx * futureDx + futureDy * futureDy
        );

        if (futureDistance < distance && distance < 400) {
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
      const optimalDistance = 350;
      const shouldFire =
        Math.random() < 0.03 && !this.isDodging && this.aiUpdateTimer > 180;

      if (shouldFire && projectiles) {
        const targetAngle = this.calculateTargetAngle(targetPlayer);
        const accuracyFactor = Math.min(distance / 2000, 0.1);
        const randomSpread = (Math.random() - 0.5) * accuracyFactor;
        const plasma = new PlasmaBall(
          this.x,
          this.y,
          targetAngle + randomSpread,
          12
        );
        projectiles.push(plasma);
        this.aiUpdateTimer = -120;
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

import { PlasmaBall } from "./PlasmaBall.js";
import { Bolt } from "./Bolt.js";

// Add enemy sprite loading at the top
const heroSprite = new Image();
const enemySprite = new Image();
heroSprite.src = "./src/assets/knight-run.png";
enemySprite.src = "./src/assets/enemy-run.png";
let isHeroSpriteLoaded = false;
let isEnemySpriteLoaded = false;

heroSprite.onload = () => {
  isHeroSpriteLoaded = true;
};

enemySprite.onload = () => {
  isEnemySpriteLoaded = true;
};

export class Player {
  constructor(x, y, isHero) {
    this.x = x;
    this.y = y;
    this.isHero = isHero;
    this.angle = 0;
    this.power = 0;
    this.isCharging = false;
    this.scale = Math.min(window.innerWidth, window.innerHeight) * 0.03;

    // Movement properties
    this.velocity = { x: 0, y: 0 };
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.platform = null;

    // Animation properties
    this.legAngle = 0;
    this.legAnimationSpeed = 0.2;
    this.acceleration = 0.5;
    this.maxSpeed = 5;
    this.friction = 0.85;
    this.bodyBob = 0;
    this.facingRight = true;

    // Add AI properties for enemy
    this.aiUpdateTimer = 0;
    this.aiUpdateInterval = 60;
    this.aiTargetX = x;

    // Add sprite properties
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 8;
    this.numberOfFrames = 8;
    this.spriteWidth = 64; // Each frame is 64x64
    this.spriteHeight = 64;
    this.spriteScale = this.scale * 4.5;
    this.spriteRow = 11; // Use 12th row (0-based index)

    // Add dodge properties for enemy
    this.lastDodgeTime = 0;
    this.isDodging = false;
    this.dodgeDirection = 1;
    this.dodgeCooldown = 60; // frames

    // Update health properties based on player type
    this.maxHealth = isHero ? 150 : 100; // Hero gets 50% more health
    this.health = this.maxHealth;

    // Add death animation properties
    this.isDead = false;
    this.deathAnimationStarted = false;
    this.originalSpriteRow = 11;
    this.deathSpriteRow = 20;
  }

  calculateTargetAngle(targetPlayer) {
    const dx = targetPlayer.x - this.x;
    const dy = targetPlayer.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Simpler and more direct targeting
    const gravity = 0.03; // Match plasma ball gravity
    const plasmaSpeed = 12;

    // Calculate time to reach target
    const time = distance / plasmaSpeed;
    const gravityAdjustment = 0.5 * gravity * time * time;

    // Aim slightly above target to compensate for gravity
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

        // Predict bolt's future position
        const futureX = projectile.x + projectile.velocity.x * 5;
        const futureY = projectile.y + projectile.velocity.y * 5;
        const futureDx = futureX - this.x;
        const futureDy = futureY - this.y;
        const futureDistance = Math.sqrt(
          futureDx * futureDx + futureDy * futureDy
        );

        // If bolt is getting closer, consider dodging
        if (futureDistance < distance && distance < 400) {
          // Determine optimal dodge direction based on platform space and bolt trajectory
          const platformSpace = {
            left: this.x - (this.platform.x - this.platform.width / 2),
            right: this.platform.x + this.platform.width / 2 - this.x,
          };

          // Choose direction with more space and away from bolt
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
    // Don't update AI if dead
    if (this.isDead || this.isHero) return;

    if (!this.isHero) {
      this.aiUpdateTimer++;

      if (!this.isDodging) {
        // Count active plasma balls
        const activePlasmaBalls = projectiles.filter(
          (p) => p instanceof PlasmaBall
        ).length;

        // Early return if too many plasma balls are active
        if (activePlasmaBalls >= 2) {
          return;
        }

        const dx = targetPlayer.x - this.x;
        const distance = Math.abs(dx);
        const optimalDistance = 350;
        const platformWidth = this.platform.width;

        // More controlled firing logic with increased chance
        const shouldFire =
          Math.random() < 0.03 && !this.isDodging && this.aiUpdateTimer > 180; // Reduced delay to 2 seconds (120 frames at 60fps)

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
          this.aiUpdateTimer = -120; // 2 second cooldown (reduced from -300)
        }

        // Rest of the AI movement logic...
      }

      // Check for dodge with improved prediction
      if (!this.isDodging && this.shouldDodge(projectiles)) {
        this.isDodging = true;
        this.lastDodgeTime = 0;
        this.maxSpeed = 8; // Faster dodge speed
      }

      if (this.isDodging) {
        this.lastDodgeTime++;
        const platformWidth = this.platform.width; // Get width from platform reference
        const dodgeDistance = platformWidth * 0.4; // Increased dodge distance

        const dodgeTarget =
          this.platform.x + dodgeDistance * this.dodgeDirection;
        this.isMovingLeft = dodgeTarget < this.x;
        this.isMovingRight = dodgeTarget > this.x;

        if (this.lastDodgeTime > this.dodgeCooldown) {
          this.isDodging = false;
          this.maxSpeed = 5;
        }
      } else {
        // Strategic positioning
        const dx = targetPlayer.x - this.x;
        const distance = Math.abs(dx);
        const optimalDistance = 350; // Reduced optimal distance for better shots
        const platformWidth = this.platform.width; // Get width from platform reference

        // Calculate threat level based on player's charge
        const playerThreat = targetPlayer.isCharging
          ? targetPlayer.power / 50
          : 0;

        // Adjust position based on threat
        if (playerThreat > 0.7) {
          // High threat - move more erratically
          this.aiTargetX =
            this.platform.x +
            (Math.random() > 0.5 ? -1 : 1) * (platformWidth * 0.4);
        } else if (distance < optimalDistance * 0.7) {
          // Too close - back away quickly
          this.aiTargetX =
            this.platform.x +
            (dx > 0 ? -platformWidth * 0.4 : platformWidth * 0.4);
          this.maxSpeed = 6;
        } else {
          // Normal positioning
          this.maxSpeed = 5;
          if (Math.random() < 0.1) {
            // Occasionally change position
            this.aiTargetX =
              this.platform.x + (Math.random() - 0.5) * (platformWidth * 0.8);
          }
        }

        this.isMovingLeft = this.x > this.aiTargetX + 5;
        this.isMovingRight = this.x < this.aiTargetX - 5;

        // More aggressive firing logic
        const shouldFire =
          Math.random() < 0.3 && // Increased firing chance
          distance < optimalDistance * 1.8 && // Increased range
          !this.isDodging;

        if (shouldFire && projectiles) {
          const targetAngle = this.calculateTargetAngle(targetPlayer);
          // Reduced spread for more accuracy
          const accuracyFactor = Math.min(distance / 1200, 0.15);
          const randomSpread = (Math.random() - 0.5) * accuracyFactor;

          const plasma = new PlasmaBall(
            this.x,
            this.y,
            targetAngle + randomSpread,
            8 + Math.random() * 4 // Increased power range
          );
          projectiles.push(plasma);
          this.aiUpdateTimer = -120; // Reduced cooldown
        }
      }
    }
  }

  update(targetPlayer, projectiles) {
    // Skip all updates if dead, except animation
    if (this.isDead) {
      this.updateAnimation();
      return;
    }

    this.updateAI(targetPlayer, projectiles);
    this.handleMovement();
    this.applyFriction();
    this.updatePosition();
    this.updateAnimation();
    this.checkPlatformBounds();
  }

  handleMovement() {
    // Horizontal movement with acceleration
    if (this.isMovingLeft) {
      this.velocity.x -= this.acceleration;
      this.facingRight = false;
    }
    if (this.isMovingRight) {
      this.velocity.x += this.acceleration;
      this.facingRight = true;
    }

    // Vertical movement
    if (this.isMovingUp) {
      this.velocity.y -= this.acceleration;
    }
    if (this.isMovingDown) {
      this.velocity.y += this.acceleration;
    }

    // Apply speed limits
    this.velocity.x = Math.max(
      Math.min(this.velocity.x, this.maxSpeed),
      -this.maxSpeed
    );
    this.velocity.y = Math.max(
      Math.min(this.velocity.y, this.maxSpeed),
      -this.maxSpeed
    );
  }

  applyFriction() {
    if (!this.isMovingLeft && !this.isMovingRight) {
      this.velocity.x *= this.friction;
    }
    if (!this.isMovingUp && !this.isMovingDown) {
      this.velocity.y *= this.friction;
    }
  }

  updatePosition() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  updateAnimation() {
    if (this.isDead) {
      this.tickCount++;
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.frameIndex < this.numberOfFrames - 1) {
          this.frameIndex++;
        }
      }
      return;
    }
    const speed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y
    );
    if (speed > 0.1) {
      this.bodyBob = Math.sin(this.legAngle * 2) * 0.1 * this.scale;
      this.legAngle += this.legAnimationSpeed * (speed / this.maxSpeed);

      this.tickCount++;
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
      }
    } else {
      this.bodyBob *= 0.8;
      this.legAngle *= 0.8;
      this.frameIndex = 0;
    }
  }

  checkPlatformBounds() {
    if (this.platform) {
      const playerWidth = this.scale * 1.5;
      const platformLeftEdge =
        this.platform.x - this.platform.width / 2 + playerWidth * 0.1;
      const platformRightEdge =
        this.platform.x + this.platform.width / 2 - playerWidth * 0.1;
      const playerHeight = this.scale * 3;
      const platformTopEdge =
        this.platform.y - this.platform.height - playerHeight * 0.6;
      const platformBottomEdge = this.platform.y - playerHeight * 0.6;

      // Horizontal bounds
      if (this.x < platformLeftEdge + this.scale) {
        this.x = platformLeftEdge + this.scale;
        this.velocity.x = 0;
      }
      if (this.x > platformRightEdge - this.scale) {
        this.x = platformRightEdge - this.scale;
        this.velocity.x = 0;
      }

      // Vertical bounds
      if (this.y < platformTopEdge + this.scale * 2) {
        this.y = platformTopEdge + this.scale * 2;
        this.velocity.y = 0;
      }
      if (this.y > platformBottomEdge - this.scale * 2) {
        this.y = platformBottomEdge - this.scale * 2;
        this.velocity.y = 0;
      }
    }
  }

  // Add damage method
  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0 && !this.isDead) {
      this.isDead = true;
      this.deathAnimationStarted = true;
      this.frameIndex = 0; // Reset frame index for death animation
      this.spriteRow = this.deathSpriteRow; // Use row 20 for both hero and enemy
      this.ticksPerFrame = 6; // Speed up animation slightly for death

      // Reset any ongoing movement
      this.isMovingLeft = false;
      this.isMovingRight = false;
      this.isMovingUp = false;
      this.isMovingDown = false;
      this.velocity = { x: 0, y: 0 };
      this.isCharging = false;
      this.power = 0;
    }
    return this.health <= 0;
  }

  draw(ctx) {
    // Draw health bar with white outline
    const healthBarWidth = this.scale * 4;
    const healthBarHeight = this.scale * 0.4;
    const healthPercentage = this.health / this.maxHealth;
    const healthBarX = this.x - healthBarWidth / 2;
    const healthBarY = this.y - this.spriteScale - healthBarHeight;

    // White outline
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Health bar background
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Health bar fill
    ctx.fillStyle = this.isHero ? "#3498db" : "#e74c3c";
    ctx.fillRect(
      healthBarX,
      healthBarY,
      healthBarWidth * healthPercentage,
      healthBarHeight
    );

    if (this.isHero && isHeroSpriteLoaded) {
      ctx.save();

      if (!this.facingRight) {
        ctx.scale(-1, 1);
        ctx.translate(-this.x * 2, 0);
      }

      // Draw hero sprite
      ctx.drawImage(
        heroSprite,
        this.frameIndex * this.spriteWidth,
        this.spriteRow * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - this.spriteScale * 0.5,
        this.y - this.spriteScale * 0.8,
        this.spriteScale,
        this.spriteScale
      );

      // Draw bow with adjusted position
      ctx.beginPath();
      ctx.strokeStyle = "brown";
      ctx.lineWidth = 2;
      ctx.arc(
        this.x +
          (this.facingRight
            ? this.spriteScale * 0.25
            : -this.spriteScale * 0.25),
        this.y - this.spriteScale * 0.4,
        this.spriteScale * 0.2,
        -Math.PI / 2 + this.angle - 0.3,
        -Math.PI / 2 + this.angle + 0.3
      );
      ctx.stroke();

      ctx.restore();
    } else if (!this.isHero && isEnemySpriteLoaded) {
      ctx.save();
      if (this.facingRight) {
        ctx.scale(-1, 1);
        ctx.translate(-this.x * 2, 0);
      }

      // Draw enemy sprite with death animation
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
    } else if (this.isHero) {
      // Fallback drawing for hero when sprite isn't loaded
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -1.5 + this.bodyBob / this.scale, 1, 0, Math.PI * 2);
      ctx.moveTo(0, -0.5);
      ctx.lineTo(0, 1.5);
      ctx.stroke();

      ctx.restore();
    } else {
      // Fallback drawing for when sprites aren't loaded
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);

      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -1.5 + this.bodyBob / this.scale, 1, 0, Math.PI * 2);
      ctx.moveTo(0, -0.5);
      ctx.lineTo(0, 1.5);
      ctx.stroke();
      ctx.restore();
    }
  }
}

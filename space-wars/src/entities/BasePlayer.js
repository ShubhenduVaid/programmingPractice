export class BasePlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.scale = Math.min(window.innerWidth, window.innerHeight) * 0.03;

    // Movement properties
    this.velocity = { x: 0, y: 0 };
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.platform = null;
    this.facingRight = true;

    // Add missing movement properties
    this.acceleration = 0.5;
    this.maxSpeed = 5;
    this.friction = 0.85;
    this.legAngle = 0;
    this.legAnimationSpeed = 0.2;
    this.bodyBob = 0;

    // Animation properties
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 8;
    this.numberOfFrames = 8;
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.spriteScale = this.scale * 4.5;
    this.spriteRow = 11;

    // Death animation properties
    this.isDead = false;
    this.deathAnimationStarted = false;
    this.originalSpriteRow = 11;
    this.deathSpriteRow = 20;
  }

  handleMovement(deltaTime) {
    const baseAcceleration = 30; // Units per second
    const adjustedAcceleration = baseAcceleration * deltaTime;

    if (this.isMovingLeft) {
      this.velocity.x -= adjustedAcceleration;
      this.facingRight = false;
    }
    if (this.isMovingRight) {
      this.velocity.x += adjustedAcceleration;
      this.facingRight = true;
    }
    if (this.isMovingUp) {
      this.velocity.y -= adjustedAcceleration;
    }
    if (this.isMovingDown) {
      this.velocity.y += adjustedAcceleration;
    }

    // Apply speed limits
    const maxSpeed = 300 * deltaTime; // Units per second
    this.velocity.x = Math.max(Math.min(this.velocity.x, maxSpeed), -maxSpeed);
    this.velocity.y = Math.max(Math.min(this.velocity.y, maxSpeed), -maxSpeed);
  }

  applyFriction() {
    if (!this.isMovingLeft && !this.isMovingRight) {
      this.velocity.x *= this.friction;
    }
    if (!this.isMovingUp && !this.isMovingDown) {
      this.velocity.y *= this.friction;
    }
  }

  updatePosition(deltaTime) {
    this.x += this.velocity.x * (60 * deltaTime);
    this.y += this.velocity.y * (60 * deltaTime);
  }

  updateAnimation(deltaTime) {
    if (this.isDead) {
      this.tickCount += deltaTime * 60;
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

      if (this.x < platformLeftEdge + this.scale) {
        this.x = platformLeftEdge + this.scale;
        this.velocity.x = 0;
      }
      if (this.x > platformRightEdge - this.scale) {
        this.x = platformRightEdge - this.scale;
        this.velocity.x = 0;
      }
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

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0 && !this.isDead) {
      this.isDead = true;
      this.deathAnimationStarted = true;
      this.frameIndex = 0;
      this.spriteRow = this.deathSpriteRow;
      this.ticksPerFrame = 6;
      this.velocity = { x: 0, y: 0 };
      this.isMovingLeft = false;
      this.isMovingRight = false;
      this.isMovingUp = false;
      this.isMovingDown = false;
      this.isCharging = false;
      this.power = 0;
    }
    return this.health <= 0;
  }
}

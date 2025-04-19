import { BasePlayer } from "./BasePlayer.js";
import { Bolt } from "./Bolt.js";

const heroSprite = new Image();
heroSprite.src = "./assets/knight-run.png"; // Updated path
let isHeroSpriteLoaded = false;

heroSprite.onload = () => {
  isHeroSpriteLoaded = true;
};

export class Hero extends BasePlayer {
  constructor(x, y) {
    super(x, y);
    this.isHero = true;
    this.power = 0;
    this.isCharging = false;
    this.maxHealth = 150;
    this.health = this.maxHealth;
  }

  update(targetPlayer, projectiles, deltaTime) {
    if (this.isDead) {
      this.updateAnimation(deltaTime);
      return;
    }

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
    ctx.fillStyle = "#3498db";
    ctx.fillRect(
      healthBarX,
      healthBarY,
      healthBarWidth * healthPercentage,
      healthBarHeight
    );

    // Draw sprite
    if (isHeroSpriteLoaded) {
      ctx.save();
      if (!this.facingRight) {
        ctx.scale(-1, 1);
        ctx.translate(-this.x * 2, 0);
      }

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

      // Draw bow
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
    }
  }
}

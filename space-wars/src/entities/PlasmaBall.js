import { getProjectileScaleFactors } from "../utils/Constants.js";

export class PlasmaBall {
  constructor(x, y, angle, power) {
    this.x = x;
    this.y = y;
    this.angle = angle;

    // Get dynamic scale factors
    const canvas = document.querySelector("canvas");
    const scaleFactors = getProjectileScaleFactors(canvas.width, canvas.height);

    // Apply scale to velocity with increased power
    this.velocity = {
      x: Math.cos(angle) * power * 1.5 * scaleFactors.powerScale,
      y: Math.sin(angle) * power * 1.5 * scaleFactors.powerScale,
    };

    this.scaleFactors = scaleFactors; // Store for update method
    this.size = 15;
    this.time = 0;
    this.pulseSpeed = 0.1;
    this.lifetime = 300; // Add lifetime counter
  }

  update(deltaTime) {
    this.lifetime -= deltaTime * 60;
    if (this.lifetime <= 0) return false;

    // Reduce gravity effect for longer range
    this.velocity.y += this.scaleFactors.gravityScale * 0.7 * deltaTime * 60;
    this.velocity.x *= Math.pow(
      this.scaleFactors.airResistance,
      deltaTime * 15
    ); // Reduced air resistance

    this.x += this.velocity.x * deltaTime * 30;
    this.y += this.velocity.y * deltaTime * 30;
    this.time += this.pulseSpeed * deltaTime * 60;

    // Faster projectile decay
    if (this.lifetime < 100) {
      this.size *= Math.pow(0.98, deltaTime * 60);
    }

    return true;
  }

  draw(ctx) {
    // Guard against invalid coordinates
    if (!Number.isFinite(this.x) || !Number.isFinite(this.y)) {
      return;
    }

    ctx.save();

    // Outer glow
    const gradientSize = Math.max(
      this.size * (1.5 + Math.sin(this.time) * 0.2),
      0
    );

    try {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        gradientSize
      );

      gradient.addColorStop(0, "rgba(0, 255, 100, 0.8)");
      gradient.addColorStop(0.6, "rgba(0, 255, 100, 0.3)");
      gradient.addColorStop(1, "rgba(0, 255, 100, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, gradientSize, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = "#00ff88";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } catch (error) {
      // Fallback drawing if gradient creation fails
      ctx.fillStyle = "#00ff88";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

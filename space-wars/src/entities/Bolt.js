import { getProjectileScaleFactors } from "../utils/Constants.js";

export class Bolt {
  constructor(x, y, angle, power) {
    this.x = x;
    this.y = y;
    this.angle = angle;

    // Get dynamic scale factors
    const canvas = document.querySelector("canvas");
    const scaleFactors = getProjectileScaleFactors(canvas.width, canvas.height);

    // Apply scale to velocity with adjusted multiplier for bolts
    this.velocity = {
      x: Math.cos(angle) * power * 2 * scaleFactors.powerScale,
      y: Math.sin(angle) * power * 2 * scaleFactors.powerScale,
    };

    this.scaleFactors = scaleFactors;
    this.particles = [];
    this.time = 0;
    this.size = 25;
    this.lifetime = 300; // Add lifetime like PlasmaBall
  }

  update(deltaTime) {
    this.lifetime -= deltaTime * 60;
    if (this.lifetime <= 0) return false;

    // Scale velocity changes with deltaTime
    const gravityPerFrame = this.scaleFactors.gravityScale * 5; // Reduced from 10
    this.velocity.y += gravityPerFrame * deltaTime * 60;
    this.velocity.x *= Math.pow(
      this.scaleFactors.airResistance,
      deltaTime * 30
    ); // Reduced from 60

    // Scale position updates
    this.x += this.velocity.x * deltaTime * 30; // Reduced from 60
    this.y += this.velocity.y * deltaTime * 30; // Reduced from 60
    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
    this.time += 0.1 * deltaTime * 60;

    // Add new particles scaled by deltaTime
    if (Math.random() < 0.5 * deltaTime * 60) {
      this.particles.push({
        x: this.x,
        y: this.y,
        life: 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }

    // Update particles with deltaTime
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * deltaTime * 60;
      p.y += p.vy * deltaTime * 60;
      p.life -= 0.05 * deltaTime * 60;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    return true;
  }

  draw(ctx) {
    ctx.save();

    // Validate particles and filter out invalid ones
    this.particles = this.particles.filter(
      (p) => Number.isFinite(p.x) && Number.isFinite(p.y) && p.life > 0
    );

    // Draw particles with validation
    this.particles.forEach((p) => {
      try {
        if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return;

        const gradient = ctx.createRadialGradient(
          Math.round(p.x),
          Math.round(p.y),
          0,
          Math.round(p.x),
          Math.round(p.y),
          8
        );
        gradient.addColorStop(0, `rgba(255, 220, 100, ${p.life})`);
        gradient.addColorStop(1, "rgba(255, 150, 50, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fill();
      } catch (error) {
        // Fallback rendering for invalid particles
        ctx.fillStyle = `rgba(255, 220, 100, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Validate bolt position before drawing
    if (!Number.isFinite(this.x) || !Number.isFinite(this.y)) {
      ctx.restore();
      return;
    }

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Enhanced glowing effect
    const gradient = ctx.createLinearGradient(-30, 0, 30, 0);
    gradient.addColorStop(0, "rgba(255, 220, 100, 0)");
    gradient.addColorStop(0.5, "rgba(255, 220, 100, 0.8)");
    gradient.addColorStop(1, "rgba(255, 220, 100, 0)");

    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(30, 0);
    ctx.lineWidth = 6;
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Enhanced core
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(20, 0);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.restore();
  }
}

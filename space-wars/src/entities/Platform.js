export class Platform {
  constructor(x, y, width, height, isHero) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isHero = isHero;
    this.time = 0;
    this.chargeLevel = 0;
  }

  setChargeLevel(level) {
    this.chargeLevel = level;
  }

  draw(ctx) {
    this.time += 0.05;

    // Main body gradient with different colors for hero/enemy
    const gradient = ctx.createLinearGradient(
      this.x - this.width / 2,
      this.y - this.height,
      this.x + this.width / 2,
      this.y
    );

    if (this.isHero) {
      gradient.addColorStop(0, "#2c3e50");
      gradient.addColorStop(0.5, "#3498db");
      gradient.addColorStop(1, "#2c3e50");
    } else {
      gradient.addColorStop(0, "#300000");
      gradient.addColorStop(0.5, "#8B0000");
      gradient.addColorStop(1, "#300000");
    }

    // Draw main body
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 3, this.y);
    ctx.lineTo(this.x - this.width / 3, this.y);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = "#95a5a6";
    ctx.stroke();

    // Draw top part
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x - this.width / 3, this.y - this.height);
    ctx.lineTo(this.x + this.width / 3, this.y - this.height);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.closePath();
    ctx.fillStyle = "#34495e";
    ctx.fill();
    ctx.stroke();

    // Draw glowing lights
    const lightPositions = [-0.3, 0, 0.3];
    lightPositions.forEach((pos, index) => {
      const glow = ctx.createRadialGradient(
        this.x + this.width * pos,
        this.y - this.height / 4,
        1,
        this.x + this.width * pos,
        this.y - this.height / 4,
        15
      );

      if (this.isHero) {
        const lightThreshold = index * 33.33;
        const isLit = this.chargeLevel > lightThreshold;

        if (isLit) {
          const intensity = Math.min(
            (this.chargeLevel - lightThreshold) / 33.33,
            1
          );
          glow.addColorStop(0, `rgba(50, 255, 120, ${intensity})`);
          glow.addColorStop(0.4, `rgba(46, 204, 113, ${0.8 * intensity})`);
          glow.addColorStop(0.7, `rgba(46, 204, 113, ${0.3 * intensity})`);
          glow.addColorStop(1, "rgba(46, 204, 113, 0)");

          // Add inner bright core
          const coreGlow = ctx.createRadialGradient(
            this.x + this.width * pos,
            this.y - this.height / 4,
            0,
            this.x + this.width * pos,
            this.y - this.height / 4,
            5
          );
          coreGlow.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
          coreGlow.addColorStop(1, "rgba(50, 255, 120, 0)");

          ctx.fillStyle = coreGlow;
          ctx.beginPath();
          ctx.arc(
            this.x + this.width * pos,
            this.y - this.height / 4,
            5,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else {
          glow.addColorStop(0, "rgba(46, 204, 113, 0.1)");
          glow.addColorStop(1, "rgba(46, 204, 113, 0)");
        }
      } else {
        glow.addColorStop(
          0,
          `rgba(231, 76, 60, ${0.8 + Math.sin(this.time) * 0.2})`
        );
        glow.addColorStop(1, "rgba(231, 76, 60, 0)");
      }

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(
        this.x + this.width * pos,
        this.y - this.height / 4,
        15,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    // Draw engine thrust
    const thrustGlow = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.height / 2
    );

    if (this.isHero) {
      thrustGlow.addColorStop(
        0,
        `rgba(52, 152, 219, ${0.6 + Math.sin(this.time) * 0.4})`
      );
      thrustGlow.addColorStop(1, "rgba(52, 152, 219, 0)");
    } else {
      thrustGlow.addColorStop(
        0,
        `rgba(231, 76, 60, ${0.6 + Math.sin(this.time) * 0.4})`
      );
      thrustGlow.addColorStop(1, "rgba(192, 57, 43, 0)");
    }

    ctx.fillStyle = thrustGlow;
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 3, this.y);
    ctx.lineTo(this.x + this.width / 3, this.y);
    ctx.lineTo(this.x, this.y + this.height / 2);
    ctx.closePath();
    ctx.fill();
  }
}

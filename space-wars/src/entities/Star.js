export class Star {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight; // Initial distribution
    this.size = Math.random() * 2.3;
    this.baseSpeed = Math.random() * 180 + 60; // Speed in pixels per second
  }

  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.size = Math.random() * 2.3;
    this.baseSpeed = Math.random() * 180 + 60;
  }

  update(deltaTime) {
    this.y += this.baseSpeed * deltaTime;

    if (this.y > this.canvasHeight || this.x < 0 || this.x > this.canvasWidth) {
      // Reset to top when star goes off screen
      this.y = 0;
      this.x = Math.random() * this.canvasWidth;
      this.size = Math.random() * 2.3;
      this.baseSpeed = Math.random() * 180 + 60;
    }
    return true;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

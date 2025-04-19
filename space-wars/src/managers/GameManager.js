import { Platform } from "../entities/Platform.js";
import { Star } from "../entities/Star.js";
import { PlasmaBall } from "../entities/PlasmaBall.js";
import { Hero } from "../entities/Hero.js";
import { Enemy } from "../entities/Enemy.js";

export class GameManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.arrows = [];
    this.gameOver = false;
    this.winner = null;
    this.restartButton = {
      x: 0,
      y: 0,
      width: 200,
      height: 50,
    };
    this.score = 0; // Add score property
    this.highScore = parseInt(localStorage.getItem("spaceWarsHighScore")) || 0; // Load high score

    // Create stars
    this.stars = Array(240)
      .fill()
      .map(() => new Star(canvas.width, canvas.height));

    this.initGame();
  }

  initGame() {
    const platformWidth = this.canvas.width * 0.15;
    const platformHeight = this.canvas.height * 0.15;

    // Create platforms - ensure hero platform stays within bounds
    const heroPlatformWidth = platformWidth * 1.8;
    const minX = heroPlatformWidth / 2; // Ensure left edge stays on screen
    const heroX = Math.max(minX, this.canvas.width * 0.1);

    this.platform1 = new Platform(
      heroX,
      this.canvas.height * 0.5,
      heroPlatformWidth,
      platformHeight * 1.8,
      true
    );

    const randomXPosition = this.canvas.width * (0.6 + Math.random() * 0.25);
    const randomYPosition = this.canvas.height * (0.3 + Math.random() * 0.4);
    this.platform2 = new Platform(
      randomXPosition,
      randomYPosition,
      platformWidth,
      platformHeight,
      false
    );

    // Create players using new classes
    this.player1 = new Hero(
      this.platform1.x,
      this.platform1.y - this.platform1.height
    );
    this.player2 = new Enemy(
      this.platform2.x,
      this.platform2.y - platformHeight
    );

    this.player1.platform = this.platform1;
    this.player2.platform = this.platform2;
    this.currentPlayer = this.player1;
    this.score = 0; // Reset score on new game
  }

  handleResize(dimensions) {
    const { canvasWidth, canvasHeight, scale, platformWidth, platformHeight } =
      dimensions;

    // Update stars
    this.stars.forEach((star) => {
      star.canvasWidth = canvasWidth;
      star.canvasHeight = canvasHeight;
    });

    // Update platform 1 with bounds checking
    const heroPlatformWidth = platformWidth * 1.8;
    const minX = heroPlatformWidth / 2;
    const heroX = Math.max(minX, canvasWidth * 0.1);

    this.platform1.x = heroX;
    this.platform1.y = canvasHeight * 0.5;
    this.platform1.width = heroPlatformWidth;
    this.platform1.height = platformHeight * 1.2;

    // Update platform 2
    const platform2XRatio = this.platform2.x / canvasWidth;
    const platform2YRatio = this.platform2.y / canvasHeight;
    this.platform2.x = canvasWidth * platform2XRatio;
    this.platform2.y = canvasHeight * platform2YRatio;
    this.platform2.width = platformWidth;
    this.platform2.height = platformHeight;

    // Update players
    this.player1.x = this.platform1.x;
    this.player1.y = this.platform1.y - this.platform1.height;
    this.player1.scale = scale;
    this.player2.x = this.platform2.x;
    this.player2.y = this.platform2.y - platformHeight;
    this.player2.scale = scale;
  }

  update(deltaTime) {
    this.stars = this.stars.filter((star) => star.update(deltaTime));
    while (this.stars.length < 240) {
      this.stars.push(new Star(this.canvas.width, this.canvas.height));
    }

    if (!this.gameOver) {
      // Update enemy difficulty based on score
      this.player2.updateDifficultyLevel(this.score);

      if (this.currentPlayer.isHero && this.currentPlayer.isCharging) {
        this.currentPlayer.power = Math.min(
          this.currentPlayer.power + 60 * deltaTime,
          100
        );
        this.platform1.setChargeLevel(this.currentPlayer.power);
      }

      this.player1.update(this.player2, this.arrows, deltaTime);
      this.player2.update(this.player1, this.arrows, deltaTime);
      this.updateProjectiles(deltaTime);
    }
  }

  draw() {
    // Clear canvas and draw background
    this.ctx.fillStyle = "#000B27";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw stars - always animate regardless of game state
    this.stars.forEach((star) => star.draw(this.ctx));

    // Draw game elements
    this.platform1.draw(this.ctx);
    this.platform2.draw(this.ctx);
    this.player1.draw(this.ctx);
    this.player2.draw(this.ctx);

    // Draw projectiles
    this.arrows.forEach((arrow) => arrow.draw(this.ctx));

    // Draw score
    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`Score : ${this.score}`, 20, 40);

    // Draw high score
    this.ctx.textAlign = "right";
    this.ctx.fillText(
      `High Score : ${this.highScore}`,
      this.canvas.width - 20,
      40
    );

    if (this.gameOver) {
      this.drawGameOver();
    }
  }

  updateProjectiles(deltaTime) {
    for (let i = this.arrows.length - 1; i >= 0; i--) {
      const projectile = this.arrows[i];
      const isActive = projectile.update(deltaTime);

      // Remove inactive or out-of-bounds projectiles
      if (
        !isActive ||
        projectile.x < 0 ||
        projectile.x > this.canvas.width ||
        projectile.y > this.canvas.height
      ) {
        this.arrows.splice(i, 1);
        continue;
      }

      // Check collisions and apply damage
      const targetPlayer =
        projectile instanceof PlasmaBall ? this.player1 : this.player2;
      if (this.checkCollision(projectile, targetPlayer)) {
        // Apply damage based on projectile type
        const damage = projectile instanceof PlasmaBall ? 20 : 40;
        const isDead = targetPlayer.takeDamage(damage);

        // Update score when hero hits enemy
        if (!targetPlayer.isHero) {
          this.score += damage;
          if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem(
              "spaceWarsHighScore",
              this.highScore.toString()
            ); // Save high score
          }
        }

        if (isDead) {
          if (targetPlayer.isHero) {
            // Let hero death animation play before showing game over
            setTimeout(() => {
              this.gameOver = true;
              this.winner = this.player2;
            }, 1000);
          } else {
            setTimeout(() => {
              this.spawnNewEnemy();
              this.currentPlayer = this.player1;
            }, 1000);
          }
        }

        // Remove projectile on hit
        this.arrows.splice(i, 1);
      }
    }
  }

  checkCollision(projectile, target) {
    // Calculate the actual hitbox dimensions based on sprite scale
    const targetHitboxWidth = target.spriteScale * 0.4; // 40% of sprite width
    const targetHitboxHeight = target.spriteScale * 0.7; // 70% of sprite height

    // Calculate projectile hitbox based on type
    const projectileRadius = projectile instanceof PlasmaBall ? 15 : 10;

    // Get target hitbox boundaries
    const targetLeft = target.x - targetHitboxWidth / 2;
    const targetRight = target.x + targetHitboxWidth / 2;
    const targetTop = target.y - targetHitboxHeight;
    const targetBottom = target.y;

    // Check if projectile's center is within expanded target bounds
    // Add projectile radius to create a more accurate collision zone
    if (
      projectile.x + projectileRadius >= targetLeft &&
      projectile.x - projectileRadius <= targetRight &&
      projectile.y + projectileRadius >= targetTop &&
      projectile.y - projectileRadius <= targetBottom
    ) {
      // If within bounding box, do a more precise circular collision check
      const closestX = Math.max(
        targetLeft,
        Math.min(projectile.x, targetRight)
      );
      const closestY = Math.max(
        targetTop,
        Math.min(projectile.y, targetBottom)
      );

      const distanceX = projectile.x - closestX;
      const distanceY = projectile.y - closestY;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;

      return distanceSquared <= projectileRadius * projectileRadius;
    }

    return false;
  }

  drawGameOver() {
    if (this.winner !== this.player1) {
      // Hero lost - show restart button
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;

      this.ctx.fillStyle = "white";
      this.ctx.font = "48px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Game Over !!", centerX, centerY - 50);

      // Draw restart button
      this.restartButton.x = centerX - 100;
      this.restartButton.y = centerY + 20;
      this.ctx.fillStyle = "#3498db";
      this.ctx.fillRect(
        this.restartButton.x,
        this.restartButton.y,
        this.restartButton.width,
        this.restartButton.height
      );

      this.ctx.fillStyle = "white";
      this.ctx.font = "24px Arial";
      this.ctx.fillText("Restart Game", centerX, centerY + 50);
    } else {
      const winnerText =
        this.winner === this.player1 ? "Hero Wins!" : "Alien Wins!";
      this.ctx.fillStyle = "white";
      this.ctx.font = "48px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        winnerText,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
    }
  }

  handleClick(x, y) {
    if (!this.gameOver) return;

    // Check if click is within restart button bounds
    if (
      x >= this.restartButton.x &&
      x <= this.restartButton.x + this.restartButton.width &&
      y >= this.restartButton.y &&
      y <= this.restartButton.y + this.restartButton.height
    ) {
      this.gameOver = false;
      this.winner = null;
      this.arrows = [];
      this.initGame();
    }
  }

  spawnNewEnemy() {
    const platformWidth = this.canvas.width * 0.15;
    const platformHeight = this.canvas.height * 0.15;

    // Create new platform for enemy
    const randomXPosition = this.canvas.width * (0.6 + Math.random() * 0.25);
    const randomYPosition = this.canvas.height * (0.3 + Math.random() * 0.4);
    this.platform2 = new Platform(
      randomXPosition,
      randomYPosition,
      platformWidth,
      platformHeight,
      false
    );

    // Create new enemy
    this.player2 = new Enemy(
      this.platform2.x,
      this.platform2.y - platformHeight,
      false
    );
    this.player2.platform = this.platform2;
  }
}

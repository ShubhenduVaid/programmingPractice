import { Bolt } from "../entities/Bolt.js";

export class InputManager {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.gameManager.canvas.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    this.gameManager.canvas.addEventListener(
      "mouseup",
      this.handleMouseUp.bind(this)
    );
    this.gameManager.canvas.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    this.gameManager.canvas.addEventListener(
      "click",
      this.handleClick.bind(this)
    );
  }

  handleKeyDown(event) {
    if (this.gameManager.gameOver && event.code === "Space") {
      this.gameManager.gameOver = false;
      this.gameManager.winner = null;
      this.gameManager.arrows = [];
      this.gameManager.initGame();
      return;
    }

    if (this.gameManager.currentPlayer.isHero) {
      switch (event.key) {
        case "a":
        case "ArrowLeft":
          this.gameManager.player1.isMovingLeft = true;
          break;
        case "d":
        case "ArrowRight":
          this.gameManager.player1.isMovingRight = true;
          break;
        case "w":
        case "ArrowUp":
          this.gameManager.player1.isMovingUp = true;
          break;
        case "s":
        case "ArrowDown":
          this.gameManager.player1.isMovingDown = true;
          break;
      }
    }
  }

  handleKeyUp(event) {
    if (this.gameManager.currentPlayer.isHero) {
      switch (event.key) {
        case "a":
        case "ArrowLeft":
          this.gameManager.player1.isMovingLeft = false;
          break;
        case "d":
        case "ArrowRight":
          this.gameManager.player1.isMovingRight = false;
          break;
        case "w":
        case "ArrowUp":
          this.gameManager.player1.isMovingUp = false;
          break;
        case "s":
        case "ArrowDown":
          this.gameManager.player1.isMovingDown = false;
          break;
      }
    }
  }

  handleMouseDown() {
    const currentPlayer = this.gameManager.currentPlayer;
    if (currentPlayer.isHero) {
      currentPlayer.isCharging = true;
      currentPlayer.power = 0; // Reset power when starting to charge
    }
  }

  handleMouseUp() {
    const currentPlayer = this.gameManager.currentPlayer;
    if (currentPlayer.isCharging && currentPlayer.isHero) {
      // Reduce base velocity and adjust power scaling
      const baseVelocity = 3; // Reduced from 8
      const powerMultiplier = currentPlayer.power / 8; // Adjusted from 5.5
      const bolt = new Bolt(
        currentPlayer.x + (currentPlayer.facingRight ? 30 : -30),
        currentPlayer.y - 20,
        currentPlayer.angle,
        baseVelocity * powerMultiplier
      );

      this.gameManager.arrows.push(bolt);
      currentPlayer.isCharging = false;
      currentPlayer.power = 0;
      this.gameManager.platform1.setChargeLevel(0);

      // Switch turns
      this.gameManager.currentPlayer = this.gameManager.player2;
      setTimeout(() => {
        if (!this.gameManager.gameOver) {
          this.gameManager.currentPlayer = this.gameManager.player1;
        }
      }, 2000);
    }
  }

  handleMouseMove(event) {
    const currentPlayer = this.gameManager.currentPlayer;
    const rect = this.gameManager.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let angle = Math.atan2(mouseY - currentPlayer.y, mouseX - currentPlayer.x);
    const twentyDegrees = (20 * Math.PI) / 180;

    if (currentPlayer === this.gameManager.player1) {
      if (angle > twentyDegrees) angle = twentyDegrees;
      if (angle < -twentyDegrees) angle = -twentyDegrees;
    } else {
      const targetAngle = Math.PI;
      if (
        angle > targetAngle + twentyDegrees ||
        angle < targetAngle - twentyDegrees
      ) {
        angle =
          angle > 0 ? targetAngle + twentyDegrees : targetAngle - twentyDegrees;
      }
    }
    currentPlayer.angle = angle;
  }

  handleClick(event) {
    const rect = this.gameManager.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.gameManager.handleClick(x, y);
  }

  createProjectile() {
    const currentPlayer = this.gameManager.currentPlayer;
    return new Bolt(
      currentPlayer.x,
      currentPlayer.y,
      currentPlayer.angle,
      currentPlayer.power / 5
    );
  }
}

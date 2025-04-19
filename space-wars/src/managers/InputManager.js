import { Bolt } from "../entities/Bolt.js";

export class InputManager {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.setupEventListeners();

    this.joystickBase = document.querySelector(".joystick-base");
    this.joystickStick = document.querySelector(".joystick-stick");
    this.shootButton = document.querySelector(".shoot-button");
    this.isTouchDevice = "ontouchstart" in window;
    this.isJoystickActive = false;
    this.joystickData = { x: 0, y: 0 };

    if (this.isTouchDevice) {
      this.setupTouchControls();
    }
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

  setupTouchControls() {
    // Joystick controls
    this.joystickBase.addEventListener(
      "touchstart",
      this.handleJoystickStart.bind(this)
    );
    this.joystickBase.addEventListener(
      "touchmove",
      this.handleJoystickMove.bind(this)
    );
    this.joystickBase.addEventListener(
      "touchend",
      this.handleJoystickEnd.bind(this)
    );

    // Shoot button
    this.shootButton.addEventListener(
      "touchstart",
      this.handleShootStart.bind(this)
    );
    this.shootButton.addEventListener(
      "touchend",
      this.handleShootEnd.bind(this)
    );

    // Canvas touch for aiming
    this.gameManager.canvas.addEventListener(
      "touchmove",
      this.handleTouchAim.bind(this)
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

  handleJoystickStart(e) {
    e.preventDefault();
    this.isJoystickActive = true;
    this.handleJoystickMove(e);
  }

  handleJoystickMove(e) {
    if (!this.isJoystickActive) return;

    const touch = e.touches[0];
    const rect = this.joystickBase.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = rect.width / 2;

    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }

    this.joystickStick.style.transform = `translate(${dx}px, ${dy}px)`;

    // Update player movement
    const player = this.gameManager.player1;
    player.isMovingLeft = dx < -10;
    player.isMovingRight = dx > 10;
    player.isMovingUp = dy < -10;
    player.isMovingDown = dy > 10;
  }

  handleJoystickEnd() {
    this.isJoystickActive = false;
    this.joystickStick.style.transform = "translate(-50%, -50%)";

    const player = this.gameManager.player1;
    player.isMovingLeft = false;
    player.isMovingRight = false;
    player.isMovingUp = false;
    player.isMovingDown = false;
  }

  handleShootStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  }

  handleShootEnd(e) {
    e.preventDefault();
    this.handleMouseUp();
  }

  handleTouchAim(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.gameManager.canvas.getBoundingClientRect();

    this.handleMouseMove({
      clientX: touch.clientX,
      clientY: touch.clientY,
      preventDefault: () => {},
    });
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

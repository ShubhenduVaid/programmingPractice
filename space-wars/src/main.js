// Fix imports by adding correct relative paths
import { GameManager } from "./managers/GameManager.js";
import { InputManager } from "./managers/InputManager.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.setupCanvas();
    this.gameManager = new GameManager(this.canvas);
    this.inputManager = new InputManager(this.gameManager);
    this.startGameLoop();
    this.lastTime = 0;
    this.targetFPS = 60;
    this.timeStep = 1000 / this.targetFPS;
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  startGameLoop() {
    const gameLoop = (currentTime) => {
      // Calculate delta time in seconds
      if (!this.lastTime) this.lastTime = currentTime;
      const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1); // Cap at 100ms
      this.lastTime = currentTime;

      this.gameManager.update(deltaTime);
      this.gameManager.draw();
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const newScale = Math.min(window.innerWidth, window.innerHeight) * 0.03;

    // Update platforms and players through gameManager
    this.gameManager.handleResize({
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
      scale: newScale,
      platformWidth: window.innerWidth * 0.15,
      platformHeight: window.innerHeight * 0.15,
    });
  }
}

// Start the game and assign it to a variable for potential future use
const game = new Game();

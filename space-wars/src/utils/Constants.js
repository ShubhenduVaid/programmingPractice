export const GAME_CONSTANTS = {
  MAX_POWER: 50,
  PLATFORM_WIDTH_RATIO: 0.15,
  PLATFORM_HEIGHT_RATIO: 0.15,
  HERO_PLATFORM_X: 0.1,
  HERO_PLATFORM_Y: 0.5,
  ENEMY_PLATFORM_MIN_X: 0.6,
  ENEMY_PLATFORM_MAX_X: 0.85,
  ENEMY_PLATFORM_MIN_Y: 0.3,
  ENEMY_PLATFORM_MAX_Y: 0.7,
};

export const getProjectileScaleFactors = (canvasWidth, canvasHeight) => {
  const baseWidth = 1920; // Reference width
  const baseHeight = 1080; // Reference height
  const scaleFactor = Math.sqrt(
    (canvasWidth * canvasHeight) / (baseWidth * baseHeight)
  );

  return {
    powerScale: scaleFactor,
    gravityScale: 0.03 * scaleFactor,
    airResistance: 1 - 0.005 * scaleFactor, // Converts to 0.995 at base resolution
    velocityMultiplier: Math.min(Math.max(scaleFactor, 0.8), 1.2), // Clamp between 0.8 and 1.2
  };
};

export default {
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    copyPublicDir: true,
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  publicDir: "public",
};

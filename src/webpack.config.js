module.exports = {
  // Konfigurasi lainnya
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
    },
  },
};

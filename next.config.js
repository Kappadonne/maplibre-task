/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    // Add the .geojson loader
    config.module.rules.push({
      test: /\.geojson$/,
      use: "json-loader",
    });

    return config;
  },
};

module.exports = nextConfig;

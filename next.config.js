/** @type {import('next').NextConfig} */
// next.config.js
module.exports = {
    // ... rest of the configuration.
    output: "standalone",
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },   
}

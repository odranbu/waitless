/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Required for Docker/Google Cloud Run deployments
  images: {
    domains: [
      'images.unsplash.com', 
      'storage.googleapis.com' // For testimonial avatars
    ],
  },
};

module.exports = nextConfig;
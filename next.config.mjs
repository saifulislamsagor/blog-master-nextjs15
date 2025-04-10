/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "gratisography.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.gratisography.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

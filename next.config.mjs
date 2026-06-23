/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client"],
  outputFileTracingRoot: import.meta.dirname,
  // Allow CSS/JS assets when opening via 127.0.0.1 or LAN IP (not only localhost)
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "192.168.31.71",
    "172.25.32.1",
    "*.local",
  ],
  async redirects() {
    return [
      { source: "/provider", destination: "/partner", permanent: false },
      { source: "/provider/:path*", destination: "/partner/:path*", permanent: false },
    ];
  },
};

export default nextConfig;

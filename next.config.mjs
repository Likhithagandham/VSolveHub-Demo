/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client"],
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;

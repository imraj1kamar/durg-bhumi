/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // IMPORTANT: Do NOT use `output: "export"` with App Router API routes.
  // Vercel will return 404 for /api/contact when the app is statically exported.
  // Keep it serverful so /api/contact is deployed.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};


export default nextConfig;

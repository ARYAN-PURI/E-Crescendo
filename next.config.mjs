/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    async headers() {
        return [
            {
                source: '/(.*)', // Apply headers to all routes
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/api/:path*', // Ensure correct API routes
            },
        ];
    },
};

export default nextConfig;

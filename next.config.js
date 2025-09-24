/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        // Handle PDF.js worker
        config.resolve.alias = {
            ...config.resolve.alias,
            canvas: false,
        };

        // Exclude lucide-react from optimization (as per original vite config)
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
            };
        }

        return config;
    },
    images: {
        domains: [],
        unoptimized: false,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
    // Handle trailing slashes and redirects
    trailingSlash: false,
    // Enable static exports if needed
    output: 'standalone',
};

module.exports = nextConfig;

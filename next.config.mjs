/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.thecocktaildb.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;

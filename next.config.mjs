/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "img.youtube.com",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/:path*",
				has: [{ type: "host", value: "usaghostwriter.com" }],
				destination: "https://www.usaghostwriter.com/:path*",
				permanent: true,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/contact-us",
				has: [{ type: "query", key: "package" }],
				headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
			},
		];
	},
};

export default nextConfig;

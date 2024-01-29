/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')], // 2. sassOptions 옵션 추가
    },
};

export default nextConfig;

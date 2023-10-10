/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains:['picsum.photos',"loremflickr.com"]
    },
    env: {
        BACK_URL: 'http://localhost:3005/',
        // BACK_URL: 'http://35.175.244.104:3005/', 
    },
}

module.exports = nextConfig

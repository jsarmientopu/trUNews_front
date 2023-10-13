/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains:['picsum.photos',"loremflickr.com","trunews.s3.us-east-2.amazonaws.com"]
    },
    env: {
        BACK_URL: 'http://localhost:3005/',
        FRONT_URL: 'http://localhost:3000',
        // BACK_URL: 'http://35.175.244.104:3005/', 
    },
    
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains:['picsum.photos',"loremflickr.com","trunews.s3.us-east-2.amazonaws.com"]
    },
    env: {
        BACK_URL: 'http://localhost:3005/',
        // BACK_URL: 'http://34.203.197.7:3005/', 


        FRONT_URL: 'http://34.203.197.7/',
        // FRONT_URL: 'http://localhost:3000',
    },
    
}

module.exports = nextConfig

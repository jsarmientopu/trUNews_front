/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains:['picsum.photos',"loremflickr.com","trunews.s3.us-east-2.amazonaws.com"]
    },
    env: {
        // BACK_URL: 'http://localhost:3005/',
        // BACK_URL: 'https://3.89.38.183:3005/', 
        BACK_URL: 'https://obliging-boar-inherently.ngrok-free.app/', 


        FRONT_URL: 'https://trunews-front-lac.vercel.app',
        // FRONT_URL: 'http://localhost:3000',
    },
    
}

module.exports = nextConfig

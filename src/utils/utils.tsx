import { decryptJWT, decryptedJWT } from "@/dto/users";

async function verifyToken(token:decryptJWT): Promise<decryptedJWT>{

    if(token.token){

        let datos;

        const res = await fetch('http://localhost:3005/users/decryptJWT',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(token),
        }).then(response => response.json()).then(data => datos=data)
        
        console.log(res)

        return res;
    }

    return {userId: -1, rol: -1};


}

export default verifyToken;
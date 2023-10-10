import { decryptJWT, decryptedJWT } from "@/dto/users";
import { getFromLocalStorage } from "./localStorage";

async function verifyToken(): Promise<decryptedJWT>{
    const token = getFromLocalStorage('token')
    if(token){
        console.log(JSON.stringify(token))
        let datos;
        const res = await fetch(`${process.env.BACK_URL}users/decryptJWT`,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({'token':token})
            ,
        }).then(response => response.json()).then(data => datos=data)
        
        console.log(res)

        if(!res.err && !res.error){
            return res;
        }else{
            localStorage.removeItem("token");
        }
    }

    return {userId: -1, rol: -1};


}

export default verifyToken;
import { NumberLiteralType } from "typescript";
import { getFromLocalStorage } from "../localStorage";
import verifyToken from "../utils";

export const getSearch=async(param:string)=>{
    
    const token = getFromLocalStorage('token')
    if(token){
        const info=await verifyToken();
        let resT=[];
        let datos;
        const resUser = await fetch('http://localhost:3005/users/find/'+param,{
            method: 'GET',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(resUser);
        resT.push(resUser);
        const resArticle = await fetch('http://localhost:3005/articles/find/'+param,{
            method: 'GET',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(resArticle);
        resT.push(resArticle);
        return resT;
    }
}
import verifyToken from "./utils";
import { getFromLocalStorage } from "./localStorage";
import { getUserType, imageType, updateUserType} from "@/dto/users";

export const getProfile=async()=>{
    const token = getFromLocalStorage('token')
    if(token){
        const info=await verifyToken({'token':token});
        let datos;
        const res = await fetch('http://localhost:3005/users/'+info.userId+'/me',{
            method: 'GET',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}

export const updateProfile=async(datos:getUserType, image:string|null)=>{
    console.log(datos)
    const updateData ={
        'rol':datos.rol,
        'username':datos.username,
        'name':datos.name,
        'lastname':datos.lastname,
        'description':datos.description,
        'profession':datos.profession,
        'image_url':image,
    } as Partial<updateUserType>;
    console.log(updateData)
    const token = getFromLocalStorage('token')
    if(token){
        const res = await fetch('http://localhost:3005/users/'+datos.id_user+'/updateProfile',{
            method: 'PUT',
            headers:{'Content-Type':'application/json', 'authorization':token},
            body: JSON.stringify(updateData)
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}

export const squareImage=async(datos:imageType)=>{
    // console.log(datos)
    const res = await fetch('http://localhost:3005/users/tryImage',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    console.log(res);
    return res;
}
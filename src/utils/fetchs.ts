import verifyToken from "./utils";
import { getFromLocalStorage } from "./localStorage";
import { getUserType, imageType, updateUserType, updatePasswordType} from "@/dto/users";
import { user } from "@nextui-org/react";
import { parseArgs } from "util";

export const getProfile=async(userView:number)=>{
    const token = getFromLocalStorage('token')
    if(token){
        const info=await verifyToken();
        let datos;
        const res = await fetch(`${process.env.BACK_URL}users/${userView}/profile`,{
            method: 'GET',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}

export const getSaved=async(userView:number)=>{
    const token = getFromLocalStorage('token')
    if(token){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}articles/savedArticles/${userView}`,{
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
        const res = await fetch(`${process.env.BACK_URL}users/${datos.id_user}/updateProfile`,{
            method: 'PUT',
            headers:{'Content-Type':'application/json', 'authorization':token},
            body: JSON.stringify(updateData)
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}

export const updatePassword=async(data:updatePasswordType, id:number)=>{
    var datos;
    const token = getFromLocalStorage('token')
    if(token){
        const res = await fetch(`${process.env.BACK_URL}users/${id}/updatePassword`,{
            method: 'PUT',
            headers:{'Content-Type':'application/json', 'authorization':token},
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}

export const getFollower=async(userView:number, type:[boolean,boolean])=>{
    const token = getFromLocalStorage('token')
    if(token){
        let datos;
        let res;
        if(type[1]){
            res = await fetch(`${process.env.BACK_URL}users/followers/${userView}`,{
                method: 'GET',
                headers:{'Content-Type':'application/json', 'authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        }else{
            res = await fetch(`${process.env.BACK_URL}users/following/${userView}`,{
                method: 'GET',
                headers:{'Content-Type':'application/json', 'authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        }   
        console.log(res);
        return res;
    }
}

export const follow=async(data:getUserType, userView:number)=>{
    const token = getFromLocalStorage('token')
    console.log(data, userView)

    if(token){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}users/${userView}/follow/${data.id_user}`,{
            method: 'POST',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}

export const unfollow=async(data:getUserType, userView:number)=>{
    const token = getFromLocalStorage('token')
    console.log(data, userView)
    if(token){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}users/${userView}/unfollow/${data.id_user}`,{
            method: 'POST',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}

export const squareImage=async(datos:imageType)=>{
    // console.log(datos)
    const res = await fetch(`${process.env.BACK_URL}users/tryImage`,{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    console.log(res);
    return res;
}

export async function deletePost(id:number){
    const token = getFromLocalStorage('token')
    if(token){
        const info=await verifyToken();
        let datos;
        const res = await fetch(`${process.env.BACK_URL}articles/${id}`,{
            method: 'DELETE',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}

export async function getPost(id: number) {
    let datos;
    const res = await fetch(`${process.env.BACK_URL}articles/${id}`,{
        method: 'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    return res;

}

export async function getRelatedPost(id: number) {
    let datos;
    const res = await fetch(`http://localhost:3005/articles/related/${id}`,{
        method: 'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    return res;

}

export async function getTrendingPosts(){
    let datos;
    const res = await fetch(`${process.env.BACK_URL}articles/trending/5`,{
        method: 'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    return res;

}

export async function getLatestPosts(){
    let datos;
    const res = await fetch(`${process.env.BACK_URL}articles/latest/5`,{
        method: 'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    return res;

}

export async function getTrendingWriters(){
    let datos;
    const res = await fetch(`${process.env.BACK_URL}users/trending/5`,{
        method: 'GET',
        headers:{'Content-Type':'application/json'},
    }).then(response => response.json()).then(data => datos=data)
    console.log(res)
    return res;
}

// feed de cada usuario
export async function getFeed(){
    const token = getFromLocalStorage('token')
    let datos;

    if(token){
        const res = await fetch(`${process.env.BACK_URL}articles/feed`,{
                method: 'GET',
                headers:{'Content-Type':'application/json','authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        return res;
    }
}

// articles by category
export async function getArticlesByCategory(id: number) {
    let datos;
    const res = await fetch(`${process.env.BACK_URL}articles/category/${id}`,{
        method: 'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    return res;
}

// all categories
export async function getCategories() {
    let datos;
    const res = await fetch(`${process.env.BACK_URL}articles/categories`,{
        method: 'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    return res;
}

// Category by id
export async function getCategoryById(id: number) {
    let datos;
    const res = await fetch(`${process.env.BACK_URL}articles/categoryById/${id}`,{
        method: 'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    }).then(response => response.json()).then(data => datos=data)
    return res;
}
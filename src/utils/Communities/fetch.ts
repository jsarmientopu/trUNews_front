import { createCommunityType } from "@/dto/community";
import { getFromLocalStorage } from "../localStorage";
import verifyToken from "../utils";
import { imageType } from "@/dto/users";
import { alert } from "../alertHandeler";

// Community by id
export async function getCommunityById(id: number) {

    const token = getFromLocalStorage('token')
    let datos;
    
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/${id}`,{
                method: 'GET',
                headers:{'Content-Type':'application/json','authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        return res;
    }
}

// Feed community
export async function getCommunityFeed(idCommunity: number) {

    const token = getFromLocalStorage('token')
    let datos;
    
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/feed/?communityId=${idCommunity}`,{
                method: 'GET',
                headers:{'Content-Type':'application/json','authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        return res;
    }
}

// Join community
export async function joinCommunity(idUser: number, idCommunity: number) {

    const token = getFromLocalStorage('token')
    
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/join/${idUser}/${idCommunity}`,{
                method: 'POST',
                headers:{'Content-Type':'application/json','authorization':token},
            })
        console.log(res)
        if (location.pathname != "/communities"){
            location.reload();
        }
        return res;
    }
}

// Leave community
export async function leaveCommunity(idUser: number, idCommunity: number) {

    const token = getFromLocalStorage('token')
    
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/leave/${idUser}/${idCommunity}`,{
                method: 'POST',
                headers:{'Content-Type':'application/json','authorization':token},
            })
        console.log(res)
        location.reload();
        return res;
    }
}

export async function deleteCommunity(idCommunity: number) {

    const token = getFromLocalStorage('token')
    let datos;
    const user = await verifyToken()
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/delete/${user.userId}/${idCommunity}`,{
                method: 'DELETE',
                headers:{'Content-Type':'application/json','authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        location.replace(`/communities`)
        return res;
    }
}

export async function createCommunity(sentData : createCommunityType, categories : number[], bannerImage : string, avatarImage : string) {
    const token = getFromLocalStorage('token')
    if(token){  
        const user = await verifyToken()
        const data = {
            ...sentData,
                    creator_id: user.userId,
                    id_categories: categories,
                    banner_url: bannerImage,
                    avatar_url: avatarImage
        }
        console.log(data)
        const res = await fetch(`${process.env.BACK_URL}communities/create`,{
                method: 'POST',
                headers:{'Content-Type':'application/json','authorization':token},
                body: JSON.stringify(data)
            })
        location.replace(`/communities`)
        return res;
    }
}

export async function editCommunity(sentData : createCommunityType, communityId: number, categories : number[], bannerImage : string, avatarImage : string) {
    const token = getFromLocalStorage('token')
    if(token){  
        const user = await verifyToken()
        const data = {
            ...sentData,
                    creator_id: user.userId,
                    id_categories: categories,
                    banner_url: bannerImage,
                    avatar_url: avatarImage
        }
        console.log(data)
        const res = await fetch(`${process.env.BACK_URL}communities/update/${user.userId}/${communityId}`,{
                method: 'PUT',
                headers:{'Content-Type':'application/json','authorization':token},
                body: JSON.stringify(data)
            })
        console.log(res)
        console.log(`${process.env.BACK_URL}communities/update/${user.userId}/${communityId}`)
        location.replace(`/community/${communityId}`)
        return res;
    }
}

export async function getArticlesToAdd(idCommunity: number) {

    const token = getFromLocalStorage('token')
    let datos;
    const user = await verifyToken()
    const bodyData={'userId': user.userId,'communityId': idCommunity.valueOf()}
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/checkArticleToAdd`,{
                method: 'POST',
                headers:{'Content-Type':'application/json','authorization':token},
                body: JSON.stringify(bodyData)
            }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        return res;
    }
}

export async function postArticle(idArticle: number, idCommunity: number) {
    const token = getFromLocalStorage('token')
    let datos;
    const user = await verifyToken()
    const bodyData={'articleId': idArticle,'communityId': idCommunity.valueOf()}
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/addArticle`,{
            method: 'POST',
            headers:{'Content-Type':'application/json','authorization':token},
            body: JSON.stringify(bodyData)
        }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        if(res.err){
            alert("error",res.err,"",()=>{})
            return false
        }else{
            alert("success","Article posted successfully","",()=>{window.location.reload()})
            return true
        }
    }
}

export async function getArticlesToDelete(idCommunity: number) {

    const token = getFromLocalStorage('token')
    let datos;
    const user = await verifyToken()
    const bodyData={'userId': user.userId,'communityId': idCommunity.valueOf()}
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/postedOnCommunity`,{
                method: 'POST',
                headers:{'Content-Type':'application/json','authorization':token},
                body: JSON.stringify(bodyData)
            }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        return res;
    }
}

export async function deletePostArticle(idArticle: number, idCommunity: number,) {

    const token = getFromLocalStorage('token')
    let datos;
    const user = await verifyToken()
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/removeArticle/${idCommunity}/${idArticle}`,{
                method: 'DELETE',
                headers:{'Content-Type':'application/json','authorization':token}
            }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        if(res.err){
            alert("error",res.err,"",()=>{})
            return false
        }else{
            alert("success","Article deleted successfully","",()=>{window.location.reload()})
            return true
        }
    }
}
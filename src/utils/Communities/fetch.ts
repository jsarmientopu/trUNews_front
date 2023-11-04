import { getFromLocalStorage } from "../localStorage";
import verifyToken from "../utils";

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
        location.reload();
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
        return res;
    }
}
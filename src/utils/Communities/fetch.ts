import { getFromLocalStorage } from "../localStorage";

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
export async function getCommunityFeed() {

    const token = getFromLocalStorage('token')
    let datos;
    
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/feed`,{
                method: 'GET',
                headers:{'Content-Type':'application/json','authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        return res;
    }
}
import { createEventType } from "@/dto/community";
import { getFromLocalStorage } from "../localStorage";
import verifyToken from "../utils";

export async function createEvent(infoEvent: createEventType) {

    const token = getFromLocalStorage('token')
    let datos;
    const user = await verifyToken()
    infoEvent ={...infoEvent, 'creator_id':user.userId, 'community_id':infoEvent.community_id.valueOf()}
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/createEvent`,{
                method: 'POST',
                headers:{'Content-Type':'application/json','authorization':token},
                body: JSON.stringify(infoEvent)
            }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        return res;
    }
}

export async function deleteEvent(community_id:number, event_id:number) {

    const token = getFromLocalStorage('token')
    let datos;
    const user = await verifyToken()
    if(token){
        const res = await fetch(`${process.env.BACK_URL}communities/deleteEvent/${community_id}/${event_id}`,{
                method: 'DELETE',
                headers:{'Content-Type':'application/json','authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        console.log(res)
        return res;
    }
}
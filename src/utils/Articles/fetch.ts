import { getFromLocalStorage } from "../localStorage";
import { alert } from "../alertHandeler";

export async function saveArticle(articleId:number){
    const token = getFromLocalStorage('token')
    if(articleId && token){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}articles/save/${articleId}`,{
            method: 'POST',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        if (res.err ) {
            alert('error', 'Failed article saving!', res.err, ()=>{})
        }else{
            alert('success', 'You save the article in your save list', '', ()=>{})
        }
        return res
    }else{
        alert('error', 'Failed request!', 'Verify account information', ()=>{})
    }
    return
}
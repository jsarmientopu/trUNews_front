import { getFromLocalStorage } from "../localStorage";
import { alert } from "../alertHandeler";
import Article from "@/app/article/[id]/page";

export async function saveArticle(articleId:number, setSaved:any){
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
            setSaved(true)
            alert('success', 'You save the article in your save list', '', ()=>{})
        }
        return res
    }else{
        alert('error', 'Failed request!', 'Verify account information', ()=>{})
    }
    return
}

export async function unsaveArticle(articleId:number, setSaved:any){
    const token = getFromLocalStorage('token')
    if(articleId && token){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}articles/unsave/${articleId}`,{
        // const res = await fetch(`http://localhost:3005/articles/aiModel`,{
            method: 'POST',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        if (res.err ) {
            alert('error', 'Failed unsave!', res.err, ()=>{})
        }else{
            setSaved(false)
            alert('success', 'You remove this article from your saves', '', ()=>{})
        }
        return res
    }else{
        alert('error', 'Failed request!', 'Verify account information', ()=>{})
    }
    return
}

export async function getQR(path:string) {
    if(path){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}articles/createQr/?url=${path}`,{
            method: 'GET',
            headers:{'Content-Type':'application/json'},
        }).then(response => response.json()).then(data => datos=data)
        if(res.err){
            alert('error', 'Failed Creation QR!', 'Try later!', ()=>{})
        }else{
            return res.qr
        }
    }
    return ''
}

export async function isSaved(article:number) {
    const token = getFromLocalStorage('token')
    if(article && token){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}articles/isSaved/${article}`,{
            method: 'GET',
            headers:{'Content-Type':'application/json', 'authorization':token},
        }).then(response => response.json()).then(data => datos=data)
        if(res.err){
            console.log('BAD FETCH ISSAVED')
        }else{
            return res
        }
    }
    return false
}

export function parseDate(date:Date){
    const dat1 = new Date(date).toDateString();
    return `${dat1}`
}
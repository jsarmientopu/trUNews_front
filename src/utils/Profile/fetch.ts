import { alert } from "../alertHandeler";
import { getFromLocalStorage } from "../localStorage";
import { getArticleType } from "@/dto/article";

export async function unsaveArticle(articleId:number, articles:Array<getArticleType>, setArticles:any){
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
            console.log(articles.filter((element:getArticleType)=>element.id_article!=articleId))
            setArticles(articles.filter((element:getArticleType)=>element.id_article!=articleId))
        }
        return res
    }else{
        alert('error', 'Failed request!', 'Verify account information', ()=>{})
    }
    return
}

// statistics
export async function getStatistics(id: number) {

    const token = getFromLocalStorage('token')
    let datos;
    
    if(token){
        const res = await fetch(`${process.env.BACK_URL}users/statistics/byCategory/${id}`,{
                method: 'GET',
                headers:{'Content-Type':'application/json','authorization':token},
            }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        return res;
    }
}
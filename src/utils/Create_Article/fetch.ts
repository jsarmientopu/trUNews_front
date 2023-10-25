import { createArticleType} from "@/dto/article";
import { alert } from "../alertHandeler";

export async function getTitleCategories(formData:createArticleType){
    if(formData.text!=''){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}articles/aiModel`,{
        // const res = await fetch(`http://localhost:3005/articles/aiModel`,{
            method: 'POST',
            headers:{'Content-Type':'application/json', 'authorization':localStorage.token},
            body:JSON.stringify(formData),
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        if (res.err ) {
            alert('error', 'Failed models generation!', '', ()=>{})

        }
        return res
    }else{
        alert('error', 'Failed title and categories generation!', 'Incorrect information', ()=>{})
    }
    return {'titulos':[], 'categorias':[]}

}

export async function createArticle(formData:createArticleType, categories:Array<string>, router:any){
    console.log(formData, categories)
    if(formData.text!='' && formData.title!='' &&categories.length>0){
        let datos;
        const res = await fetch(`${process.env.BACK_URL}articles/create`,{
            method: 'POST',
            headers:{'Content-Type':'application/json', 'authorization':localStorage.token},
                  body:JSON.stringify(formData),
        }).then(response => response.json()).then(data => datos=data)
        console.log(res);
        if (res.err || res.error) {
            console.log(res.err)
            alert('error', 'Failed article creation!', res.err, ()=>{})
        }else{
            const category = await fetch(`${process.env.BACK_URL}articles/create/categories`,{
                method: 'POST',
                headers:{'Content-Type':'application/json', 'authorization':localStorage.token},
                      body:JSON.stringify({'id_writer':formData.id_writer, 'categories':categories, 'article':res.articleId}),
            }).then(response => response.json())
            console.log(category);
            if (category.err || category.error) {
                alert('error', 'Failed article categorization creation!', res.err, ()=>{})
            }else{
                alert('success', 'Success article creation!', '', router.push('/'))
            }

        }
    }else{
        if(categories.length<=0){
            alert('error', 'Failed article creation!', 'Select at least one category', ()=>{})
        }else{
            alert('error', 'Failed article creation!', 'Add your text', ()=>{})
        }
    }

}


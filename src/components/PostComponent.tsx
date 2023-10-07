'use client'
import { Link } from "@nextui-org/react"
import { Button } from "@nextui-org/react";
import { deletePost, getPost } from "@/utils/fetchs";
import { Image } from "@nextui-org/react";
import RecommendedBar from "./RecommendedBar";
import { useEffect, useState } from "react";
import { article_has_categories, returnArticlesCategory } from "@/dto/article";

export default function PostComponent({id}: any) {

    const [article,setArticle] = useState<returnArticlesCategory>()
    // const [category, setCategory] = useState<>('') 

    useEffect(() => {
        (async () => {
            const article = await getPost(id)
            setArticle(article[0])
            // setCategory(article[0].category)
            console.log(article)
        })();
    }, [])

    return (<>

        <div className="flex flex-row gap-20 p-20 w-full h-full">
            <div className="flex flex-col gap-7 w-[75%] justify-start">
                <div className="flex flex-row gap-4">
                {article?.article_has_categories.length!==0?
                        article?.article_has_categories.map((item:article_has_categories, index) => (
                            <p key ={index} className="font-semibold text-xl underline text-zinc-700">{item.category.cat_name}</p>
                        ))

                    :
                        <>No hay Articulos socio</>
                }
            </div>   
                <p className="font-bold text-3xl">{article?.title}</p>
                <Link href={`/perfil?search=${article?.id_writer}`}>
                    <p className="font-semibold text-xl text-zinc-700">Por: {article?.username}</p>
                </Link>
                <p className="font-medium text-lg text-zinc-700">{article?.date.toString()}</p>
                {/* <div className="flex justify-center">
                <Button size='sm' className="mb-2 bg-red-700 text-white" onClick={() => deletePost(id)}>
                    Borrar artículo
                </Button>
                </div> */}
                <div className="flex flex-row w-full justify-center mb-5">
                        <Image
                        src={article?.image_url} 
                        className="w-[80em] h-[40em] object-cover rounded-lg"
                        >
                        </Image>
                </div>

                <div className="flex justify-center text-justify">
                    <div dangerouslySetInnerHTML={{ __html: article?.text ?? '' }}/>
                </div>
            </div>

            <RecommendedBar id={id}/>

        </div>

        
        </>

    );
}
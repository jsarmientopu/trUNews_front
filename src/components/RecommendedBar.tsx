'use client'
import React, { useEffect, useState } from "react";
import RecommendedArticle from "./RecommendedArticle";
import { BsBook } from "react-icons/bs";
import { getRelatedPost } from "@/utils/fetchs";
import { returnArticles } from "@/dto/article";
import { parseDate } from "@/utils/parseDate";

const RecommendedBar = ({id}: any)=>{
    const [articles,setArticles] = useState<Array<returnArticles>>()
    
    useEffect(() => {
        (async () => {
            const articles = await getRelatedPost(id)
            setArticles(articles.splice(0,4))
            console.log(articles)
        })();
    }, [])


    return <div className="flex w-[25%] justify-center">
        <div className="flex-col bg-[#70BBF7] w-full rounded-lg" >
            <div className="flex flex-row m-6 gap-5">
                <BsBook size="1.5em"/>
                <p className="font-bold text-xl w-full text-black">Articulos Relacionados</p>
            </div>
            <div className="flex flex-col justify-center m-9 gap-8">
            {articles?.length!==0?
                    articles?.map((item:returnArticles, index) => (
                        <RecommendedArticle key={index} id={item?.id_article} image={item?.image_url} writer={item?.username} title={item?.title} timeSincePosted={parseDate(new Date(item?.date))}/>
                    ))
                :
                    <>No hay Articulos socio</>
            }       
            </div>
        </div>  
    </div>

}

export default RecommendedBar;
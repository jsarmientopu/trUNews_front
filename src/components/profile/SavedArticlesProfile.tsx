import { decryptedJWT } from "@/dto/users";
import SavedCard from "@/components/profile/SavedCard";
import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import { getSaved } from "@/utils/fetchs";
import { getArticleType } from "@/dto/article";

const SavedArticles=({userInfo, userView, articleWriter,articlesPage}:{'userInfo':decryptedJWT, 'userView':number, 'articleWriter':any, 'articlesPage':any})=>{
    const ani = useSpring({
        from: { width: '40%' },
        to: { width: '80%' },
        config: { duration: 500 },
    })

    const [savedArticles, setSavedArticles]=useState<Array<getArticleType>>([{
        'id_article':0,
        'title':'',
        'date':'',
        'image_url':'',
        'text':'',
        'writer':{'id_user':0,'username':''}
    }])

    useEffect(() => {
        (async () => {
            if(articlesPage){
                setSavedArticles(articleWriter)
            }else{
                const articles = await getSaved(userView);
                setSavedArticles(articles); 
            }
        })();
    },[articlesPage])

    return <animated.div className="flex flex-col bg-[#F0F2F4] w-[80%] rounded-[17px] justify-center items-center shadow-xl " style={ani}>
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">
                {articlesPage?
                    <p className="text-2xl">Articulos escritos</p>
                :
                    <p className="text-2xl">Articulos guardados</p>
                }

            </div>
            
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pb-10 pt-0 gap-2 bg-[#F0F2F4]">
                {savedArticles.length!==0?
                    savedArticles.map((item:getArticleType, index) => (
                        <SavedCard key={index} data={item} />
                    ))
                :
                    articlesPage?
                        <>No hay articulos escritos</>
                    :
                        <>No hay articulos guardados</>

                }

            </div>

        </animated.div>
}

export default SavedArticles;
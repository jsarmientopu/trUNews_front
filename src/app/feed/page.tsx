'use client'

import React, {useState, useEffect} from "react";
import FeedArticleCard from "@/components/feed/FeedArticleCard";
import { decryptedJWT } from "@/dto/users";
import { getFeed } from "@/utils/fetchs";
import { getFromLocalStorage } from "@/utils/localStorage";
import verifyToken from "@/utils/utils";
import { redirect } from "next/navigation";

export default function FeedPage() {

    // validación del estado de usuario
    const [userInfo, setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})
    const [articlesFeed, setArticlesFeed] = useState<Array<any>>([{
        'date':'',
        'id_article': 0,
        'id_writer': 0,
        'image_url': '',
        'lastname': '',
        'name': '',
        'sanitizedText': '',
        'text': '',
        'title': '',
        'username': '',
        'views': 0
    }]);

    // Rastreo de articulos visibles en el feed
    const [visibleArticles, setVisibleArticles] = useState(10);

    const handleVerMasClick = () => {
        setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 10);
    }

    async function token(){
        const tok = getFromLocalStorage("token");
        if(tok){
            const rol =await verifyToken();
            setUserInfo(rol);
        }else{
            setUserInfo({userId:-1,rol:-1});
        }
    }

    useEffect(()=>{
        token()
    },[])

    // fetch de articulos a mostrar en el feed
    useEffect(() => {
        async function fetchData() {
            const feedData = await getFeed();
            setArticlesFeed(feedData);
        }

        fetchData();
  }, []);

    // Redireccionar al home si el usuario cierra sesion
    if(userInfo.userId==-2) return
    if(userInfo.userId==-1) redirect('/');

    return (
        <div className="py-2">
            {articlesFeed.length !== 0 ? (
                <>
                {articlesFeed.slice(0, visibleArticles).map((item, index) => (
                    <div className="flex justify-center py-unit-4" key={index}>
                    <FeedArticleCard 
                        imageArticle={item.image_url}
                        profileImage="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        autor={`${item.name} ${item.lastname}`}
                        username={item.username}
                        title={item.title}
                        summary={item.sanitizedText}
                        id={item.id_article}
                        idWriter={item.id_writer}
                    />
                    </div>
                ))}
                {visibleArticles < articlesFeed.length && (
                    <div className="flex justify-center py-unit-4">
                    <button onClick={handleVerMasClick} className='bg-primary text-white py-2 px-3 rounded-xl'>
                        Ver más
                    </button>
                    </div>
                )}
                {visibleArticles >= articlesFeed.length && (
                    <div className='text-center font-bold text-2xl p-5'>
                    No hay más artículos para ver
                    </div>
                )}
                </>)
            :
                <div className='text-center font-bold text-2xl p-5'>
                    No hay articulos para ver
                </div>

            }
        </div>
    )
}
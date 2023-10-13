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
        'profile_image': '',
        'views': 0,
        'saved': false,
        'savedUsername': '',
        'article_has_categories': []
    }]);

    // Rastreo de articulos visibles en el feed
    const [visibleArticles, setVisibleArticles] = useState(1);

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
            if(feedData){
                setArticlesFeed(feedData);
                setVisibleArticles(10);
            }
        }

        fetchData();
  }, []);

    // Redireccionar al home si el usuario cierra sesion
    if(userInfo.userId==-2) return
    if(userInfo.userId==-1) redirect('/');

    return (
        <div className="py-2">
            {articlesFeed.length !== 0 && articlesFeed.length > 1 ? (
                <>
                {articlesFeed.slice(0, visibleArticles).map((item, index) => (
                    <div className="flex justify-center py-unit-4" key={index}>
                    <FeedArticleCard 
                        imageArticle={item.image_url}
                        profileImage={item.profile_image}
                        autor={`${item.name} ${item.lastname}`}
                        username={item.username}
                        title={item.title}
                        summary={item.sanitizedText}
                        id={item.id_article}
                        idWriter={item.id_writer}
                        views={item.views}
                        date={item.date.slice(0, 10)}
                        saved={item.saved}
                        savedUsername={item.savedUsername}
                        categories={item.article_has_categories}
                    />
                    </div>
                ))}
                {visibleArticles < articlesFeed.length && (
                    <div className="flex justify-center py-unit-4">
                    <button onClick={handleVerMasClick} className='bg-primary text-white py-2 px-3 rounded-xl'>
                        See more
                    </button>
                    </div>
                )}
                {visibleArticles >= articlesFeed.length && (
                    <div className='text-center font-bold text-2xl p-5'>
                        There are no more articles to see
                    </div>
                )}
                </>)
            :
                <div className='h-screen bg-[#C1D6E8] text-center font-bold text-2xl p-5'>
                    Nothing to see
                </div>

            }
        </div>
    )
}
'use client'

import React, {useState, useEffect} from "react";
import FeedArticleCard from "@/components/feed/FeedArticleCard";
import { decryptedJWT } from "@/dto/users";
import { getFeed } from "@/utils/fetchs";
import { getFromLocalStorage } from "@/utils/localStorage";
import verifyToken from "@/utils/utils";
import { redirect } from "next/navigation";

export default function FeedPage() {

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

    useEffect(() => {
        async function fetchData() {
            const feedData = await getFeed();
            setArticlesFeed(feedData);
        }

        fetchData();
  }, []);

    if(userInfo.userId==-2) return
    if(userInfo.userId==-1) redirect('/');

    return (
        <div className="py-2">
            {articlesFeed.length!==0?
                articlesFeed.map((item, index) => (
                    <div className="flex justify-center py-unit-4" key={index}>
                        <FeedArticleCard 
                            imageArticle = {item.image_url}
                            profileImage="https://i.pravatar.cc/150?u=a04258114e29026702d"
                            autor = {item.name}
                            username = {item.username}
                            title = {item.title}
                            summary = {item.sanitizedText}
                        />
                    </div>
                ))
            :
                <div className='text-center font-bold text-2xl p-5'>
                    No hay articulos para ver
                </div>

            }
        </div>
    )
}
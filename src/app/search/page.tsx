'use client'

import React, {useState, useEffect} from "react";
import ArticleCard from "@/components/search/ArticleCard";
import RecentCarousel from "@/components/RecentCarousel";
import { Button } from "@nextui-org/react";
import UserCard from "@/components/search/UserCard";
import { getArticleType } from "@/dto/article";
import { getUserType } from "@/dto/users";
import { useSearchParams } from 'next/navigation';
import { getSearch } from "@/utils/search/fetch";

const App=()=>{   

    const [filter, setFilter] = useState<[boolean,boolean,boolean]>([true,false,false])
    const [searchedArticles, setSearchedArticles]=useState<Array<getArticleType>>([{'id_article':0,'title':'','date':"",'text':'','writer':{'id_user':0,'username':''},'views':0,'image_url':''}])
    const [searchedUsers, setSearchedUsers]=useState<Array<getUserType>>([{'id_user':0,'username':'benito','name':'','lastname':'', 'rol':-1, 'followersCount':0,'followingsCount':0,'isFollowing':false, 'description':'','image_url':''}])
    const searchParams = useSearchParams().get('search')
    var search:string;
    if(searchParams){
        search=searchParams;
    }else{
        search=''
    }
    
    useEffect(()=>{
        async()=>{
            const res = await getSearch(search)
            if(res==undefined||(res[0].err&&res[1].err)){
                setFilter([false,false,false])
                console.log('mal')
            }else{
                console.log(res)
                setSearchedArticles(res[1])
                setSearchedUsers(res[0])
            }
        }
    },[])

    return <div className="flex flex-row justify-center min-w-full min-h-full">
            <div className="flex flex-col w-[70%]">
                <div className="flex flex-row w-full pt-3 pb-1 justify-center gap-16">
                    <Button className={`${filter[0]?"bg-[#963ED9] text-[#F8F8F8]":''}`} variant="light" isDisabled={filter[0]} onClick={()=>setFilter([true,false,false])}> Articles </Button>
                    <Button className={`${filter[1]?"bg-[#963ED9] text-[#F8F8F8]":''}`} variant="light" isDisabled={filter[1]} onClick={()=>setFilter([false,true,false])}> Users </Button>
                    <Button className={`${filter[2]?"bg-[#963ED9] text-[#F8F8F8]":''}`} variant="light" isDisabled={filter[2]} onClick={()=>setFilter([false,false,true])}> Comunities</Button>
                </div>
            <div id="divider" className="flex justify-center w-full">
            <div className="w-full h-0.5 bg-gray-300 mb-6 rounded-full">
            </div>
            </div>
            {filter[0]&&searchedUsers.length>0?
                <div className="flex flex-row gap-8 justify-center w-full pb-20">
                    <div className="flex flex-col gap-5 w-[28%] justify-center">
                        <ArticleCard article={{'id_article':0,'title':'Hi','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                        <ArticleCard article={{'id_article':0,'title':'Hisadisnhcyuisojnuydchjioashnufiobyiohfdiobjdugycsioxbhuidaohufsjioabhnbu','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                        <ArticleCard article={{'id_article':0,'title':'Hi','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                    </div>
                    <div className="flex flex-col gap-5 w-[28%] justify-center">
                        <ArticleCard article={{'id_article':0,'title':'Hi','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                        <ArticleCard article={{'id_article':0,'title':'Hisadisnhcyuisojnuydchjioashnufiobyiohfdiobjdugycsioxbhuidaohufsjioabhnbu','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                        <ArticleCard article={{'id_article':0,'title':'Hi','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                    </div>
                    <div className="flex flex-col gap-5 w-[28%] justify-center">
                        <ArticleCard article={{'id_article':0,'title':'Hi','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                        <ArticleCard article={{'id_article':0,'title':'Hisadisnhcyuisojnuydchjioashnufiobyiohfdiobjdugycsioxbhuidaohufsjioabhnbu','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                        <ArticleCard article={{'id_article':0,'title':'Hi','date':"09/15/2023",'text':'asdsad','writer':{'id_user':0,'username':'el_seba'},'views':10,'image_url':'https://www.eleconomista.com.mx/__export/1676509440126/sites/eleconomista/img/2023/02/13/terremoto_turquia.jpg_554688468.jpg'}}/>
                    </div>
                </div>
            :
                filter[1]&&searchedArticles.length>0?
                    <div className="flex flex-row gap-16 justify-center w-full pb-20">
                        <div className="flex flex-col gap-5 w-[35%] justify-center">
                            <UserCard user={{'id_user':0,'username':'benito','name':'Juan','lastname':'ron', 'rol':0, 'followersCount':100,'followingsCount':10231,'isFollowing':false, 'description':'dasdasdsasda','image_url':'https://www.sopitas.com/wp-content/uploads/2023/06/historia-detras-meme-hormiga-triste-origen-4.jpg?resize=1024,1019'}}/>
                            <UserCard user={{'id_user':0,'username':'benito','name':'Juan','lastname':'ron', 'rol':0, 'followersCount':100,'followingsCount':10231,'isFollowing':false, 'description':'dasdasdsasda','image_url':'https://www.sopitas.com/wp-content/uploads/2023/06/historia-detras-meme-hormiga-triste-origen-4.jpg?resize=1024,1019'}}/>
                            <UserCard user={{'id_user':0,'username':'benito','name':'Juan','lastname':'ron', 'rol':0, 'followersCount':100,'followingsCount':10231,'isFollowing':false, 'description':'dasdasdsasda','image_url':'https://www.sopitas.com/wp-content/uploads/2023/06/historia-detras-meme-hormiga-triste-origen-4.jpg?resize=1024,1019'}}/>

                        </div>
                        <div className="flex flex-col gap-5 w-[35%] justify-center">
                            <UserCard user={{'id_user':0,'username':'benito','name':'Juan','lastname':'ron', 'rol':0, 'followersCount':100,'followingsCount':10231,'isFollowing':false, 'description':'dasdasdsasda','image_url':'https://www.sopitas.com/wp-content/uploads/2023/06/historia-detras-meme-hormiga-triste-origen-4.jpg?resize=1024,1019'}}/>
                            <UserCard user={{'id_user':0,'username':'benito','name':'Juan','lastname':'ron', 'rol':0, 'followersCount':100,'followingsCount':10231,'isFollowing':false, 'description':'dasdasdsasda','image_url':'https://www.sopitas.com/wp-content/uploads/2023/06/historia-detras-meme-hormiga-triste-origen-4.jpg?resize=1024,1019'}}/>
                            <UserCard user={{'id_user':0,'username':'benito','name':'Juan','lastname':'ron', 'rol':0, 'followersCount':100,'followingsCount':10231,'isFollowing':false, 'description':'dasdasdsasda','image_url':'https://www.sopitas.com/wp-content/uploads/2023/06/historia-detras-meme-hormiga-triste-origen-4.jpg?resize=1024,1019'}}/>
                            
                        </div>
                    </div>
                :
                <>No se encontraron resultados</>

            }
            <RecentCarousel/>
            </div>
        </div>
}

export default App;
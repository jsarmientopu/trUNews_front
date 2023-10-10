'use client'

import React, {useState, useEffect} from "react";
import ArticleCard from "@/components/search/ArticleCard";
import RecentCarousel from "@/components/RecentCarousel";
import { Button } from "@nextui-org/react";
import UserCard from "@/components/search/UserCard";
import { getArticleType } from "@/dto/article";
import { getUserType } from "@/dto/users";
import { useSearchParams } from 'next/navigation';
import { getSearch } from "@/utils/Search/fetch";

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
        (async()=>{
            const res = await getSearch(search)
            if(res==undefined||(res[0].err&&res[1].err)){
                setFilter([false,false,false])
                console.log('mal')
                setSearchedArticles([])
                setSearchedUsers([])
            }else{
                console.log(res)
                if(res[0].err){
                    setSearchedUsers([])
                }else{
                    setSearchedUsers(res[0])
                }
                if(res[1].err){
                    setSearchedArticles([])
                }else{
                    setSearchedArticles(res[1])
                }
            }
        })()
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
            {filter[0]&&searchedArticles.length>0?
                <div className="flex flex-row gap-8 justify-center w-full pb-20">
                    <div className="flex flex-col gap-5 w-[28%] justify-start">
                        {searchedArticles.filter((item:getArticleType, index)=>index%3==0).map((item:getArticleType, index) => (
                            <ArticleCard key={index} article={item}/>
                        ))
                        }
                    </div>
                    <div className="flex flex-col gap-5 w-[28%] justify-start">
                        {searchedArticles.filter((item:getArticleType, index)=>index%3==1).map((item:getArticleType, index) => (
                            <ArticleCard key={index} article={item}/>
                        ))
                        }
                    </div>
                    <div className="flex flex-col gap-5 w-[28%] justify-start">
                        {searchedArticles.filter((item:getArticleType, index)=>index%3==2).map((item:getArticleType, index) => (
                            <ArticleCard key={index} article={item}/>
                        ))
                        }
                    </div>
                </div>
            :
                filter[1]&&searchedUsers.length>0?
                    <div className="flex flex-row gap-16 justify-center w-full pb-20">
                        <div className="flex flex-col gap-5 w-[35%] justify-center">
                            {searchedUsers.filter((item:getUserType, index)=>index%2==0).map((item:getUserType, index) => (
                            <UserCard key={index} user={item}/>
                            ))
                            }
                        </div>
                        <div className="flex flex-col gap-5 w-[35%] justify-start">
                            {searchedUsers.filter((item:getUserType, index)=>index%2==1).map((item:getUserType, index) => (
                            <UserCard key={index} user={item}/>
                            ))
                            }
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
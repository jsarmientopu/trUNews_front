'use client'

import React, {useState, useEffect} from "react";
import ArticleCard from "@/components/search/ArticleCard";
import RecentCarousel from "@/components/main/RecentCarousel";
import { Button, Pagination } from "@nextui-org/react";
import UserCard from "@/components/search/UserCard";
import { getArticleType } from "@/dto/article";
import { getUserType } from "@/dto/users";
import { communityInfo } from "@/dto/community";
import { useSearchParams } from 'next/navigation';
import { getSearch } from "@/utils/search/fetch";
import { getLatestPosts  } from "@/utils/fetchs";
import { getFromLocalStorage } from "@/utils/localStorage";
import Link from "next/link";

const App=()=>{   

    const [filter, setFilter] = useState<[boolean,boolean,boolean]>([true,false,false])
    const [searchedArticles, setSearchedArticles]=useState<Array<getArticleType>>([{'id_article':-1,'title':'','date':"",'text':'','writer':{'id_user':0,'username':''},'views':0,'image_url':'', 'category':[]}])
    const [searchedUsers, setSearchedUsers]=useState<Array<getUserType>>([{'id_user':-1,'username':'benito','name':'','lastname':'', 'rol':-1, 'followersCount':0,'followingsCount':0,'isFollowing':false, 'description':'','profile_image':''}])
    const searchParams = useSearchParams().get('q')
    const [recentCarouselData, setRecentCarouselData] = useState()
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    var search:string;
    if(searchParams){
        search=searchParams;
    }else{
        search=''
    }

    const handlePageChange = (page: number) => {
        window.scroll(0,0);
        setCurrentPage(page);
    };
    
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
                    console.log(res[1])
                    setSearchedArticles(res[1])
                }
                if(res[2].err){
                    setSearchedArticles([])
                }else{
                    console.log(res[2])
                    setSearchedCommunities(res[2])
                }
            }
            const recentCarouselData2 = await getLatestPosts();
            setRecentCarouselData(recentCarouselData2)
        })()
    },[])

    return <div className="flex flex-row justify-center min-w-full min-h-full">
            <div className="flex flex-col w-[70%]">
                <div className="flex flex-row w-full pt-3 pb-1 justify-center gap-16">
                    <Button className={`${filter[0]?"bg-[#963ED9] text-[#F8F8F8]":''}`} variant="light" isDisabled={filter[0]} onClick={()=>{setFilter([true,false,false]);setCurrentPage(1)}}> Articles </Button>
                    <Button className={`${filter[1]?"bg-[#963ED9] text-[#F8F8F8]":''}`} variant="light" isDisabled={filter[1]} onClick={()=>{setFilter([false,true,false]);setCurrentPage(1)}}> Users </Button>
                    <Button className={`${filter[2]?"bg-[#963ED9] text-[#F8F8F8]":''}`} variant="light" isDisabled={filter[2]} onClick={()=>{setFilter([false,false,true]);setCurrentPage(1)}}> Comunities</Button>
                </div>
            <div id="divider" className="flex justify-center w-full">
            <div className="w-full h-0.5 bg-gray-300 mb-6 rounded-full">
            </div>
            </div>
            <div className="flex flex-row gap-4 w-full p-5 justify-between">
                <p className="text-xl italic">Search: {search}</p>
                {/* <p className="text-lg">Page {currentPage}</p> */}
            </div>
            {filter[0]&&searchedArticles.length>0?
                    <div className="flex flex-wrap flex-row gap-8 justify-center w-full pb-20">
                        <div className="flex flex-col gap-5 w-[80%] sm:w-[45%] lg:w-[28%] justify-start">
                            {searchedArticles.filter((item:getArticleType, index)=>index%3==0&&(index<currentPage*itemsPerPage*3&&(currentPage-1)*itemsPerPage*3<=index)).map((item:getArticleType, index) => (
                                <ArticleCard key={index} article={item}/>
                            ))
                            }
                        </div>
                        <div className="flex flex-col gap-5 w-[80%] sm:w-[45%] lg:w-[28%] justify-start">
                            {searchedArticles.filter((item:getArticleType, index)=>index%3==1&&(index<currentPage*itemsPerPage*3&&(currentPage-1)*itemsPerPage*3<=index)).map((item:getArticleType, index) => (
                                <ArticleCard key={index} article={item}/>
                            ))
                            }
                        </div>
                        <div className="flex flex-col gap-5 w-[80%] sm:w-[45%] lg:w-[28%] justify-start">
                            {searchedArticles.filter((item:getArticleType, index)=>index%3==2&&(index<currentPage*itemsPerPage*3&&(currentPage-1)*itemsPerPage*3<=index)).map((item:getArticleType, index) => (
                                <ArticleCard key={index} article={item}/>
                            ))
                            }
                        </div>
                    </div>
                :
                    filter[1]&&searchedUsers.length>0?
                        <div className="flex flex-wrap flex-row gap-16 justify-center w-full pb-20">
                            <div className="flex flex-col gap-5 w-[80%] md:w-[35%] justify-center">
                                {searchedUsers.filter((item:getUserType, index)=>index%2==0&&(index<currentPage*itemsPerPage*2&&(currentPage-1)*itemsPerPage*2<=index)).map((item:getUserType, index) => (
                                <UserCard key={index} user={item}/>
                                ))
                                }
                            </div>
                            <div className="flex flex-col gap-5 w-[80%] md:w-[35%] justify-start">
                                {searchedUsers.filter((item:getUserType, index)=>index%2==1&&(index<currentPage*itemsPerPage*2&&(currentPage-1)*itemsPerPage*2<=index)).map((item:getUserType, index) => (
                                <UserCard key={index} user={item}/>
                                ))
                                }
                            </div>
                        </div>
                    :
                        getFromLocalStorage('token')==null?
                            <p>Register <Link href={'/register'} className="text-[#4272F4] font-bold underline">here</Link> to view the result</p>
                        :
                            <>No results found</>

            }
            <div className="hidden md:flex lg:flex justify-center py-unit-4">
                <Pagination total={Math.ceil(filter[1]?searchedUsers.length / (itemsPerPage*2):searchedArticles.length / (itemsPerPage*3))} page={currentPage} onChange={(page) => handlePageChange(page)} 
                variant="light" size="lg" showControls siblings={2} radius="full"/>
            </div>
            <div className="flex md:hidden lg:hidden justify-center py-unit-4">
                <Pagination total={Math.ceil(filter[1]?searchedUsers.length / itemsPerPage:searchedArticles.length / itemsPerPage)} page={currentPage} onChange={(page) => handlePageChange(page)} 
                variant="light" size="lg" showControls radius="full"/>
            </div>
            <RecentCarousel recentCarouselData={recentCarouselData} />
            </div>
        </div>
}

export default App;
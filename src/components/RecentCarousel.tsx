
/* import {recentCarouselData} from './recentCarouselData' */
import RecentArticle from "./RecentArticle";
import RecentCarouselEmbla from "./RecentCarouselEmbla";
import { getLatestPosts } from "@/utils/fetchs";
import {useEffect} from 'react'
import {useState} from 'react'

export default function RecentCarousel() {
    
    const[recentCarouselData,setRecentCarouselData] = useState()

    useEffect(()=>{
        const fetchData = async () =>{
            const posts = await getLatestPosts()
            /* const res = await posts.json() */
            setRecentCarouselData(posts)
        };
        fetchData(); 
    },[recentCarouselData])


    return (

        <div>
            <div className="mb-1 overflow-hidden">
                <RecentCarouselEmbla loop align="start">
                    {recentCarouselData?.map((slide:any, index:any) => {
                        return (
                            <div key={index} className='flex-[0_0_25%] flex justify-center'>
                                <RecentArticle id = {slide.article_id} image={slide.image_url} title={slide.title} timeSincePosted={slide.date} />
                            </div>
                            
                        )
                    })}
                </RecentCarouselEmbla>
            </div>
        </div>



    )
}
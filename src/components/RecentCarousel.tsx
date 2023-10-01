'use client'
/* import {recentCarouselData} from './recentCarouselData' */
import RecentArticle from "./RecentArticle";
import RecentCarouselEmbla from "./RecentCarouselEmbla";

async function loadLastestPosts(){
    const res = await fetch("http://localhost:3005/articles/latest/5")
    const recentCarouselData = res.json()
    return recentCarouselData
}

export default async function RecentCarousel() {
    const recentCarouselData = await loadLastestPosts();
    return (

        <div>
            <div className="mb-1 overflow-hidden">
                <RecentCarouselEmbla loop align="start">
                    {recentCarouselData.map((slide:any, index:any) => {
                        return (
                            <div key={index} className='flex-[0_0_25%] flex justify-center'>
                                <RecentArticle image={slide.image_url} title={slide.title} timeSincePosted={slide.date} />
                            </div>
                            
                        )
                    })}
                </RecentCarouselEmbla>
            </div>
        </div>



    )
}
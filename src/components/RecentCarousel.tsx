'use client'
import {recentCarouselData} from './recentCarouselData'
import RecentArticle from "./RecentArticle";
import RecentCarouselEmbla from "./RecentCarouselEmbla";

export default function RecentCarousel() {
    return (

        <div>
            <div className="mb-1 overflow-hidden">
                <RecentCarouselEmbla loop align="start">
                    {recentCarouselData.map((slide, index) => {
                        return (
                            <div key={index} className='flex-[0_0_25%] flex justify-center'>
                                <RecentArticle image={slide.image} title={slide.title} timeSincePosted={slide.timeSincePosted} />
                            </div>
                            
                        )
                    })}
                </RecentCarouselEmbla>
            </div>
        </div>



    )
}
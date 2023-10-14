'use client'
/* import {recentCarouselData} from './recentCarouselData' */
import RecentArticle from "./RecentArticle";
import RecentCarouselEmbla from "./RecentCarouselEmbla";
import { ScrollShadow } from "@nextui-org/react";


export default function RecentCarousel({ recentCarouselData }: any) {


    return (

        <div>
            <div className="mb-1 overflow-hidden">
                {/* la idea seria que fuera lg:loop */}

                <RecentCarouselEmbla loop align="start">
                    {recentCarouselData?.map((slide: any, index: any) => {
                        return (
                            <div key={index} className='flex-[0_0_25%] flex justify-center mr-5 lg:mr-0'>
                                <RecentArticle id={slide.article_id} image={slide.image_url} title={slide.title} timeSincePosted={slide.date} />
                            </div>

                        )
                    })}
                </RecentCarouselEmbla>


            </div>
        </div>



    )
}
'use client'

import TrendingCarousel from "@/components/main/TrendingCarousel"
import RecentCarousel from "@/components/main/RecentCarousel"
import { getLatestPosts } from "@/utils/fetchs";
import { getTrendingPosts } from "@/utils/fetchs";
import { getTrendingWriters } from "@/utils/fetchs";
import TrendingWriterPanel from "@/components/trend-writers/TrendingWriterPanel";
import { useEffect } from "react";
import { useState } from 'react'

export default function Home() {

    /* const recentCarouselData = await getLatestPosts()
    const trendingCarouselData = await getTrendingPosts() */
    const [recentCarouselData, setRecentCarouselData] = useState()
    const [trendingCarouselData, setTrendingCarouselData] = useState()
    const [writersData, setWritersData] = useState()



    useEffect(() => {
        (async () => {
            const recentCarouselData2 = await getLatestPosts();
            setRecentCarouselData(recentCarouselData2)
            console.log(recentCarouselData2)
            const trendingCarouselData2 = await getTrendingPosts();
            setTrendingCarouselData(trendingCarouselData2)
            console.log(trendingCarouselData2)
            const writersData2 = await getTrendingWriters();
            setWritersData(writersData2)
            console.log(writersData2)
        })();
    }, [])




    return (
        <div>
            <div id="main-page" className="p-8">
                <TrendingCarousel trendingCarouselData={trendingCarouselData} />

                <div id="divider" className="flex justify-center">
                    <div className="w-[70%] h-0.5 bg-gray-200 mb-6 rounded-full">
                    </div>
                </div>


                <RecentCarousel recentCarouselData={recentCarouselData} />



                <div id="divider2" className="flex justify-center">
                    <div className="w-[70%] h-0.5 bg-gray-200 rounded-full">
                    </div>
                </div>
            </div>


            <TrendingWriterPanel trendingWritersData={writersData} />

        </div>
    )
}

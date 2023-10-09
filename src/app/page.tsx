

import TrendingCarousel from "@/components/main/TrendingCarousel"
import RecentCarousel from "@/components/main/RecentCarousel"
import { getLatestPosts } from "@/utils/fetchs";
import { getTrendingPosts } from "@/utils/fetchs";

export default async function Home() {

    const recentCarouselData = await getLatestPosts()
    const trendingCarouselData = await getTrendingPosts()


    return (
        <div className="p-8">

            <TrendingCarousel trendingCarouselData = {trendingCarouselData}/>

            <div id="divider" className="flex justify-center">
                <div className="w-[70%] h-0.5 bg-gray-200 mb-6 rounded-full">
                </div>
            </div>

            <RecentCarousel recentCarouselData = {recentCarouselData} />

        </div>
    )
}

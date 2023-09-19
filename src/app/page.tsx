'use client'

import TrendingCarousel from "@/components/TrendingCarousel"
import RecentCarousel from "@/components/RecentCarousel"


export default function Home() {
    return (
        <div className="p-8">
            
            <TrendingCarousel />

            <RecentCarousel />

        </div>
    )
}

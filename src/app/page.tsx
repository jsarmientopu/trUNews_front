'use client'

import TrendingCarousel from "@/components/TrendingCarousel"
import RecentCarousel from "@/components/RecentCarousel"
import { Divider } from "@nextui-org/react"


export default function Home() {
    return (
        <div className="p-8">

            <TrendingCarousel />
            {/* <Divider className="mb-7"></Divider> */}
            <div id="divider" className="flex justify-center">
                <div className="w-[70%] h-0.5 bg-gray-200 mb-6 rounded-full">
                </div>
            </div>

            <RecentCarousel />

        </div>
    )
}

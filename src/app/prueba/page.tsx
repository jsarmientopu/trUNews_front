'use client'
import LoginCard from "@/components/LoginCard"
import TrendingArticle from "@/components/TrendingArticle"
import RecentArticle from "@/components/RecentArticle"
import { BsFire } from 'react-icons/bs'
import { MdArrowBackIosNew } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import {ImClock} from 'react-icons/im'
import TrendingCarousel from "@/components/TrendingCarousel"


export default function prueba() {
    return (
        <div className="p-8">
            {/* <div className="flex mb-5 justify-between">
                <div className="flex items-center">
                    <div className="mr-3">
                        <BsFire size="2em" />

                    </div>
                    <p className="font-bold text-4xl">Noticias más vistas</p>

                </div>


                <div className="flex justify-end items-center">
                    <div className="mr-6">
                        <MdArrowBackIosNew size="2em" />
                    </div>
                    <div>
                        <MdArrowForwardIos size="2em" />
                    </div>
                </div>

            </div> */}

            {/* <div className="mb-16">
                <TrendingArticle image="https://i2.wp.com/confirmado.net/wp-content/uploads/2020/10/terremoto_turquia.jpg" title="Terremoto en Turquía" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Pulvinar sapien et ligula ullamcorper malesuada proin. Dignissim sodales ut eu sem integer vitae justo. Pulvinar pellentesque habitant morbi tristique senectus et netus et. Pharetra et ultrices neque ornare aenean euismod elementum. Id ornare arcu odio ut sem nulla pharetra diam sit. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque elit eget gravida cum sociis natoque penatibus. In egestas erat imperdiet sed euismod nisi porta lorem mollis. In massa tempor nec feugiat nisl pretium fusce id. Faucibus a pellentesque sit amet porttitor eget. Eget duis at tellus at urna condimentum mattis pellentesque. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin." />
            </div> */}
            <TrendingCarousel />

            <div className="flex mb-5 justify-between">
                <div className="flex items-center">
                    <div className="mr-3">
                        <ImClock size="1.3em" />

                    </div>
                    <p className="font-bold text-2xl">Últimas noticias</p>

                </div>


                <div className="flex justify-end items-center">
                    <div className="mr-6">
                        <MdArrowBackIosNew size="1.3em" />
                    </div>
                    <div>
                        <MdArrowForwardIos size="1.3em" />
                    </div>
                </div>

            </div>


            <div className="flex justify-between pr-10 pl-10">
                <RecentArticle image="https://i2.wp.com/confirmado.net/wp-content/uploads/2020/10/terremoto_turquia.jpg" title="Terremoto en Turquía" timeSincePosted="Hace un día" />
                <RecentArticle image="https://i2.wp.com/confirmado.net/wp-content/uploads/2020/10/terremoto_turquia.jpg" title="Terremoto en Turquía" timeSincePosted="Hace un día" />
                <RecentArticle image="https://i2.wp.com/confirmado.net/wp-content/uploads/2020/10/terremoto_turquia.jpg" title="Terremoto en Turquía" timeSincePosted="Hace un día" />
                <RecentArticle image="https://i2.wp.com/confirmado.net/wp-content/uploads/2020/10/terremoto_turquia.jpg" title="Terremoto en Turquía" timeSincePosted="Hace un día" />

            </div>











        </div>
    )
}
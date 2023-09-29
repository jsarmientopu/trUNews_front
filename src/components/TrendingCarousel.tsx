'use client'
import { carrouselData } from "./carrouselData";
import TrendingArticle from './TrendingArticle';
import { BsFire } from 'react-icons/bs'
import { MdArrowBackIosNew } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import CarouselEmbla from './CarouselEmbla';

export default function TrendingCarousel() {


    return (

        <div>
            <div className="mb-1 overflow-hidden">
                <CarouselEmbla loop>
                    {carrouselData.map((slide, index) => {
                        return (
                            <div key={index} className='flex-[0_0_100%]'>
                                <TrendingArticle image={slide.image} title={slide.title} description={slide.description} />
                            </div>
                            
                        )
                    })}
                </CarouselEmbla>
            </div>
        </div>



    )
}
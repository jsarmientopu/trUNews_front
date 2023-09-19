'use client'
import { useState } from 'react'
import { carrouselData } from "./carrouselData";
import TrendingArticle from './TrendingArticle';
import { BsFire } from 'react-icons/bs'
import { MdArrowBackIosNew } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import { ImClock } from 'react-icons/im'

export default function TrendingCarousel() {

    const [currentSlide, setCurrentSlide] = useState(0);

    function nextSlide() {
        currentSlide === carrouselData.length - 1
            ? setCurrentSlide(0)
            : setCurrentSlide(currentSlide + 1);
    }

    function prevSlide() {
        currentSlide === 0
            ? setCurrentSlide(carrouselData.length - 1)
            : setCurrentSlide(currentSlide - 1);
    }

    return (

        <div>
            <div className="flex mb-5 justify-between">
                <div className="flex items-center">
                    <div className="mr-3">
                        <BsFire size="2em" />

                    </div>
                    <p className="font-bold text-4xl">Noticias más vistas</p>

                </div>


                <div className="flex justify-end items-center">
                    <div className="mr-6 cursor-pointer select-none" onClick={prevSlide}>
                        <MdArrowBackIosNew size="2em" />
                    </div>
                    <div className='cursor-pointer select-none'>
                        <MdArrowForwardIos size="2em" onClick={nextSlide} />
                    </div>
                </div>

            </div>


            <div className="mb-16 overflow-hidden">
                {carrouselData.map((slide, index) => {
                    return (
                        <TrendingArticle key={index} image={slide.image} title={slide.title} description={slide.description} className={
                            index !== currentSlide
                                ? "hidden" : "mb-2"
                        } />
                    )
                })}
            </div>
        </div>



    )
}
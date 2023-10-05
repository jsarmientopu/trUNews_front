'use client'
import TrendingArticle from './TrendingArticle';
import CarouselEmbla from './CarouselEmbla';


export default function TrendingCarousel({trendingCarouselData}:any) {

    

    return (

        <div>
            <div className="mb-1 overflow-hidden">
                <CarouselEmbla loop>
                    {trendingCarouselData.map((slide:any, index:any) => {
                        return (
                            <div key={index} className='flex-[0_0_100%]'>
                                <TrendingArticle id={slide.articles_id_article} image={slide.image_url} title={slide.title} description={slide.text} />
                            </div>
                            
                        )
                    })}
                </CarouselEmbla>
            </div>
        </div>



    )
}

import TrendingArticle from './TrendingArticle';
import CarouselEmbla from './CarouselEmbla';

async function loadTrendingPosts(){
    const res = await fetch("http://localhost:3005/articles/trending/5")
    const trendingCarouselData = res.json()
    return trendingCarouselData
}

export default async function TrendingCarousel() {

    const trendingCarouselData = await loadTrendingPosts();

    return (

        <div>
            <div className="mb-1 overflow-hidden">
                <CarouselEmbla loop>
                    {trendingCarouselData.map((slide:any, index:any) => {
                        return (
                            <div key={index} className='flex-[0_0_100%]'>
                                <TrendingArticle image={slide.image_url} title={slide.title} description={slide.text} />
                            </div>
                            
                        )
                    })}
                </CarouselEmbla>
            </div>
        </div>



    )
}
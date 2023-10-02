
import TrendingArticle from './TrendingArticle';
import CarouselEmbla from './CarouselEmbla';
import {useState} from 'react'
import {useEffect} from 'react'
import { getTrendingPosts } from '@/utils/fetchs';

/* async function getTrendingPosts(){
    const res = await fetch("http://localhost:3005/articles/trending/5")
    const trendingCarouselData = res.json()
    return trendingCarouselData
} */

export default function TrendingCarousel() {

    /* const trendingCarouselData = await loadTrendingPosts(); */

    const[trendingCarouselData,setTrendingCarouselData] = useState()

    useEffect(()=>{
        const fetchData = async () =>{
            const posts = await getTrendingPosts()
            /* const res = await posts.json() */
            setTrendingCarouselData(posts)
        };
        fetchData(); 
    },[trendingCarouselData])

    return (

        <div>
            <div className="mb-1 overflow-hidden">
                <CarouselEmbla loop>
                    {trendingCarouselData?.map((slide:any, index:any) => {
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
import { decryptedJWT } from "@/dto/users";
import SavedCard from "@/components/profile/SavedCard";
import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import { getSaved } from "@/utils/fetchs";
import { getArticleType } from "@/dto/article";
import { useViewportScroll } from "framer-motion";
import "../../app/globals.css"
import { getStatistics } from "@/utils/Profile/fetch";
import { Button, Divider } from '@nextui-org/react';
import StatisticsGraph from "./statistics";


const SavedArticles=({userInfo, userView, articleWriter,articlesPage}:{'userInfo':decryptedJWT, 'userView':number, 'articleWriter':any, 'articlesPage':any})=>{
    const ani = useSpring({
        from: { width: '40%' },
        to: { width: '80%' },
        config: { duration: 500 },
    })

    const [savedArticles, setSavedArticles]=useState<Array<getArticleType>>([{
        'id_article':0,
        'title':'',
        'date':'',
        'image_url':'',
        'text':'',
        'writer':{'id_user':0,'username':''},
        'category':[]
    }])

    const [counter, setCounter] = useState<number>(1);

    const [statisticsView, setStatisticsView] = useState<boolean>(false);

    // User Statistics
    const [statistics, setStatistics] = useState<any>([
        {
            category: '',
            views: 0
        },
    ]);

    
     // fetch statistics
    useEffect(() => {
        async function fetchData() {
            const StatisticsData = await getStatistics(userInfo.userId);
            if (StatisticsData) {
                setStatistics(StatisticsData);
            }
        }

        fetchData();
    }, []);

    function ViewStatistics() {
        setStatisticsView(!statisticsView);
    }

    useEffect(() => {
        (async () => {
            console.log(userView, userInfo)
            if(articlesPage){
                if(articleWriter){
                    setSavedArticles(articleWriter)
                }else{
                    setSavedArticles([])
                }
            }else{
                const articles = await getSaved(userView);
                if(!articles.err){
                    setSavedArticles(articles); 
                }else{
                    setSavedArticles([]);
                }
            }
        })();
    },[articlesPage])

    return <animated.div className="flex flex-col bg-[#F0F2F4] md:w-[80%] rounded-2xl justify-center items-center shadow-xl" style={ani}>
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full lg:w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">
                {articlesPage?
                    <>
                        <p className="text-2xl">Written Articles</p>
                        { userView == userInfo.userId && 
                            <span className="flex material-symbols-outlined icon_button justify-end" title="My Statistics" onClick={ViewStatistics}>
                                finance
                            </span>  
                        }
                    </>
                :
                    <p className="text-2xl">Saved Articles</p>
                }
            </div>
            <div>
                { statisticsView &&
                    <>
                        <StatisticsGraph statistics={statistics} />
                        <Divider className="my-4" />
                    </>
                }
            </div>
            <div className="flex flex-col lg:flex-wrap lg:flex-row justify-center items-center md:justify-center h-[50%] sm:h-full w-[95%] py-5 px-5 lg:px-14 sm:pb-10 pt-0 gap-4 bg-[#F0F2F4]">
                {savedArticles.length!==0?
                    savedArticles.filter((element:getArticleType, index)=>index<counter*6).map((item:getArticleType, index) => (
                        <SavedCard key={index} data={item} mode={articlesPage} userInfo={userInfo} userView={userView} articles={savedArticles} setArticles={setSavedArticles}/>
                    ))
                :
                    articlesPage?
                        <>{'You haven\'t written any articles'}</>
                    :
                        <>{'You haven\'t saved any articles'}</>

                }
                {savedArticles.length>counter*6?
                    <button onClick={()=>{setCounter(counter+1)}} className='bg-primary text-white py-2 px-3 rounded-xl'>
                        See more
                    </button>
                    :
                    <></>
                    }
            </div>
        </animated.div>
}

export default SavedArticles;
import { decryptedJWT } from "@/dto/users";
import SavedCard from "@/components/profile/SavedCard";
import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import { getSaved } from "@/utils/fetchs";
import { getArticleType } from "@/dto/article";
import { useViewportScroll } from "framer-motion";
import "../../app/globals.css"
import { getStatistics } from "@/utils/Profile/fetch";
import { Divider } from '@nextui-org/react';
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
                setSavedArticles(articleWriter)
            }else{
                const articles = await getSaved(userView);
                setSavedArticles(articles); 
            }
        })();
    },[articlesPage])

    return <animated.div className="flex flex-col bg-[#F0F2F4] md:w-[80%] rounded-2xl justify-center items-center shadow-xl" style={ani}>
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full lg:w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">
                {articlesPage?
                    <>
                        <p className="text-2xl">Written Articles</p>
                        <span className="flex material-symbols-outlined icon_button justify-end" title="My Statistics" onClick={ViewStatistics}>
                            finance
                        </span>  
                    </>
                :
                    <p className="text-2xl">Saved Articles</p>
                }
            </div>
            <div>
                {statisticsView && 
                    <>
                        <StatisticsGraph statistics={statistics} />
                        <Divider className="my-4" />
                    </>
                }
            </div>
            <div className="flex flex-col lg:flex-wrap lg:flex-row justify-center items-center md:justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 lg:px-14 sm:pb-10 pt-0 gap-4 bg-[#F0F2F4]">
                {savedArticles.length!==0?
                    savedArticles.map((item:getArticleType, index) => (
                        <SavedCard key={index} data={item} mode={articlesPage} userInfo={userInfo} userView={userView} articles={savedArticles} setArticles={setSavedArticles}/>
                    ))
                :
                    articlesPage?
                        <>You haven´t written any articles</>
                    :
                        <>You haven´t saved any articles</>

                }

            </div>
        </animated.div>
}

export default SavedArticles;
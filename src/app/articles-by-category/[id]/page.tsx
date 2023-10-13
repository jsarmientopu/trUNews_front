'use client'

import React, {useState, useEffect} from "react";
import ArticleCard from "@/components/articles-by-category/ArticleCard";
import { getArticlesByCategory } from "@/utils/fetchs";

export default function ArticlesByCategoryPage({ params }: any) {

    const [articles, setArticles] = useState<Array<any>>([{
        'date':'',
        'id_article': 0,
        'id_writer': 0,
        'image_url': '',
        'lastname': '',
        'name': '',
        'sanitizedText': '',
        'text': '',
        'title': '',
        'username': '',
        'profile_image': '',
        'views': 0,
        'article_has_categories': []
    }]);

    // Rastreo de articulos visibles en el feed
    const [visibleArticles, setVisibleArticles] = useState(1);

    const handleVerMasClick = () => {
        setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 10);
    }

    // fetch de articulos a mostrar en el feed
    useEffect(() => {
        async function fetchData() {
            const articlesByCategoryData = await getArticlesByCategory(params.id);
            if(articlesByCategoryData){
                setArticles(articlesByCategoryData);
                setVisibleArticles(10);
            }
        }

        fetchData();}, []);

    return (
        <div className="py-2">
            <p className="text-center font-bold text-3xl p-5">CATEGORY ARTICLES</p>
            {articles.length !== 0 && articles.length > 1 ? (
                <>
                {articles.slice(0, visibleArticles).map((item, index) => (
                    <div className="flex justify-center py-unit-4" key={index}>
                    <ArticleCard 
                        imageArticle={item.image_url}
                        profileImage={item.image_url}
                        autor={`${item.name} ${item.lastname}`}
                        username={item.username}
                        title={item.title}
                        summary={item.sanitizedText}
                        id={item.id_article}
                        idWriter={item.id_writer}
                        views={item.views}
                        date={item.date.slice(0, 10)}
                        categories={["SPORTS", "POLITICS", "ENTERTAINMENT"]}
                    />
                    </div>
                ))}
                {visibleArticles < articles.length && (
                    <div className="flex justify-center py-unit-4">
                    <button onClick={handleVerMasClick} className='bg-primary text-white py-2 px-3 rounded-xl'>
                        See more
                    </button>
                    </div>
                )}
                {visibleArticles >= articles.length && (
                    <div className='text-center font-bold text-2xl p-5'>
                        There are no more articles to see
                    </div>
                )}
                </>)
            :
                <div className='h-screen bg-[#C1D6E8] text-center font-bold text-2xl p-5'>
                    Nothing to see
                </div>

            }
        </div>
    )
}
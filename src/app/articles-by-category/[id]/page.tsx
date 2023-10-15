'use client'

import React, {useState, useEffect} from "react";
import ArticleCard from "@/components/articles-by-category/ArticleCard";
import { getArticlesByCategory } from "@/utils/fetchs";
import { getCategoryById } from "@/utils/fetchs";
import { Pagination } from '@nextui-org/react';

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

    const [category, setCategory] = useState<Array<any>>([{
        'id_category':0,
        'cat_name': "",
    }]);

    // Paginacion de articulos
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // fetch de articulos a mostrar en el feed
    useEffect(() => {
        async function fetchData() {
            const articlesByCategoryData = await getArticlesByCategory(params.id);
            if(articlesByCategoryData){
                setArticles(articlesByCategoryData);
            }
        }

        fetchData();}, []);

    // fetch de articulo por categoria
    useEffect(() => {
        async function fetchData() {
            const CategoryData = await getCategoryById(params.id);
            if(CategoryData){
                setCategory(CategoryData);
            }
        }

        fetchData();}, []);

    return (
        <div className="py-2">
            <p className="text-center font-bold text-3xl p-5">{category.cat_name} ARTICLES</p>
            <div className="hidden md:flex lg:flex justify-center py-unit-4">
                <Pagination total={Math.ceil(articles.length / itemsPerPage)} page={currentPage} onChange={(page) => handlePageChange(page)} 
                variant="light" size="lg" showControls siblings={2} radius="full"/>
            </div>
            <div className="flex md:hidden lg:hidden justify-center py-unit-4">
                <Pagination total={Math.ceil(articles.length / itemsPerPage)} page={currentPage} onChange={(page) => handlePageChange(page)} 
                variant="light" size="lg" showControls radius="full"/>
            </div>
            {articles.length !== 0 ? (
                <>
                {articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                    <div className="flex justify-center py-unit-4" key={index}>
                    <ArticleCard 
                        imageArticle={item.image_url}
                        profileImage={item.profile_image}
                        autor={`${item.name} ${item.lastname}`}
                        username={item.username}
                        title={item.title}
                        summary={item.sanitizedText}
                        id={item.id_article}
                        idWriter={item.id_writer}
                        views={item.views}
                        date={item.date.slice(0, 10)}
                        categories={item.article_has_categories}
                    />
                    </div>
                ))}
                <div className="hidden md:flex lg:flex justify-center py-unit-4">
                <Pagination total={Math.ceil(articles.length / itemsPerPage)} page={currentPage} onChange={(page) => handlePageChange(page)} 
                    variant="light" size="lg" showControls siblings={2} radius="full"/>
                </div>
                <div className="flex md:hidden lg:hidden justify-center py-unit-4">
                    <Pagination total={Math.ceil(articles.length / itemsPerPage)} page={currentPage} onChange={(page) => handlePageChange(page)} 
                    variant="light" size="lg" showControls radius="full"/>
                </div>
                </>)
            :
                <div className='h-screen bg-[#C1D6E8] text-center font-bold text-2xl p-5'>
                    Nothing to see
                </div>
            }
        </div>
    )
}



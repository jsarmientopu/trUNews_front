import React from "react";
import { FaEye } from "react-icons/fa";
import {Image, Button } from "@nextui-org/react";
import { getArticleType } from "@/dto/article";
import Link from "next/link";
import ArticleOption from "./ArticleOption";

const SavedCard = ({data, mode, userInfo, userView, articles, setArticles}:{data:getArticleType, mode:boolean, userInfo:any, userView:number, articles:any, setArticles:any})=>{
            console.log(userView, userInfo)

    return <>
        <div className="flex flex-row rounded-2xl w-full md:w-[80%] lg:w-[70%] xl:w-[49%] bg-[#EEEFEF] p-4 gap-3 shadow-lg h-auto relative hover:scale-105">
            <div className="w-[50%] h-[90%] flex flex-col justify-center">
                <Image
                    className="mr-0"
                    height={'100%'}
                    width={'100%'}
                    alt="NextUI hero Image with delay"
                    src={data.image_url}
                />
            </div>
            <div className="flex flex-col justify-center items-center sm:w-[70%] md:w-[60%] lg:w-[70%] xl:w-[50%] gap-4 pt-6">
                <p className="text-center max-w-full text-ellipsis overflow-hidden text-lg">{data.title}</p>
                <Link href={{pathname:`/article/${data.id_article}`}} className="flex flex-col w-[70%]">
                    <Button className="flex flex-col mx-[10%] py-7 bg-[#0079DC] text-[#F8F8F8]">
                        <div className="flex flex-col items-center text-white xl:text-lg">
                            <p className="">Read Article</p>
                            <FaEye size='1.5em'/>
                        </div>
                    </Button>
                </Link>
            </div>
            {userView==userInfo.userId?
            <div className="absolute top-0 right-1">
                    <ArticleOption mode={mode} article={data} articles={articles} setArticles={setArticles}/>
            </div>
            :
            <></>
            }
        </div>
    </>

}

export default SavedCard;
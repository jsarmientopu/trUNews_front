import React from "react";
import { FaEye } from "react-icons/fa";
import {Image, Button } from "@nextui-org/react";
import { getArticleType } from "@/dto/article";
import Link from "next/link";

const SavedCard = ({data}:{data:getArticleType})=>{
    return <>
        <div className="flex flex-row rounded-[15px] w-[49%] bg-[#EEEFEF] p-4 gap-3 shadow-lg">
            <div className="w-[50%]">
                <Image
                    className="mr-0"
                    width={'100%'}
                    height={'100%'}
                    alt="NextUI hero Image with delay"
                    src={data.image_url}
                />
            </div>
            <div className="flex flex-col justify-center w-[50%] gap-2">
                <p className="text-center">{data.title}</p>
                <Link href={{pathname:`/articulo/${data.id_article}`}} className="flex flex-col">
                    <Button className="flex flex-col mx-[10%] py-7 bg-[#0079DC] text-[#F8F8F8]">
                        <div className="flex flex-col items-center text-white">
                            <p className="">Ver articulo</p>
                            <FaEye size='1.5em'/>
                        </div>
                    </Button>
                </Link>
            </div>
        </div>
    </>

}

export default SavedCard;
'use client'

import { Button } from "@nextui-org/react"
import Image from 'next/image'
import Link from "next/link"

export default function TrendingArticle({ id,image, title, description }: any) {
    return (
        <div id="container-trending-article">
            <div className="flex">

                <div className="relative mr-9 ml-5">

                    <div className="w-[20rem] md:w-[30rem] lg:w-[45rem] h-72 select-none">
                        <img src={image} className="w-full h-full object-cover rounded-lg" alt={`img-${id}`} />
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <p className="font-bold text-3xl drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,100)]">{title}</p>
                    </div>

                </div>

                <div className="flex flex-col justify-between">
                    
                    <div className="break-words text-justify mr-6">
                        <p className="line-clamp-[9]">{description}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="bg-[#963ED9] text-white py-2 px-3 rounded-xl" onClick={() => console.log(id)}>
                            <Link href={`articulo/${id}`}>
                                Leer artículo
                            </Link>
                        </button>  
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}
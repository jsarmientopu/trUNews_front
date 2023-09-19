import { Button } from "@nextui-org/react"
import Image from 'next/image'

export default function TrendingArticle({ image, title, description,className }: any) {
    return (
        <div id="container-trending-article"className={className}>
            <div className="flex">

                <div className="relative mr-9">

                    <div className="w-[20rem] md:w-[30rem] lg:w-[45rem] h-72 select-none">
                        <img src={image} className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <p className="font-bold text-3xl drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,100)]">{title}</p>
                    </div>

                </div>

                <div className="flex flex-col justify-between">
                    
                    <div className="break-words text-justify">
                        <p className="line-clamp-[9]">{description}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <Button className="bg-[#963ED9] text-white">Leer artículo</Button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}
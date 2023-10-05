'use client'
import { ScrollShadow } from "@nextui-org/react"
import { Button } from "@nextui-org/react";
import { deletePost } from "@/utils/fetchs";

export default function PostComponent({ id, image_url, title, text, date, author }: any) {


    return (
        <ScrollShadow size={50} className="h-[87vh] p-8">
            <div className="flex justify-center mb-5">
                <div className="w-[20rem] md:w-[35rem] lg:w-[55rem] h-80 select-none">
                    <img src={image_url} className="w-full h-full object-cover rounded-lg" />
                </div>
            </div>

            <div className="text-center mb-5">


                <p className="font-bold text-3xl">{title}</p>
                <p className="font-semibold text-xl text-zinc-700">Por {author}</p>
                <p className="font-medium text-lg text-zinc-700">{date}</p>

            </div>

            <div className="mr-10 ml-10 mb-5" dangerouslySetInnerHTML={{ __html: text }}>
            </div>
            <div className="flex justify-center">
                <Button size='sm' className="mb-2 bg-red-700 text-white" onClick={() => deletePost(id)}>
                    Borrar artículo
                </Button>
            </div>

        </ScrollShadow>
    );
}
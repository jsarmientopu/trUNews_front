'use client'
import { ScrollShadow } from "@nextui-org/react"

async function getPost(id: number) {
    const res = await fetch(`http://localhost:3005/articles/${id}`)
    const post = res.json()
    return post
}


export default async function Articulo({ params }: any) {

    const post = await getPost(params.id)

    return (
        <ScrollShadow size={50} className="h-[87vh] p-8">
            <div className="flex justify-center mb-5">
                <div className="w-[20rem] md:w-[35rem] lg:w-[55rem] h-80 select-none">
                    <img src={post.image_url} className="w-full h-full object-cover rounded-lg" />
                </div>
            </div>

            <div className="text-center mb-5">

                <p className="font-bold text-3xl">{post.title}</p>
                <p className="font-semibold text-xl text-zinc-700">Autor: pendiente</p>
                <p className="font-semibold text-xl text-zinc-700">Fecha: pendiente</p>

            </div>

            <div className="mr-10 ml-10" dangerouslySetInnerHTML={{ __html: post.text }}>
            </div>



        </ScrollShadow>

    )
}
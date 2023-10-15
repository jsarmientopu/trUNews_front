'use client'
import Link from "next/link"
export default function RecentArticle({ id, image, title, timeSincePosted }: any) {
    return (
        <div id="container-recent-article" className="flex justify-start">

            <Link href={`articulo/${id}`}>
                <div className="flex flex-col justify-center">

                    <div className="w-60 h-40 2xl:w-96 flex justify-center mb-3">
                        <img src={image} className="w-full h-full object-cover rounded-lg" alt={`img-${id}`} />
                    </div>

                    <div className="flex justify-center">
                        <div className="text-center w-60">
                            <p className="font-bold text-lg line-clamp-2">{title}</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex justify-center w-60">

                            <p className="text-gray-600">{timeSincePosted}</p>

                        </div>
                    </div>




                </div>
            </Link>



        </div>
    )

}
'use client'
import { Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react"
import Link from "next/link"
export default function RecommendedArticle({ id, image, writer, title, timeSincePosted }: any) {
    return (
        <div className="flex flex-col justify-center w-full md:w-[80%] lg:w-full h-auto">

            <Link href={`${id}`} className="flex flex-col w-full h-auto">
            <Card className="flex flex-col w-full">
                <CardHeader className="flex flex-col gap-3">
                <Image
                            className="w-[20rem] h-[15rem] object-cover"
                            src={image}
                        >
                </Image>
                <div className="flex flex-col self-start gap-3">
                    <p className="font-bold text-lg">{title}</p>
                    <p className="font-medium text-md">Author: {writer}</p>
                    <p className="text-sm">Published {timeSincePosted}</p>
                </div>
                </CardHeader>
            </Card>
            </Link>



        </div>
    )

}
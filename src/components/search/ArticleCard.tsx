import { getArticleType } from "@/dto/article";
import Link from "next/link";
import {Card, CardFooter, Image} from "@nextui-org/react";

const ArticleCard=({article}:{'article':getArticleType})=>{
    const dat1 = new Date(article.date);
    const now = new Date(Date.now());
    const diff = Math.ceil((now.getTime()-dat1.getTime()) / (1000 * 60 * 60 * 24))-1;
    return <Link href={{pathname:`/article/${article.id_article}`}} className='w-full'>
        <Card className="w-full">
            <div className="flex flex-col item-center items-center px-3 py-0 text-small text-default-400">
                <div className="w-full pt-2">
                    <Image
                        className="mr-0"
                        width={'100%'}
                        height={'100%'}
                        alt="NextUI hero Image with delay"
                        src={article.image_url}
                    />
                </div>
                <p className="flex flex-row pt-2 justify-center w-[90%]">
                    {article.title}
                </p>
                <span className="flex flex-wrap flex-row pt-2 gap-2 justify-center">
                    {article.category.map((item, index)=>(
                        <p className="border-2 rounded-2xl p-2" key={index}>{item.category.cat_name}</p>
                    ))}
                </span>
            </div>
            <CardFooter className="flex flex-wrap flex-row justify-between">
                <div className="flex flex-row gap-2">
                <p className="font-semibold text-default-400 text-small">{article.views}</p>
                <p className=" text-default-400 text-small">Views</p>
                </div>
                <div className="flex flex-row gap-1">
                <p className="text-default-400 text-small">Published</p>
                <p className="font-semibold text-default-400 text-small">{diff<=2?'recently':diff}</p>
                <p className="text-default-400 text-small">{diff<=2?'':'days ago'}</p>
                </div>
            </CardFooter>
        </Card>
        <div className="flex flex-col gap-2">
        </div>
    </Link>
}

export default ArticleCard;
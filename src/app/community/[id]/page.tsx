'use client'

import React, {useState, useEffect} from "react";
import { getCommunityById, getCommunityFeed } from "@/utils/Communities/fetch"
import CommunityArticleCard from "@/components/community/CommunityArticleCard";
import { Image, Avatar, Divider, Button } from '@nextui-org/react';
import '../../globals.css'

export default function CommunityPage({ params }: any) {

    // info community
    const [community, setCommunity] = useState<any>([{
        'id_community': 0,
        'name': "",
        'description': "",
        'creator_id': 0,
        'date': "",
        'articlesCount': 0,
        'avatar_url': "",
        'banner_url': "",
        'community_has_categories': [],
        'isCreator': false,
        'isMember': false,
        'membersCount': 0

    }]);

    // articles feed
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

    // Rastreo de articulos visibles en el feed
    const [visibleArticles, setVisibleArticles] = useState(1);

    const handleVerMasClick = () => {
        setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 10);
    }

    // fetch de communidad
    useEffect(() => {
        async function fetchData() {
            const CommunityData = await getCommunityById(params.id);
            console.log(CommunityData)
            if(CommunityData){
                setCommunity(CommunityData);
            }
        }

        fetchData();}, []);
        

    // fetch de articulos a mostrar en el feed
    useEffect(() => {
        async function fetchData() {
            const articlesData = await getCommunityFeed(params.id);
            if(articlesData){
                setArticles(articlesData);
                setVisibleArticles(10);
            }
        }

        fetchData();}, []);

    return (
        <div>
            {/* Presentation zone */}
            <div className="py-2 px-10">
                <div className='pt-4 ps-14 flex flex-wrap row gap-3 text-sm'>
                    {community.community_has_categories && 
                        <>
                        {community.community_has_categories.map((item: any, index: number) => (
                        <p key={index} className='bg-[#963ED9] text-white p-2 font-bold rounded-md'>
                        {item.category.cat_name}
                        </p>
                    ))}
                    </>}
                </div>
                <div className='flex justify-center p-6'>
                    <Image src={community.banner_url} alt="Banner Community"/>
                </div> 
                <div className="grid  grid-cols-8 ps-20 pe-20">
                    <div className="col-span-7 flex items-center gap-6">
                        <Avatar src={community.avatar_url} className="w-20 h-20 text-large" isBordered/>
                        <p className="font-bold text-4xl">
                            {community.name}
                        </p>
                    </div>
                    { community.isCreator ?
                        <div className="flex justify-end pe-5 col-span-1">
                            <span className="material-symbols-outlined icon_button">
                                <a href="#">settings</a>
                            </span>
                        </div>
                        : community.isMember ?
                        <div className="flex justify-end pe-5 col-span-1">
                            <span className="material-symbols-outlined icon_button">
                                <a href="#">more_vert</a>
                            </span>
                        </div>
                        :
                        <></>
                    }
                </div>
                <div className="p-10 ps-20 pe-20">
                    <p className="text-lg text-justify">
                        {community.description}
                    </p>
                </div>
                
            </div>
            {/* End Presentation zone */}
            {community.isMember ?
                <>
                    <Divider className="my-4" />
                    <div className="flex justify-center p-5">
                        <Button className='bg-[#FF6624] text-white py-2 px-3 rounded-xl text-lg'>
                            <a href="#" className="flex items-center gap-2">
                                Post 
                                <span className="material-symbols-outlined">
                                stylus
                                </span>
                            </a>
                        </Button>
                    </div>
                </>
                :
                <div className="pb-16">
                    <div className="flex justify-center p-5">
                        <Button className='bg-[#FF6624] text-white py-2 px-3 rounded-xl text-lg'>
                            <a href="#">
                                Join 
                            </a>
                        </Button>
                    </div>
                    <div className="flex justify-center pt-10">
                        <span className="material-symbols-outlined icon_xl">
                            lock
                        </span>
                    </div>
                    <div>
                        <p className='text-center font-bold text-3xl p-5'>
                            Join this community to see <br></br>
                            its contents
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}
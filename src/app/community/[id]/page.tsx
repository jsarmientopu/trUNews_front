'use client'

import React, {useState, useEffect} from "react";
import { getCommunityById, getCommunityFeed } from "@/utils/Communities/fetch"
import CommunityArticleCard from "@/components/community/CommunityArticleCard";
import { Image, Avatar, Divider, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, cn } from '@nextui-org/react';
import '../../globals.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";

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

    const [edit, setEdit] = useState<boolean>(false);

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
            const articlesData = await getCommunityFeed();
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
                <div className='pt-4 flex flex-wrap row gap-3 text-sm'>
                {community.community_has_categories && 
                    <>
                    {community.community_has_categories.map((item: any, index: number) => (
                    <p key={index} className='bg-[#963ED9] text-white p-2 font-bold rounded-md'>
                    {item.category.cat_name}
                    </p>
                ))}
                </>}
                <div className='flex justify-center pt-5'>
                    <Image src={community.banner_url} alt="Banner Community" />
                </div> 
                <div className="flex items-center justify-center gap-96">
                    <Avatar src={community.avatar_url} size="lg" />
                    <p className="font-bold text-2xl">
                        {community.name}
                    </p>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly variant="light">
                                <SlOptionsVertical/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description" onAction={(key)=>{key=='edit'? setEdit(true): deleteCommunity(params.id)}}>
                            <DropdownItem
                            key="edit"
                            description="Edit the community"
                            startContent={<AiFillEdit/>}
                            >
                            Edit Community
                            </DropdownItem>
                            <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            description="Permanently delete the community"
                            startContent={<AiFillDelete/>}
                            >
                            Delete Community
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <p className="text-lg text-justify">
                    {community.description}
                </p>
            </div>
            </div>
            {/* End Presentation zone */}
            <Divider className="my-4" />
            <div className="flex justify-center">
                <Button className='bg-[#FF6624] text-white py-2 px-3 rounded-xl text-lg'>
                    <a href="#">Post</a>
                </Button>
            </div>
            {/* Feed zone */}
            <div className="py-2">
                {articles.length !== 0 && articles.length > 1 ? (
                    <>
                    {articles.slice(0, visibleArticles).map((item, index) => (
                        <div className="flex justify-center py-unit-4" key={index}>
                        <CommunityArticleCard 
                            imageArticle={item.image_url}
                            profileImage={item.profile_image}
                            autor={`${item.name} ${item.lastname}`}
                            username={item.username}
                            title={item.title}
                            summary={item.sanitizedText}
                            id={item.id_article}
                            idWriter={item.id_writer}
                            views={item.views}
                            date={item.date.slice(0, 10)}
                            categories={item.article_has_categories}
                        />
                        </div>
                    ))}
                    {visibleArticles < articles.length && (
                        <div className="flex justify-center py-unit-4">
                        <button onClick={handleVerMasClick} className='bg-primary text-white py-2 px-3 rounded-xl'>
                            See more
                        </button>
                        </div>
                    )}
                    {visibleArticles >= articles.length && (
                        <div className='text-center font-bold text-2xl p-5'>
                            There are no more articles to see
                        </div>
                    )}
                    </>)
                :
                    <div className='h-screen text-center font-bold text-2xl p-5'>
                        Nothing to see
                    </div>

                }
            </div>
            {/* End Feed zone */}
        </div>
    )
}
"use client";

import React, {useState, useEffect, useRef} from "react";
import { deleteCommunity, getCommunityById, getCommunityFeed, joinCommunity, leaveCommunity } from "@/utils/Communities/fetch"
import CommunityArticleCard from "@/components/community/CommunityArticleCard";
import { Image, Avatar, Divider, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { decryptedJWT } from '@/dto/users';
import verifyToken from '@/utils/utils'
import '../../globals.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { LiaEditSolid } from "react-icons/lia";
import PostCommunityButton from "@/components/community/PostCommunityButton";
import ShowModal from "@/components/community/Modal";
import Link from "next/link";


;

export default function CommunityPage({ params }: any) {
  // info community
  const ref = useRef<any>();
  const [community, setCommunity] = useState<any>([
    {
      id_community: 0,
      name: "",
      description: "",
      creator_id: 0,
      date: "",
      articlesCount: 0,
      avatar_url: "",
      banner_url: "",
      community_has_categories: [],
      isCreator: false,
      isMember: false,
      membersCount: 0,
    },
  ]);

  const [edit, setEdit] = useState<boolean>(false);

  // articles feed
  const [articles, setArticles] = useState<Array<any>>([
    {
      date: "",
      id_article: 0,
      id_writer: 0,
      image_url: "",
      lastname: "",
      name: "",
      sanitizedText: "",
      text: "",
      title: "",
      username: "",
      profile_image: "",
      views: 0,
      article_has_categories: [],
    },
  ]);

  // info user
  const [userInfo, setInfoUser] = useState<decryptedJWT>({
    userId: -2,
    rol: -2,
  });

  // Rastreo de articulos visibles en el feed
  const [visibleArticles, setVisibleArticles] = useState(1);

  const handleVerMasClick = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 10);
  };

  // fetch de communidad
  useEffect(() => {
    async function fetchData() {
      const CommunityData = await getCommunityById(params.id);
      console.log(CommunityData);
      if (CommunityData) {
        setCommunity(CommunityData);
      }
    }

    fetchData();
  }, []);

  // fetch de articulos a mostrar en el feed
  useEffect(() => {
    async function fetchData() {
      const articlesData = await getCommunityFeed(params.id);
      if (articlesData) {
        setArticles(articlesData);
        setVisibleArticles(10);
      }
    }

    fetchData();
  }, []);

  async function token() {
    const rol = await verifyToken();
    setInfoUser(rol);
  }

  useEffect(() => {
    token();
  }, []);

    // fetch unirse a una comunidad
    function jointoCommunity() {
        joinCommunity(userInfo.userId, params.id);
    }

    return (
        <div className="relative">
            {community.id_community > 0 ?
                <>
                    {/* Presentation zone */}
                    <div className="py-2 px-10">
                        <div className='pt-4 md:ps-14 lg:ps-14 flex flex-wrap gap-3 text-xs md:text-sm lg:text-sm'>
                            {community.community_has_categories && 
                                <>
                                {community.community_has_categories.map((item: any, index: number) => (
                                <p key={index} className='bg-[#963ED9] text-white p-2 font-bold rounded-md'>
                                {item.category.cat_name}
                                </p>
                            ))}
                            </>}
                        </div>
                        <div className='flex justify-center md:p-6 lg:p-6 pt-6 pb-6'>
                            <Image src={community.banner_url} alt="Banner Community"/>
                        </div> 
                        <div className="grid  grid-cols-8 md:ps-20 md:pe-20 lg:ps-20 lg:pe-20">
                            <div className="col-span-1 flex items-center">
                                <Avatar src={community.avatar_url} className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24" isBordered/>
                            </div>
                            <div className="col-span-6 flex items-center ps-6">
                                <p className="font-bold text-2xl md:text-3xl lg:text-4xl">
                                    {community.name}
                                </p>
                            </div>
                            { community.isCreator ?
                                <div className="flex justify-end pe-5 col-span-1 items-center gap-2">
                                    <Link ref={ref} href={{pathname: '/community-settings',query: { type: 'edit', id: params.id }}}></Link>
                                    <Link href={`/events/${params.id}`}><Button color="primary">Eventos</Button></Link>
                                    <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly variant="light">
                                        <SlOptionsVertical/>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                    <DropdownItem
                                    key="edit"
                                    description="Edit the community"
                                    startContent={<AiFillEdit/>}
                                    onPress={()=>{location.replace(`/community-settings?type=edit&id=${params.id}`)}}
                                    >
                                    Edit Community
                                    </DropdownItem>
                                    <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    description="Permanently delete the community"
                                    startContent={<AiFillDelete/>}
                                    onPress={()=>{deleteCommunity(params.id)}}
                                    >
                                    Delete Community
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                                </div>
                                : community.isMember ?
                                <div className="flex justify-end pe-5 col-span-1 items-center gap-2">
                                    <Link href={`/events/${params.id}`}><Button color="primary">Eventos</Button></Link>
                                    <ShowModal 
                                        user_id={userInfo.userId} 
                                        community_id={params.id}
                                    />
                                </div>
                                :
                                <></>
                            }
                        </div>
                        <div className="pt-5 md:p-10 lg:p-10 md:ps-20 md:pe-20 lg:ps-20 lg:pe-20 ">
                            <p className="text-lg text-justify">
                                {community.description}
                            </p>
                        </div>
                        
                    </div>
                    {/* End Presentation zone */}
                    <Divider className="my-4" />
                    {community.isMember ?
                        
                        // <div className="flex justify-center p-5">
                        //     <Button className='bg-[#FF6624] text-white py-2 px-3 rounded-xl text-lg'>
                        //         <a href="#" className="flex items-center gap-2">
                        //             Post 
                        //             <span className="material-symbols-outlined">
                        //             stylus
                        //             </span>
                        //         </a>
                        //     </Button>
                        // </div>
                        <div className="fixed bottom-14 right-0 md:right-14 lg:right-14 xl:right-14  2xl:right-14 z-50">
                            <PostCommunityButton idCommunity={parseInt(params.id)}/>
                        </div>
                        :
                        <div className="pb-16">
                            <div className="flex justify-center p-5">
                                <Button className='bg-[#FF6624] text-white py-2 px-3 rounded-xl text-lg' 
                                    onPress={jointoCommunity}>
                                        Join 
                                </Button>
                            </div>
                            <div className="flex justify-center pt-10">
                                <span className="material-symbols-outlined icon_xl">
                                    lock
                                </span>
                            </div>
                            <div>
                                <p className='text-center font-bold text-2xl md:text-3xl lg:text-3xl p-5'>
                                    Join this community to see <br></br>
                                    its contents
                                </p>
                            </div>
                        </div>
                    }
                    {/* Feed zone */}
                    {community.isMember &&
                    
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
                    }
                    {/* End Feed zone */}
                </>
                :
                <div className='h-screen text-center font-bold text-4xl pt-20 p-5'>
                    There is no information about this community
                </div>
            }
        </div>
    )
}

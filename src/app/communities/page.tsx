'use client'

import React from 'react';
import { Checkbox } from '@nextui-org/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCategories } from '@/utils/fetchs';
import { getCommunities } from '@/utils/fetchs';
import CommunityCard from '@/components/communities-panel/CommunityCard';
import {RxCross1} from 'react-icons/rx'


function page() {



    const [categoriesData, setCategoriesData] = useState<any[]>()
    const [communitiesData, setCommunitiesData] = useState<any[]>([])
    const [checkedBoxes, setCheckedBoxes] = useState<any[]>([])
    const test = [
        {
            name: "Comm1",
            categories: ["WORLD NEWS", "POLITICS", "WEIRD NEWS"],
        },
        {
            name: "Comm2",
            categories: ["PARENTING", "COMEDY", "U.S NEWS"],
        },
        {
            name: "Comm3",
            categories: ["TECH", "SPORTS", "ENTERTAINMENT"],
        },
    ]


    useEffect(() => {
        (async () => {
            const categories = await getCategories();
            const communities = await getCommunities();
            setCategoriesData(categories);
            setCommunitiesData(communities);
            console.log(categoriesData);
        })();
    }, [])

    let currentCommunities = []

    return (
        <div id="container" className='bg-white'>
            <div className='p-3 bg-white'>

                <p className='text-black font-bold text-5xl lg:text-7xl flex justify-center mb-3'>
                    Communities
                </p>

                <div id="divider" className="flex justify-center">
                    <div className="w-[90%] h-0.5 bg-gray-200 mb-3 rounded-full">
                    </div>
                </div>

                <p className='text-black font-medium text-xl flex justify-center text-center mb-3'>
                    Use the checkbox below to discover communities on the topics that may interest you!
                </p>

                <div className='p-4 bg-[#0079DC] flex gap-3 flex-wrap align-middle justify-center rounded-2xl mb-5 shadow-lg'>
                    {categoriesData?.map((category: any, index: any) => {
                        return (
                            <div key={index} className='bg-[#296bb7] p-1 rounded-lg flex items-center'>
                                <Checkbox size="sm" color='success' onChange={(event) => event?.target?.checked ? setCheckedBoxes([...checkedBoxes, category.cat_name]) : setCheckedBoxes(checkedBoxes.filter(cat => {
                                    return cat !== category.cat_name
                                }))}>
                                    <span className='text-white font-medium text-xs'>{category.cat_name}</span>
                                </Checkbox>
                            </div>
                        )
                    })}
                </div>
            </div>
            {
                checkedBoxes.length > 0 ?
                    <div className='flex justify-center gap-12 flex-wrap'>
                        {
                            communitiesData?.map((com: any, index: any) => {
                                const communityCatNames = com.community_has_categories.map((item: { category: { cat_name: any; }; }) => item.category.cat_name);
                                if (checkedBoxes.some(element => communityCatNames.includes(element))) {

                                    return (
                                        <div key={index}>
                                            <CommunityCard id_com={com.id_community} title={com.name} profile_image={com.avatar_url} cats={communityCatNames} members={com.followerCount} description={com.description} />
                                        </div>
                                    )
                                } else {
                                    null
                                }
                            })

                        }

                    </div> :
                    <div className='flex justify-center items-center flex-col h-60 gap-3'>
                        <RxCross1 size="7em" color="black" />
                        <p className='font-bold text-4xl'>There's no results for the current selection</p>
                    </div>
            }
        </div>
    );
}

export default page;
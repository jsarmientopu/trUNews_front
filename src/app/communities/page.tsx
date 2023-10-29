'use client'

import React from 'react';
import { Checkbox } from '@nextui-org/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCategories } from '@/utils/fetchs';
import { getCommunities } from '@/utils/fetchs';
import CommunityCard from '@/components/communities-panel/CommunityCard';
import { Button } from '@nextui-org/react';

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
        <div id="container" className='bg-[#C1D6E8] h-screen'>
            <div className='p-3 bg-[#C1D6E8]'>

                <p className='text-black font-bold text-5xl lg:text-7xl flex justify-center mb-3'>
                    Communities
                </p>

                <div className='p-4 bg-[#963ED9] flex gap-3 flex-wrap align-middle justify-center rounded-2xl mb-5'>
                    {categoriesData?.map((category: any, index: any) => {
                        return (
                            <div key={index} className='bg-[#7d32b7] p-1 rounded-lg flex items-center'>
                                <Checkbox size="sm" color='success' onChange={(event) => event?.target?.checked ? setCheckedBoxes([...checkedBoxes, category.cat_name]) : setCheckedBoxes(checkedBoxes.filter(cat => {
                                    return cat !== category.cat_name
                                }))}>
                                    <span className='text-white font-medium text-xs'>{category.cat_name}</span>
                                </Checkbox>
                            </div>
                        )
                    })}
                </div>

                <div className='flex justify-center gap-12 flex-wrap'>
                    {communitiesData?.map((com: any, index: any) => {
                        const communityCatNames = com.community_has_categories.map((item: { category: { cat_name: any; }; }) => item.category.cat_name);
                        if (checkedBoxes.some(element => communityCatNames.includes(element))) {

                            return (
                                <div key={index}>
                                    <CommunityCard title={com.name} profile_image={com.avatar_url} cats={communityCatNames} members={com.followerCount} description={com.description} />
                                </div>
                            )
                        } else {
                            null
                        }
                    })}
                </div>

            </div>
        </div>
    );
}

export default page;
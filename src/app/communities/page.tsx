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


    return (
        <div id="container">
            <div className='p-3'>

                <p className='text-black font-bold text-7xl flex justify-center mb-3'>
                    Communities
                </p>

                <div className='p-4 bg-[#963ED9] flex gap-4 flex-wrap align-middle justify-center rounded-2xl'>
                    {categoriesData?.map((category: any, index: any) => {
                        return (
                            <div key={index}>
                                <Checkbox color='success' onChange={(event) => event?.target?.checked ? setCheckedBoxes([...checkedBoxes, category.cat_name]) : setCheckedBoxes(checkedBoxes.filter(cat => {
                                    return cat !== category.cat_name
                                }))}>
                                    <span className='text-white font-medium'>{category.cat_name}</span>
                                </Checkbox>
                            </div>
                        )
                    })}
                </div>

                <div>
                    {test.map((testCom: any, index: any) => {
                        if (checkedBoxes.some(element => testCom.categories.includes(element))) {
                            return (
                                <div key={index}>
                                    <p>{testCom.name}</p>
                                </div>
                            )
                        } else {
                            null
                        }
                    })}
                </div>

                <div className='mt-5 flex justify-center gap-8 flex-wrap'>
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                </div>

            </div>
        </div>
    );
}

export default page;
'use client'
import TrendingWriter from "./TrendingWriter";
import React from 'react'
import { useCollapse } from 'react-collapsed'
import { Button } from "@nextui-org/react";
import { BsChevronDown } from 'react-icons/bs'
import { BsChevronUp } from 'react-icons/bs'

export default function TrendingWriterPanel({ trendingWritersData }: any) {
    const profile_image = 'https://trunews.s3.us-east-2.amazonaws.com/profile/defaultProfile.jpg';

    
    const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
        useCollapse({
            isExpanded: undefined,
            defaultExpanded: true,
            collapsedHeight: 0,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            duration: undefined,
        })
    return (

        <div>
            <div className="flex justify-center">
                <Button className="w-full h-12 rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none bg-white" {...getToggleProps()}>

                    {isExpanded ?
                        <>
                            <p className="text-xl font-bold mr-1">
                                Trending writers
                            </p>
                            <BsChevronDown size="1.5em" />
                        </>
                        : <BsChevronUp className="animate-bounce" size="1.5em" />
                    }


                </Button>
            </div>

            <section {...getCollapseProps()}>
                <div className="flex flex-wrap justify-center xl:justify-between items-center rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-none px-10 py-8 bg-[#0079DC]">
                    {
                        trendingWritersData.map((writer: any, index: any) => {
                            return (
                                <div key={index}>
                                    <TrendingWriter id={writer.users_id_user} profilePic={profile_image} username={writer.username} />
                                </div>

                            )
                        })
                    }
                </div>
            </section>
        </div>

    );
}
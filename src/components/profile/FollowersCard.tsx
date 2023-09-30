
import { Avatar, Button } from "@nextui-org/react";
import SavedCard from "./SavedCard";
import { animated, useSpring } from "react-spring";
import { useState } from "react";



const FollowersCard=({data}:any)=>{

    
    return <div className="flex flex-row gap-10 px-7 w-full">
        <div className="w-[15%]"><Avatar fallback src={data.image_url} className="w-full h-full text-large" isBordered /></div>
        <div className="flex flex-col justify-center">
            <p className="text-2xl">{data.name}</p>
            <p className="text-md">{data.username}</p>
        </div>
        {/* <div className="flex flex-col justify-center">
        <Button className="bg-[#0079DC]">Follow</Button>
        </div> */}
        </div>
}

export default FollowersCard;
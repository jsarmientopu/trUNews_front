
import { Button, User } from "@nextui-org/react";
import SavedCard from "./SavedCard";
import FollowersCard from "./FollowersCard";
import { animated, useSpring } from "react-spring";
import { useState } from "react";



const FollowersPage=({follows,fixFollows} : any)=>{
    const ani = useSpring({
        from: { width: '80%' },
        to: { width: '40%' },
        config: { duration: 500 },
    })
    
    return <animated.div className="flex flex-col bg-[#F0F2F4] w-[60%] rounded-[17px] justify-center items-center" style={ani}>

            <div className="flex flex-row w-full">
                <Button id="0" className={`w-full rounded-tl-2xl text-lg text-black ${follows[0] ? "bg-[#3090DF] text-white": "" } py-7`} onClick={fixFollows} variant="light" radius="none">Followers</Button>
                <Button id="1" className={`w-full rounded-tr-2xl text-lg text-black ${follows[1] ? "bg-[#3090DF] text-white": "" } py-7`} onClick={fixFollows} variant="light" radius="none">Following</Button>
            </div>

            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">
                <p className="text-2xl">Followers</p>

            </div>
            
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pb-10 pt-0 gap-6 bg-[#F0F2F4]">
                <FollowersCard data={{"image_url": "https://i.pravatar.cc/150?u=a04258114e29026708c", "name": "Armando Calle", "username":"making_streets"}} />
                <FollowersCard data={{"image_url": "https://i.pravatar.cc/150?u=a04258114e29026708c", "name": "Armando Calle", "username":"making_streets"}} />
                <FollowersCard data={{"image_url": "https://i.pravatar.cc/150?u=a04258114e29026708c", "name": "Armando Calle", "username":"making_streets"}} />
                <FollowersCard data={{"image_url": "https://i.pravatar.cc/150?u=a04258114e29026708c", "name": "Armando Calle", "username":"making_streets"}} />
                <FollowersCard data={{"image_url": "https://i.pravatar.cc/150?u=a04258114e29026708c", "name": "Armando Calle", "username":"making_streets"}} />
                <FollowersCard data={{"image_url": "https://i.pravatar.cc/150?u=a04258114e29026708c", "name": "Armando Calle", "username":"making_streets"}} />
                <FollowersCard data={{"image_url": "https://i.pravatar.cc/150?u=a04258114e29026708c", "name": "Armando Calle", "username":"making_streets"}} />
            </div>
            
        

        </animated.div>
}

export default FollowersPage;
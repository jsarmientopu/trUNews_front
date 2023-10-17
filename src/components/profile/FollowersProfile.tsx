
import { Button, User } from "@nextui-org/react";
import SavedCard from "./SavedCard";
import FollowersCard from "./FollowersCard";
import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import { getFollower } from "@/utils/fetchs";
import { getFollowerType } from "@/dto/users";


const FollowersPage=({follows,fixFollows, userView} : any)=>{
    const ani = useSpring({
        from: { width: '80%' },
        to: { width: '40%' },
        config: { duration: 500 },
    })

    const [followers, setFollowers]=useState<Array<getFollowerType>>([{
        'id_user':0,
        'username':'',
        'profile_image':'',
        'name':'',
        'lastname':'',
        'rol':0
    }])

    const handleChange=async()=>{
        console.log(userView)
        const users = await getFollower(userView, follows);
        setFollowers(users);
        console.log(users)
    }

    useEffect(() => {
        (async () => {
            await handleChange();
        })();
    },[follows])

    useEffect(() => {
        (async () => {
            await handleChange();
        })();
    },[])
    
    return <animated.div className="flex flex-col bg-[#F0F2F4] w-[60%] rounded-[17px] justify-center items-center" style={ani}>

            <div className="flex flex-row w-full">
                <Button id="0" className={`w-full rounded-tl-2xl text-lg text-black ${follows[0] ? "bg-[#3090DF] text-white": "" } py-7`} onClick={fixFollows} variant="light" radius="none">Followers</Button>
                <Button id="1" className={`w-full rounded-tr-2xl text-lg text-black ${follows[1] ? "bg-[#3090DF] text-white": "" } py-7`} onClick={fixFollows} variant="light" radius="none">Following</Button>
            </div>

            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">
                {follows[0]?
                    <p className="text-2xl">Followers</p>
                :
                    <p className="text-2xl">Following</p>
                } 
            </div>
            
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pb-10 pt-0 gap-6 bg-[#F0F2F4]">
                {followers.length!==0?
                    followers.map((item:getFollowerType, index) => (
                        <FollowersCard key={index} data={item} />
                    ))
                :
                    follows[0]?
                        <>You don´t have followers</>
                    :
                        <>You don´t follow anyone</>

                }
            </div>
            
        

        </animated.div>
}

export default FollowersPage;
'use client'

import SignUpCard from "@/components/register/SignUpCard";
import HomeBubble from "@/components/HomeBubble";
import { redirect } from "next/navigation";
import { useState, useEffect} from "react";
import { decryptedJWT } from "@/dto/users";
import verifyToken from "@/utils/utils";
import {getFromLocalStorage} from "@/utils/localStorage";

const SignUp=()=>{


     const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})

    async function token(){
        const tok = getFromLocalStorage("token");
        if(tok){
            const rol =await verifyToken();
            setUserInfo(rol);
        }else{
            setUserInfo({userId:-1,rol:-1});
        }
    }

    useEffect(()=>{
        token()
    },[])

    if(userInfo.userId==-2) return <p>Loading ...</p>
    if(userInfo.userId!==-1) redirect('/');
        


    return <>
        <div className="grid place-items-center bg-[#0079DC] w-full min-h-full py-10">
            <div className="flex flex-col items-center gap-4 justify-center">
                <HomeBubble/>
                <SignUpCard/>
            </div>
        </div>
    </>

}

export default SignUp;
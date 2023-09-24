'use client'

import SignUpCard from "@/components/SignUpCard";
import HomeBubble from "@/components/homeBubble";
import { redirect } from "next/navigation";
import { useState, useEffect} from "react";
import { decryptedJWT } from "@/dto/users";
import verifyToken from "@/utils/utils";
import getFromLocalStorage from "@/utils/localStorage";

const SignUp=()=>{


     const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})

    async function token(){
        const tok = getFromLocalStorage("token");
        if(tok){
            const rol =await verifyToken({token:tok});
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
        <div className="grid place-items-center h-screen bg-[#0079DC] ">
            <HomeBubble/>
            <SignUpCard/>
            </div>
    </>

}

export default SignUp;
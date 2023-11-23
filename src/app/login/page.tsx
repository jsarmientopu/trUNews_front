'use client'

import LoginCard from "@/components/login/LoginCard";
import HomeBubble from "@/components/HomeBubble";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import verifyToken from "@/utils/utils";
import { decryptedJWT } from "@/dto/users";
import {getFromLocalStorage} from "@/utils/localStorage";

const Login=()=> {

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
        
    return (
        <>
            <div className="grid place-items-center bg-[#0079DC] w-full min-h-full py-10">
                <div className="flex flex-col gap-8">
                    <HomeBubble/>
                    <LoginCard/> 
                </div>
            </div>
        </>
        
    );
        

}

export default Login;
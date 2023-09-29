'use client'

import React, {useState, useEffect} from "react";
import { redirect } from "next/navigation";
import { decryptedJWT } from "@/dto/users";
import {getFromLocalStorage} from "@/utils/localStorage";
import verifyToken from "@/utils/utils";
import ProfileInfo from "@/components/profileInfo";
import SavedArticles from "@/components/savedArticlesProfile";

export default function App() {

    const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})
    const [edit, setEdit] =useState<boolean>(false);


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

    if(userInfo.userId==-2) return
    if(userInfo.userId==-1) redirect('/');

  return (<>
    <div className="grid grid-rows-1 grid-cols-1 place-items-center  min-w-full min-h-full bg-[#0089DC] gap-10 py-10">

        <ProfileInfo
            edit={edit}
            setEdit={setEdit}
        />

        {edit? <></>:<SavedArticles/>
        }

    </div>

    

    </>
  );
}
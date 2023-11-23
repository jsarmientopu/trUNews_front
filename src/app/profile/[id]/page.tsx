'use client'

import React, {useState, useEffect} from "react";
import { redirect } from "next/navigation";
import { decryptedJWT } from "@/dto/users";
import {getFromLocalStorage} from "@/utils/localStorage";
import verifyToken from "@/utils/utils";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SavedArticles from "@/components/profile/SavedArticlesProfile";
import FollowersPage from "@/components/profile/FollowersProfile";
import CommunityPanel from "@/components/profile/AttendedEventsProfile";

export default function App({ params }: any) {

    const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})
    const [edit, setEdit] = useState<boolean>(false);
    const [followp, setFollow] = useState<[boolean,boolean]>([false,false]);
    const [articleWriter, setArticleWriter]= useState();
    const [articlesPage, setArticlesPage]=useState<[boolean,boolean, boolean]>([false,false,false]);
    let search=params.id;

    async function token(){
        const tok = getFromLocalStorage("token");
        if(tok){
            const rol =await verifyToken();
            setUserInfo(rol);
        }else{
            setUserInfo({userId:-1,rol:-1});
        }
    }

    function fixFollows(event:any){
        const index = parseInt(event.target.id);
        const newFollows = [...followp];
        if(followp[(index + 1) % 2]){
            newFollows[(index + 1) % 2] = false;
        }
        newFollows[index] = true;
        setFollow(newFollows as [boolean,boolean]);
        setArticlesPage([false,false,false])
    }

    useEffect(()=>{
        token()
    },[])

    if(userInfo.userId==-2) return
    if(userInfo.userId==-1) redirect('/');
//#D8DCFF- 
  return (<>
    <div className="flex flex-col justify-center items-center min-w-full min-h-full bg-[#C1D6E8] gap-8 py-10">

        <ProfileInfo
            edit={edit}
            setEdit={setEdit}
            followp={followp}
            setFollow={setFollow}
            userInfo = {userInfo}
            userView = {search}
            fixFollows = {fixFollows}
            setArticleWriter= {setArticleWriter}
            articlesPage={articlesPage}
            setArticlesPage={setArticlesPage}
        />

        {edit? <></>:followp.includes(true)? <FollowersPage follows = {followp} fixFollows = {fixFollows} userView = {search}/>:
        !articlesPage[1]&&!articlesPage[2]?
        <>
            <SavedArticles userInfo = {userInfo} userView = {search} articleWriter={articleWriter} articlesPage={articlesPage[0]}/>
        </>
        :
        <>
            <CommunityPanel userInfo = {userInfo} userView = {search} mode={articlesPage}/>
        </>
        }
        

    </div>

    

    </>
  );
}
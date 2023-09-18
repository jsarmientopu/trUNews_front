'use client'

import LoginCard from "@/components/LoginCard";
import HomeBubble from "@/components/homeBubble";
import { useRouter } from "next/navigation";

const Login=()=> {

    const router = useRouter()

    if(localStorage.getItem('token')){

        router.push('/')

    }else{
        
        return (
            <>
                <div className="grid place-items-center bg-[#0079DC] w-full min-h-full py-10">
                    <HomeBubble/>
                    <LoginCard/> 
                </div>
            </>
            
        );
        
    }

}

export default Login;
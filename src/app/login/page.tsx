'use client'

import LoginCard from "@/components/LoginCard";
import { useRouter } from "next/navigation";

const Login=()=> {

    const router = useRouter()

    if(localStorage.getItem('token')){

        router.push('/')

    }else{
        
        return (
            <>
                <div className="grid place-items-center bg-[#3A97E3] w-full min-h-full py-10">
                    <LoginCard/> 
                </div>
            </>
            
        );
        
    }

}

export default Login;
'use client'

import SignUpCard from "@/components/SignUpCard";
import { useRouter } from "next/navigation";

const SignUp=()=>{

    const router = useRouter()

    if(localStorage.getItem('token')){

        router.push('/')

    }else{

        return <>
            <div className="grid place-items-center h-screen bg-blue-300 ">

                <SignUpCard/>

            </div>
        </>
    }
}

export default SignUp;
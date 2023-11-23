import Image from 'next/image'
import {
    Button,
    Input
} from "@nextui-org/react";
import Link from 'next/link'

export default function LoginWelcome() {
    return (
        <div className='flex-col justify-center gap-6 items-center mx-7 my-[1.5rem] hidden md:flex '>
            <div className='text-center'>
                <Image
                    src="/images/login-image.png"
                    alt="App Logo"
                    width={150}
                    height={150}
                    className="content-center my-2"
                />
            </div>
            <div className='text-center'>
                <p>Do you have account yet? <Link href = "/register" className='text-[#0079DC]'>Register</Link></p>
            </div>
            
            
        </div>
    )
}
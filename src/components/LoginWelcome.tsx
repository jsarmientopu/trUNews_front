import Image from 'next/image'
import {
    Button,
    Input
} from "@nextui-org/react";
import Link from 'next/link'

export default function LoginWelcome() {
    return (
        <div className='flex flex-col justify-center items-center mx-7 my-[1.5rem]'>
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
                <p>¿Ya tienes una cuenta? <Link href = "/" className='text-cyan-600'>Registrate</Link></p>
            </div>
            
            
        </div>
    )
}
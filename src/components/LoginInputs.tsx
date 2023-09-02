import Image from 'next/image'
import {
    Button,
    Input
} from "@nextui-org/react";

export default function LoginInputs() {
    return(
        <div className='flex flex-col justify-center mx-7'>
            <p className='justify-start text-sm my-2'>Usuario</p>
            <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-[13px]" radius = {"md"} placeholder='Escriba su usuario' isRequired />
            <p className='content-start text-sm my-2'>Contraseña</p>
            <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-[13px]" placeholder='Escriba su contraseña' isRequired />
            <div className='flex justify-center'>
                <Button className='content-center my-4' color='primary'>Iniciar sesión</Button>
            </div>
        </div>
    );
}
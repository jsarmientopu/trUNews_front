import {
    Button,
    Input
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {useState} from 'react';
import { checkPasswordType } from "../dto/users";
import Swal from "sweetalert2";

export default function LoginInputs() {

    const [formData, setFormData] = useState<checkPasswordType>({
        username: '',
        password: ''
    });

    const router = useRouter();

    const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function sendData() {
        let datos;
        const res = await fetch('http://localhost:3005/users/checkPassword',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData),
         }).then(response => response.json()).then(data => datos=data)
        console.log(res);
         if (res.err) {
            // This will activate the closest `error.js` Error Boundary
            // throw new Error('Failed to fetch data')
            Swal.fire(
            'Inicio de sesión fallido!',
            res.err,
            'error'
            )
        }else{
            localStorage.setItem('token',res.token)
            Swal.fire(
            'Inicio de sesión exitoso',
            '',
            'success'
            ).then(function(){router.push("/")})
        }
        
        return
    }

    return(
        <div className='flex flex-col justify-center mx-7'>
            <p className='justify-start text-sm my-2'>Usuario</p>
            <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-[13px]" name='username' type='text' radius = {"md"} placeholder='Escriba su usuario' isRequired onChange={handleChange}/>
            <p className='content-start text-sm my-2'>Contraseña</p>
            <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-[13px]" name='password' type='password' placeholder='Escriba su contraseña' isRequired  onChange={handleChange}/>
            <div className='flex justify-center'>
                <Button className='content-center my-4 bg-[#963ED9]' color='primary' onClick={sendData}>Iniciar sesión</Button>
            </div>
        </div>
    );
}
import {
    Button,
    Input
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {useState} from 'react';
import { checkPasswordType } from "../../dto/users";
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
        const res = await fetch(`${process.env.BACK_URL}users/checkPassword`,{
        // const res = await fetch('http://localhost:3005/users/checkPassword',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData),
         }).then(response => response.json()).then(data => datos=data)
        console.log(res);
         if (res.err) {
            // This will activate the closest `error.js` Error Boundary
            // throw new Error('Failed to fetch data')
            Swal.fire(
            'Failed login!',
            res.err,
            'error'
            )
        }else{
            localStorage.setItem('token',res.token)
            Swal.fire(
            'Login successful',
            '',
            'success'
            ).then(function(){router.push("/"); window.location.reload();})
        }
        
        return
    }

    return(
        <div className='flex flex-col justify-center mx-7'>
            <p className='justify-start text-sm my-2'>User</p>
            <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-xl" name='username' type='text' radius = {"md"} placeholder='Write your username' isRequired onChange={handleChange} onKeyDown={(event)=>{event.key == 'Enter'?sendData():""}}/>
            <p className='content-start text-sm my-2'>Password</p>
            <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-xl" name='password' type='password' placeholder='Write your password' isRequired  onChange={handleChange} onKeyDown={(event)=>{event.key == 'Enter'?sendData():""}}/>
            <div className='flex justify-center'>
                <Button className='content-center my-4 bg-[#963ED9]' color='primary' onClick={sendData}>Log In</Button>
            </div>
        </div>
    );
}
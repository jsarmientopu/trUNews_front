import {
    Button,
    Input
} from "@nextui-org/react";
import {useState, FormEvent} from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import Swal from "sweetalert2";
import { createUserSchema } from "@/schemas/schemas";
import { createUserType } from "@/dto/users";
import { useRouter } from "next/navigation";
import { json } from "node:stream/consumers";

const RegisterInputs=()=>{
    
    const [formData, setFormData] = useState({
        username: null,
        name: null,
        password: null,
        lastname: null,
        rol:null
    });
    const[cpassword,setCpassword]=useState(null)
    
    const router = useRouter()


    async function sendData() {
        if(formData.password!==cpassword){
            Swal.fire(
            'No coinciden las contraseñas',
            'Verifique sus datos',
            'error'
            )
            return
        }
        try{
            createUserSchema.parse(formData);
            let datos;
            const res = await fetch(`${process.env.BACK_URL}users/create`,{
            // const res = await fetch( 'http://localhost:3005/users/create',{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData),
             }).then(response => response.json()).then(data => datos=data)
            console.log(res);
             if (res.err) {
                // This will activate the closest `error.js` Error Boundary
                // throw new Error('Failed to fetch data')
                Swal.fire(
                'Failed user register',
                res.err,
                'error'
                )
            }else{
                localStorage.setItem('token',res.token)
                Swal.fire(
                'Register successful',
                '',
                'success'
                ).then(function(){router.push("/")})
            }
        }catch(error){
                Swal.fire(
                'Failed user creation',
                '',
                'error'
                )
        }
        
        return
    }

    const handleChange = (e:any) => {
        if(e.target.name=='rol'){
            setFormData({ ...formData, [e.target.name]: Number(e.target.value)});
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleChangeConfirm = (e:any) => {
        setCpassword(e.target.value);
    };
    
    const rol=[{value:2,label:'Reader'}, {value:1,label:'Writer'}]

    return <>
        <div className='flex flex-col justify-center mx-7 w-full gap-4'>
            <div className="flex flex-wrap gap-4  md:gap-2 md:flex-nowrap">
                <Input className="border-2 border-sky-600 rounded-xl" type='text' name="name" radius = {"md"} placeholder='Name' onChange={handleChange} isRequired />
                <Input className="border-2 border-sky-600 rounded-xl" type='text' name="lastname" placeholder='Lastname' onChange={handleChange} isRequired />
            </div>
            <Input className=" mr-8 border-2 border-sky-600 rounded-xl" type='text' name="username" radius = {"md"} placeholder='Username' onChange={handleChange} isRequired />
            <Input className=" mr-8 border-2 border-sky-600 rounded-xl" type='password' name="password" placeholder='Password' onChange={handleChange} isRequired />
            <Input className=" mr-8 border-2 border-sky-600 rounded-xl" type='password' name="cpassword" placeholder='Confirm Password' onChange={handleChangeConfirm} isRequired />
            <Select 
                labelPlacement="outside"
                label="Seleccione el rol" 
                name='rol'
                className="border-2 border-sky-600 rounded-xl my-3"
                onChange={handleChange} 
            >
                {rol.map((rol) => (
                <SelectItem key={rol.value} value={rol.value} >
                    {rol.label}
                </SelectItem>
                ))}
            </Select>
            <div className='flex justify-center'>
                <Button className='content-center my-4 bg-[#963ED9] ' onClick={sendData} color='primary'>Sign up</Button>
                {/* bg-[#FF461F] */}
            </div>
        </div>
    </>

}

export default RegisterInputs;
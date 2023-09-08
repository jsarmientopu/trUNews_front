import {
    Button,
    Input
} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";

const RegisterInputs=()=>{

    const rol=[{value:0,label:'Lector'}, {value:1,label:'Escritor'}]

    return <>
        <div className='flex flex-col justify-center mx-7 w-full gap-4'>
            <div className="flex flex-wrap gap-4  md:gap-2 md:flex-nowrap">
                <Input className="border-2 border-sky-600 rounded-[13px]" radius = {"md"} placeholder='Nombres' isRequired />
                <Input className="border-2 border-sky-600 rounded-[13px]" placeholder='Apellidos' isRequired />
            </div>
            <Input className=" mr-8 border-2 border-sky-600 rounded-[13px]" radius = {"md"} placeholder='Usuario' isRequired />
            <Input className=" mr-8 border-2 border-sky-600 rounded-[13px]" placeholder='Contraseña' isRequired />
            <Input className=" mr-8 border-2 border-sky-600 rounded-[13px]" placeholder='Confirmar contraseña' isRequired />
            <Select 
                label="Seleccione el rol" 
                className="border-2 border-sky-600 rounded-[13px]" 
            >
                {rol.map((rol) => (
                <SelectItem key={rol.value} value={rol.value}>
                    {rol.label}
                </SelectItem>
                ))}
            </Select>
            <div className='flex justify-center'>
                <Button className='content-center my-4' color='primary'>Registrarse</Button>
            </div>
        </div>
    </>

}

export default RegisterInputs;
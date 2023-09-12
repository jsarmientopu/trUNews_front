'use client'

import Image from 'next/image'
import LoadingButton from '@/components/LoadingButton';
import {Button} from '@nextui-org/react'
import Link from 'next/link'
import MainCard from '@/components/MainCard';
import { useState } from 'react';

export default function Home() {

  const [rol, setRol]=useState()

  // async function getRol() {
  //       let datos;
  //       const res = await fetch('http://localhost:3005/users/checkPassword',{
  //           method: 'POST',
  //           headers:{'Content-Type':'application/json'},
  //           body:JSON.stringify(formData),
  //        }).then(response => response.json()).then(data => datos=data)
  //       console.log(res);
  //        if (res.err) {
  //           // This will activate the closest `error.js` Error Boundary
  //           // throw new Error('Failed to fetch data')
  //           Swal.fire(
  //           'Inicio de sesión fallido!',
  //           res.err,
  //           'error'
  //           )
  //       }else{
  //           localStorage.setItem('token',res.token)
  //           Swal.fire(
  //           'Inicio de sesión exitoso',
  //           '',
  //           'success'
  //           ).then(function(){router.push("/")})
  //       }
        
  //       return
  //   }

  if(localStorage.getItem('token')){

    

  }

    return (
      <main className="flex min-h-screen flex-col items-center ">
        {/* <LoadingButton>Hola Mundo</LoadingButton>
        <MainCard></MainCard> */}
        <Button className='bg-[#FF461F]'>
          <Link href="/crear-articulo" className='text-white' >Crear artículo</Link>
        </Button>
      </main>
    )
    

}

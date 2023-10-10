'use client'
import { TfiWrite } from 'react-icons/tfi'
import { AiFillEye } from 'react-icons/ai'
import { Button } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { decryptedJWT } from '@/dto/users'
import verifyToken from '@/utils/utils'
import {getFromLocalStorage} from '@/utils/localStorage'
import ArticleInput from '@/components/createArticle/ArticleInput'

export default function CrearArticulo() {
  const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})
      
      const router = useRouter();

      async function token(){
          const tok = getFromLocalStorage("token");
          if(tok){
              const rol =await verifyToken();
              setUserInfo(rol);
          }
      }

    useEffect(()=>{
          token();
    },[]);

    if(userInfo.userId==-2) return <p>Loading..</p>;
    if(userInfo.userId==0 || userInfo.userId==-1) router.push('/');


  return (
    <div className='p-7'>

      <div className='flex justify-between mb-4'>

        <div className='flex items-center space-x-2 justify-start'>
          <p className='font-bold text-2xl'>
            Crear artículo
          </p>
          <TfiWrite size='1.5em' />
        </div>

        <div className='justify-end'>
          <Button className='bg-blue-300' aria-label="vista-previa">
            Vista previa <AiFillEye />
          </Button>
        </div>

      </div>

      <ArticleInput userInfo={userInfo}/>
      
        {/* <div className="product-des" dangerouslySetInnerHTML={{ __html: formData.text }}>
        </div> */}

    </div>
  )
}
'use client'
import { TfiWrite } from 'react-icons/tfi'
import { AiFillEye } from 'react-icons/ai'
import { FaFileUpload } from 'react-icons/fa'
import { GrUpdate } from 'react-icons/gr'
import {MdOutlineCreate} from 'react-icons/md'
import { Button } from '@nextui-org/react'
import { Textarea } from '@nextui-org/react'
import { useState, useRef, useEffect } from 'react'
import mammoth from 'mammoth'
import { redirect} from 'next/navigation'
import Swal from 'sweetalert2'
import { decryptedJWT } from '@/dto/users'
import { createArticleType } from '@/dto/article'
import verifyToken from '@/utils/utils'
import getFromLocalStorage from '@/utils/localStorage'


export default function CrearArticulo() {

  const [file, setFile] = useState<String>('Añadir archivo nuevo (.txt, .docx, .md)');
  const [nameImage, setNameImage] = useState<String>('Archivo.png');
  const [image,setImage] = useState();
  const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})
  const [plainText, setPlainText] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

    async function token(){
        const tok = getFromLocalStorage("token");
        if(tok){
            const rol =await verifyToken({token:tok});
            setUserInfo(rol);
        }
    }
    
    useEffect(()=>{
        token();
    },[]);

  const handleFileChange = (event:any) => {
    const f = event.target.files[0];
    // console.log(f)
    if(f){
      const reader = new FileReader();
      if(f.type.includes('text')){
        reader.readAsText(f);
        reader.onload = () => {
          const text = reader.result as string;
          setPlainText(text);
        }
      }else if(f.type.includes('application/vnd.openxmlformats-officedocument.wordproces')){
        reader.onload = async() => {
          const arrayBuffer  = reader.result as ArrayBuffer;
          const result =  await mammoth.extractRawText({ arrayBuffer  });
          setPlainText(result.value);
        };
        reader.readAsArrayBuffer(f);
      }
      setFile(f.name);
    }
  // console.log(plainText)      
  };

  const handleImageChange = (event:any) => {
    const image = event.target.files[0];
    setNameImage(image.name)
    if (image) {
  const reader = new FileReader();
    reader.onload = function(evt:any) { 
      const metadata = `name: ${image.name}, type: ${image.type}, size: ${image.size}, contents:`;
      const contents = evt.target.result;
    setImage(contents);
    };
    reader.readAsDataURL(image);
  }
    console.log(image);
  };


  const [formData, setFormData] = useState<createArticleType>({
        title: '',
        date: '',
        views:0,
        id_writer: 1,
        text:'',
        image_url:''
    });

    async function sendData() {
      formData.date=new Date().toString();
      formData.image_url=image;
      formData.id_writer=userInfo.userId;
      
      if(formData.text && formData.title){
        console.log(formData)
          let datos;
          const res = await fetch('http://localhost:3005/articles/create',{
              method: 'POST',
              headers:{'Content-Type':'application/json', 'authorization':localStorage.token},
              body:JSON.stringify(formData),
           }).then(response => response.json()).then(data => datos=data)
          console.log(res);
           if (res.err || res.error) {
              // This will activate the closest `error.js` Error Boundary
              // throw new Error('Failed to fetch data')
              Swal.fire(
              'Creación de artículo fallido!',
              res.err,
              'error'
              )
          }else{
              Swal.fire(
              'Creación de artículo exitoso!',
              '',
              'success'
              ).then(function(){redirect('/')})
          }
      }else{
              // This will activate the closest `error.js` Error Boundary
              // throw new Error('Failed to fetch data')
              Swal.fire(
              'Creación de artículo fallido!',
              '',
              'error'
              )
              }
        
        return
    }
  
    const handleChange = (e:any) => {
        if(e.target.name=='text'){
          setPlainText(e.target.value)
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    };


    if(userInfo.userId==-2) return <p>Loading..</p>;
    if(userInfo.userId==0 || userInfo.userId==-1) redirect('/');


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

      <div className='justify-start mb-8'>
        <p className='font-bold text-lg'>
          Imagen
        </p>
        <p className='text-base mb-2'>
          Añadir imagen principal para el artículo
        </p>
        <div className='flex items-center'>

          <div>
            <Button className='bg-blue-400 h-9 w-[6.5rem] mr-4' onClick={()=>{imageInputRef.current?.click()}}>
              <input key='1' type='file' className='hidden' ref={imageInputRef} onChange={handleImageChange} accept='image/*'/>
              Subir imagen
            </Button>
          </div>

          <div id="divider" className='w-0.5 h-8 bg-zinc-950 mr-3'>

          </div>

          <div>
            <p id = "image-filename" className='text-base text-zinc-600'>
              {nameImage}
            </p>
          </div>

        </div>
      </div>

      <div className='justify-start'>
        <p className='font-bold text-lg'>
          Contenido
        </p>
        <p className='text-base mb-2'>
          Añadir contenido para el artículo que será creado. Puede importarse como archivo .txt o escribirse en el campo de texto
        </p>
        <div className='mb-2' >
          <Button className='bg-gray-300' onClick={()=>{fileInputRef.current?.click()}}>
            <input key='2' type='file' className='hidden' ref={fileInputRef} onChange={handleFileChange} accept='.doc,.docx,.txt,.md'/>
            <FaFileUpload  /> {file}
          </Button>
        </div>
      </div>

      <div className='mb-5'>
        <Textarea
          name='text'
          key='bordered'
          variant='bordered'
          minRows={10}
          maxRows = {1000}
          labelPlacement="outside"
          placeholder="Empieza a escribir tu artículo..."
          className="w-full"
          value={plainText}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className='flex flex-row gap-4 mb-2'>
          <Button className='w-36 bg-[#0079DC] text-[#F8F8F8]'>
            <GrUpdate className='fill-[#F8F8F8]'/> Generar título
          </Button>
          <div className='flex flex-column items-center justify-center'>
            <p> Genera el titulo de tu articulo por medio de inteligencia artificial !Pruebalo ya¡</p>
          </div>
        </div>
        <Textarea
          variant='bordered'
          minRows={1}
          labelPlacement="outside"
          className="w-full mb-2"
          name='title'
          onChange={handleChange}

        />

        <Button className='bg-[#963ED9] mb-2 w-36 text-white' onClick={sendData}>
          <MdOutlineCreate /> Crear artículo
        </Button>


      </div>

    </div>
  )
}
'use client'
import { Editor } from '@tinymce/tinymce-react';
import { TfiWrite } from 'react-icons/tfi'
import { AiFillEye } from 'react-icons/ai'
import { FaFileUpload } from 'react-icons/fa'
import { GrUpdate } from 'react-icons/gr'
import {MdOutlineCreate} from 'react-icons/md'
import { Button } from '@nextui-org/react'
import { Textarea } from '@nextui-org/react'
import { useState, useRef, useEffect } from 'react'
import mammoth from 'mammoth'
import { useRouter} from 'next/navigation'
import Swal from 'sweetalert2'
import { decryptedJWT } from '@/dto/users'
import { createArticleType } from '@/dto/article'
import verifyToken from '@/utils/utils'


export default function CrearArticulo() {

  const [file, setFile] = useState<String>('Añadir archivo nuevo (.txt, .docx, .md)');
  const [nameImage, setNameImage] = useState<String>('Archivo.png');
  const [image,setImage] = useState();
  const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-1,rol:-1})
  const [plainText, setPlainText] = useState<string>();
  const [formData, setFormData] = useState<createArticleType>({
        title: '',
        date: '',
        views:0,
        id_writer: 1,
        text:'',
        image_url:''
    });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();


    async function token(){
        const rol =await verifyToken({token:localStorage.token});
        setUserInfo(rol);
    }
    
    useEffect(()=>{
        token();
    },[]);

  const handleFileChange = (event:any) => {
    const f = event.target.files[0];
    if(f){
      const reader = new FileReader();
      if(f.type.includes('text')||f.type==""){
        reader.readAsText(f);
        reader.onload = () => {
          const text = reader.result as string;
          setPlainText(text);
          console.log(text);
        }
      }else if(f.type.includes('application/vnd.openxmlformats-officedocument.wordproces')){
        reader.onload = async() => {
          const arrayBuffer  = reader.result as ArrayBuffer;
          const result =  await mammoth.convertToHtml({ arrayBuffer  });
          setPlainText(result.value);
        };
        reader.readAsArrayBuffer(f);
      }else{
          Swal.fire(
              'Archivo no compatible',
              '',
              'error'
              )
          return
      }
      setFile(f.name);
    }     
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
              ).then(function(){router.push("/")})
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
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }      

    const handleUpdate = (value:any, editor:any) => {
      const length = editor.getContent({ format: 'text' }).length;
      setFormData({ ...formData, 'text': value });
      console.log(value);
      console.log(length);
  };


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
          Añadir contenido para el artículo que será creado. Puede importarse como archivo de word, txt o md o escribirse en el campo de texto.
          Tenga en cuenta que el estilo de viluazación de la noticia será el mismo el cual usted genere en el campo de texto, agregando únicamente una imagen (Subida anteriormente)
          y el titulo al inicio de esta misma.
        </p>
        <div className='mb-2' >
          <Button className='bg-gray-300' onClick={()=>{fileInputRef.current?.click()}}>
            <input key='2' type='file' className='hidden' ref={fileInputRef} onChange={handleFileChange} accept='.doc,.docx,.txt,.md'/>
            <FaFileUpload  /> {file}
          </Button>
        </div>
      </div>

      
      
  <div className='mb-5'>
    <Editor
      id="editor"
      textareaName='text'
      apiKey="cx94g2it82nxlalcwthrk1ogfnu4kbx3dw55vchnt0mje4jd"
      initialValue={plainText}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          
          'advlist', 'autolink', ' lists', ' link', ' image', ' charmap', ' preview', ' anchor',
          'searchreplace', ' visualblocks', ' code', ' fullscreen',
          'insertdatetime', ' media', ' table', ' code', ' help', ' wordcount'
        ],
        toolbar:
          'undo redo | blocks | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={handleUpdate}
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

        {/* <div className="product-des" dangerouslySetInnerHTML={{ __html: formData.text }}>
        </div> */}

    </div>
  )
}
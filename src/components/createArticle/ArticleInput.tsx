import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@nextui-org/react';
import LoadingButton from '../Navbar_Components/LoadingButton';
import { FaFileUpload } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {MdOutlineCreate} from 'react-icons/md'
import { createArticleType } from '@/dto/article'
import { fileReader, imageReader } from '@/utils/Create_Article/file_Reader';
import { createArticle } from '@/utils/Create_Article/fetch';
import ModelInput from './ModelInput';

const ArticleInput=({userInfo}:any)=>{
    
    const [file, setFile] = useState<String>('Add new file (.txt, .docx, .md)');
    const [nameImage, setNameImage] = useState<String>('File.png');
    const [image,setImage] = useState();
    const [plainText, setPlainText] = useState<string>();
    const [formData, setFormData] = useState<createArticleType>({
        title: '',
        date: '',
        views:0,
        id_writer:userInfo.userId,
        text:'',
        image_url:'',
        image_extension:'',
        ancho:0,
        image_ratio:'1:0.658'
    });
    const [Category, setCategory]=useState([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [generated, setGenerated]=useState<boolean>(false);
    const [groupSelected, setGroupSelected] = useState<Array<string>>([]);
    const [loading, setLoading]=useState<boolean>(false)
    const router = useRouter();


    const handleFileChange = (event:any) => {
        const f = event.target.files[0];
        fileReader(f, setPlainText, setFile);
    };

    const handleImageChange = (event:any) => {
        const image = event.target.files[0];
        imageReader(image, setNameImage, setImage, setFormData, formData);
    };

    async function sendData() {
      formData.date=new Date().toISOString().split('T')[0];
      formData.image_url=image;
      formData.id_writer=userInfo.userId;
      console.log(formData)
      createArticle(formData, groupSelected, router)
    }    

    const handleUpdate = (value:any, editor:any) => {
        const length = editor.getContent({ format: 'text' }).length;
        setFormData({ ...formData, 'text': value });
        setGenerated(false);
    };

    return <>
    <div className='justify-start mb-8'>
        <p className='font-bold text-lg'>
          Image
        </p>
        <p className='text-base mb-2'>
          Add articles´s main image
        </p>
        <div className='flex items-center'>

          <div>
            <Button className='bg-blue-400 h-9 w-[7rem] mr-4' onClick={()=>{imageInputRef.current?.click()}}>
              Upload Image
            </Button>
            <input className='hidden' id='input_image' name='input_Image' key='1' type='file' ref={imageInputRef} onChange={handleImageChange} accept='image/*'/>
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
          Content
        </p>
        <p className='text-base mb-2'>
          Add content for the article that will be created. It can be imported as a Word, TXT, or MD file, or written in the text field.  
          Please note that the formatting of the article will remain the same as what you generate in the text field, with the addition of only an image (previously uploaded) and the title at the beginning of the article
        </p>
        <div className='mb-2' >
          <Button className='bg-gray-300' onClick={()=>{fileInputRef.current?.click()}}>
            <FaFileUpload  /> {file}
          </Button>
          <input className='hidden' id='input_File' name='input_File' key='2' type='file' ref={fileInputRef} onChange={handleFileChange} accept='.doc,.docx,.txt,.md'/>
        </div>
      </div>

      
      
  <div className='mb-5'>
    <Editor
      id="editor"
      textareaName='text'
      apiKey="cx94g2it82nxlalcwthrk1ogfnu4kbx3dw55vchnt0mje4jd"
      initialValue={plainText}
      init={{
        resize:true,
        min_height: 300,
        max_height: 600,
        menubar: false,
        plugins: [
          
          'advlist', 'autolink', ' lists', ' link', ' image', ' charmap', ' preview', ' anchor',
          'searchreplace', ' visualblocks', ' code', ' fullscreen', 'autoresize',
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
        <ModelInput formData={formData} generated={generated} setGenerated={setGenerated} setFormData={setFormData} setCategory={setCategory} Category={Category} groupSelected={groupSelected} setGroupSelected={setGroupSelected} loading={loading} setLoading={setLoading}/>
        {loading?
        <LoadingButton/>
          :
        <Button className='bg-[#963ED9] mb-2 w-36 text-white' onClick={sendData}>
          <MdOutlineCreate /> Create article
        </Button>
        }


      </div>
      </>
}

export default ArticleInput;
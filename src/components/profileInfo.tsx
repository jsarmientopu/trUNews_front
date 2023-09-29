import React, {useState, useEffect, useRef} from "react";
import { AiFillEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import {ImCross, ImCheckmark} from "react-icons/im"
import {Avatar, Button, Input, Textarea} from "@nextui-org/react";
import { getUserType, imageType } from "@/dto/users";
import { getProfile, updateProfile, squareImage} from "@/utils/fetchs";


const ProfileInfo=({edit,setEdit,follow,setFollow}:any)=>{

    const [image,setImage] = useState<string>("https://i.pravatar.cc/150?u=a04258114e29026708c");
    const [newImage, setNewImage] = useState<string>("https://i.pravatar.cc/150?u=a04258114e29026708c");
    const [infoImage, setInfoImage]=useState<imageType>();
    const [profileInfo,setProfileInfo] = useState<getUserType>({
        'id_user':-1,
        'username':'',
        'name':'',
        'lastname':'',
        'rol':0,
        'profession':'',
        'description':''
    });
    const imageInputRef = useRef<HTMLInputElement>(null);

    const getImageMeta = async (
        file: File
    ): Promise<{
        width: number,
        fileExtension: string|undefined,
    }> => {
        const { name } = file
        const fileExtension = name.split('.').pop()
        const localUrl = URL.createObjectURL(file)
        // reading a file to get height and width
        async function getImageParams(file: File) {
            return new Promise((resolve, reject) => {
                var reader = new FileReader()

                reader.onload = async (e: any) => {
                    var image = new Image()
                    image.src = e.target.result
                    await image.decode()

                    resolve({ width: image.width, height: image.height })
                }
                reader.readAsDataURL(file)
            })
        }
        const { width, height } = await getImageParams(file) as any

        return { width,  fileExtension}
    }

    const handleImageChange = async(event:any) => {
        const image = event.target.files[0];
        const data = await getImageMeta(image)
        if (image) {
            const reader = new FileReader();
            reader.onload = function(evt:any) { 
                const metadata = `name: ${image.name}, type: ${image.type}, size: ${image.size}, width: ${image}, contents:`;
                const contents = evt.target.result;
                setInfoImage({ ...infoImage, 'contenido':contents, 'extension': '.'+data.fileExtension, 'width': data.width, 'ratio':'1:1'});
            };
            reader.readAsDataURL(image);
        }
    };

    const submitForm=async (event:any)=>{
        event.preventDefault();
        const tar = event.target;
        const sentData={ ...profileInfo, 
            'name':tar.name.value,
            'lastname':tar.lastname.value,
            'username':tar.username.value,
            'profession':tar.profession.value,
            'description':tar.description.value
        } as getUserType
        console.log(newImage)
        if(newImage==image){
            const res = await updateProfile(sentData,newImage)
            if(res.image_url)setImage(res.image_url)
        }else{
            const res = await updateProfile(sentData,null)
        }
        setProfileInfo(sentData)
    }

    useEffect(() => {
        (async () => {
            if(infoImage?.contenido){
                const res = await squareImage(infoImage);
                if(!res.error) setNewImage(res.image)
            }
        })();
    },[infoImage])

    useEffect(() => {
        (async () => {
            const users = await getProfile();
            setProfileInfo(users);
        })();
    },[])

    if(edit){

        return <>

            <div className="bg-white w-[80%] rounded-[17px]">

            <div className="flex flex-wrap sm:flex-row justify-start h-[50%] sm:h-full w-full py-5 px-5 sm:px-16 sm:py-10 gap-4">
                <form className="flex flex-wrap sm:flex-row h-full w-full gap-10 items-center justify-center" onSubmit={submitForm}>
                    
                    <div className="flex flex-col items-center justify-center w-full sm:w-[60%] h-full">
                        <div className="flex flex-col justify-center mx-7 w-full gap-4">
                            <p className='font-bold text-4xl pb-4'>Mi perfil</p>
                            <div className="flex flex-wrap gap-4  md:gap-2 md:flex-nowrap">
                                <Input className="border-2 sky-600 rounded-[13px] " defaultValue={profileInfo.name} color='primary' variant='bordered' type='text' name="name" placeholder='Nombres'  isRequired />
                                <Input className="border-2 sky-600 rounded-[13px] " defaultValue={profileInfo.lastname} color='primary' variant='bordered' type='text' name="lastname" placeholder='Apellidos'  isRequired />
                            </div>
                            <Input className=" border-2 sky-600 rounded-[13px] " defaultValue={profileInfo.username} color='primary' variant='bordered' type='text' name="username" radius = {"md"} placeholder='Usuario'  isRequired />
                            <Input className=" border-2 sky-600 rounded-[13px] " defaultValue={profileInfo.profession} color='primary' variant='bordered' type='text' name="profession" placeholder='Profesión'  />
                            <Textarea
                                className="w-full sky-600 text-black "
                                defaultValue={profileInfo.description}
                                variant='bordered'
                                minRows={1}
                                placeholder="Descripción"
                                name='description'
                                color="primary"
                                />
                            
                        </div>
                        
                    </div>
                    <div className="w-full sm:w-[30%] h-full">  
                        <Avatar src={newImage}  className="w-full h-full text-large object-cover" onClick={()=>{imageInputRef.current?.click()}} isBordered/>
                        <input key='1' type='file' className='hidden' ref={imageInputRef} onChange={handleImageChange} accept='image/*'/>
                        <div className="flex flex-column gap-4 items-center justify-center py-4">
                            <Button  isIconOnly  className="bg-[#0CDD4E] text-[#F8F8F8] shadow-2xl" type="submit">
                            <ImCheckmark size='1.5em' />
                            </Button>
                            <Button  isIconOnly  className=" text-[#F8F8F8] shadow-2xl"color="danger"  onClick={()=>{setEdit(false); setNewImage(image)}}>
                            <ImCross size='1.5em' />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        

        </div>

        </>

    }

    return <>
    
        <div className="bg-[#F0F2F4] w-[80%] rounded-[17px]">
            <div className="flex flex-wrap sm:flex-row justify-start h-[50%] sm:h-full w-full py-5 px-5 sm:px-28 sm:py-10 gap-4">
                <div className="flex flex-wrap sm:flex-row h-full w-full sm:w-[70%] gap-10 items-center justify-center">
                    <div className="w-full sm:w-[30%] h-full">
                        <Avatar fallback src={image} className="w-full h-full text-large" isBordered />
                        <div className="flex flex-column gap-4 items-center justify-center py-4">
                            {profileInfo.rol==0?
                            <Button>
                            <AiFillEye size='1.5em' /> 
                                Lector
                            </Button>
                            :
                            <Button>
                            <AiFillEye size='1.5em' /> 
                                Escritor
                            </Button>
                            }
                            <Button  isIconOnly  className="bg-[#963ED9] text-[#F8F8F8] shadow-2xl" onClick={()=>{setEdit(true)}}>
                            <FiEdit size='1.5em' />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full sm:w-[60%] h-full">
                        <div className="flex flex-col item-center w-full items-center sm:items-start">
                            <p className='font-bold text-4xl'>{profileInfo.name} {profileInfo.lastname}</p>
                            <p className='text-sm mb-4'>{profileInfo.username}</p>
                            {profileInfo.profession?<p className='text-lg'>Profesión: <p className='text-base'>{profileInfo.profession}</p></p>:<></>}
                            {profileInfo.description?<p className='text-lg'>Description: <p className='text-base'>{profileInfo.description}</p></p>:<></>}
                        </div>
                        
                    </div>
                </div>
                    <div className=" flex flex-col items-center justify-center gap-4 w-full sm:w-[25%]">
                        <div className=" flex flex-wrap sm:flex-row items-center justify-center gap-4">
                            <p className='text-lg'>100 <a onClick={() => {follow ? setFollow(false) : setFollow(true)}}>Seguidos</a></p>
                            <p className='text-lg'>6 Seguidores</p>
                        </div>
                        <Button color="primary">
                            Seguir
                        </Button>
                    </div>
            </div>
        

        </div>

    </>
}

export default ProfileInfo;
'use client'

import React, {useState, useEffect, useMemo, useRef} from "react";
import {Avatar, Divider, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Textarea } from '@nextui-org/react';
import CategoryChip from "@/components/CreateCommunity/CategoryChip";
import { getCategories, squareImage } from "@/utils/fetchs";
import { titleCase } from "@/utils/Navbar/utils";
import { imageType } from "@/dto/users";
import { set } from "zod";
import {Image as NextImage} from '@nextui-org/react' ;
import { createCommunityType } from "@/dto/community";
import { createCommunity } from "@/utils/Communities/fetch";
import { info } from "console";


export default function CreateCommunityPage({ params }: any) {
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<createCommunityType>({
        name: '',
        creator_id: 0,
        date: '',
        avatar_extension: '',
        avatar_ancho: 0,
        avatar_ratio: '',
        banner_extension: '',
        banner_ancho: 0,
        banner_ratio: '',
        description: '',
        avatar_url: '',
        banner_url: '',
        id_categories: [],

    });
    const [categories, setCategories] = useState<Array<any>>([{
        'id_category': 0,
        'cat_name': "",
    }]);


    
    const handleBannerChange = async(event:any) => {
        const image = event.target.files[0];
        const data = await getImageMeta(image)
        if (image) {
            const reader = new FileReader();
            reader.onload = function(evt:any) { 
                const metadata = `name: ${image.name}, type: ${image.type}, size: ${image.size}, width: ${image}, contents:`;
                const contents = evt.target.result;
                setInfoBanner({ ...infoBanner, 'contenido':contents, 'extension': '.'+data.fileExtension, 'width': data.width, 'ratio':'3:1'});
            };
            reader.readAsDataURL(image);
        }
        setBannerImage(image)
    };

    const handleAvatarChange = async(event:any) => {
        const image = event.target.files[0];
        const data = await getImageMeta(image)
        if (image) {
            const reader = new FileReader();
            reader.onload = function(evt:any) { 
                const metadata = `name: ${image.name}, type: ${image.type}, size: ${image.size}, width: ${image}, contents:`;
                const contents = evt.target.result;
                setInfoAvatar({ ...infoAvatar, 'contenido':contents, 'extension': '.'+data.fileExtension, 'width': data.width, 'ratio':'1:1'});
            };
            reader.readAsDataURL(image);
        }
        setAvatarImage(image)
    };

    const [bannerImage,setBannerImage] = useState<string>("https://trunews.s3.us-east-2.amazonaws.com/community/banner/defaultBanner.jpg");
    const [avatarImage,setAvatarImage] = useState<string>("https://trunews.s3.us-east-2.amazonaws.com/profile/defaultProfile.jpg");
    const [newBanner, setNewBanner] = useState<string>("https://trunews.s3.us-east-2.amazonaws.com/community/banner/defaultBanner.jpg");
    const [newAvatar, setNewAvatar] = useState<string>("https://trunews.s3.us-east-2.amazonaws.com/profile/defaultProfile.jpg");
    const [infoBanner, setInfoBanner]=useState<imageType>();
    const [infoAvatar, setInfoAvatar]=useState<imageType>();

    const submitForm=async (event:any)=>{
        event.preventDefault();
        const cats:Array<number> = [];
        selectedKeys.forEach((key)=>{cats.push(categories.find((cat)=>cat.cat_name===key)?.id_category as number)})
        const tar = event.target;
        let sentData={ ...formData, 
            'name':tar.name.value,
            'description':tar.description.value,
            'date':new Date().toISOString().split('T')[0],
        } as createCommunityType
            var res;
            if(newBanner!==bannerImage){
                if(newAvatar!==avatarImage){
                    sentData = {...sentData, 'banner_ancho': infoBanner?.width, 'banner_ratio': infoBanner?.ratio, 'banner_extension': infoBanner?.extension, 'avatar_ancho': infoAvatar?.width, 'avatar_ratio': infoAvatar?.ratio, 'avatar_extension': infoAvatar?.extension}
                    res = await createCommunity(sentData, cats, newBanner, newAvatar);
                }
                else{
                    sentData = {...sentData, 'banner_ancho': infoBanner?.width, 'banner_ratio': infoBanner?.ratio, 'banner_extension': infoBanner?.extension, 'avatar_ancho': 0, 'avatar_ratio': "", 'avatar_extension': ""}
                    res = await createCommunity(sentData, cats, newBanner, "");
                }

            }else{
                if(newAvatar!==avatarImage){
                    sentData = {...sentData, 'banner_ancho': 0, 'banner_ratio': "", 'banner_extension': "", 'avatar_ancho': infoAvatar?.width, 'avatar_ratio': infoAvatar?.ratio, 'avatar_extension': infoAvatar?.extension}
                    res = await createCommunity(sentData, cats, "", newAvatar);
                }
                else{
                    sentData = {...sentData, 'banner_ancho': 0, 'banner_ratio': "", 'banner_extension': "", 'avatar_ancho': 0, 'avatar_ratio': "", 'avatar_extension': ""}
                    res = await createCommunity(sentData, cats, "", "");
                }
            }
            console.log(res)
        
        
    }
    
    useEffect(() => {
        async function fetchData() {
            const categoriesData = await getCategories();
            if(categoriesData){
                setCategories(categoriesData);
            }
        }
        fetchData();}, []);

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

        useEffect(() => {
            (async () => {
                if(infoBanner?.contenido){
                    const res = await squareImage(infoBanner);
                    if(!res.error) setNewBanner(res.image)
                }
            })();
        },[infoBanner])
        
        useEffect(() => {
            (async () => {
                if(infoAvatar?.contenido){
                    const res = await squareImage(infoAvatar);
                    if(!res.error) setNewAvatar(res.image)
                }
            })();
        },[infoAvatar])

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col w-[80%] py-10 gap-5">
                    <NextImage 
                    src={newBanner}
                    width={1500}
                    height={500}
                    className="object-cover"
                    onClick={()=>{bannerInputRef.current?.click()}}
                    >
                    </NextImage>
                    <input key='1' type='file' className='hidden' ref={bannerInputRef} onChange={handleBannerChange} accept='image/*'/>
                    <div className="flex flex-row flex-wrap gap-4 w-full">
                        {Array.from(selectedKeys).map((key:string, index:number) => (
                        <CategoryChip key={index} category={key}></CategoryChip>
                    ))}
                    </div>
    
                    <div className="flex flex-row justify-start w-full">               
                        <Dropdown>
                            <DropdownTrigger>
                                <Button 
                                color="secondary"
                                variant="solid" 
                                className="capitalize"

                                >
                                Select categories
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Multiple selection example"
                                variant="flat"
                                closeOnSelect={false}
                                disallowEmptySelection
                                selectionMode="multiple"
                                selectedKeys={selectedKeys}
                                onSelectionChange={(keys)=>{setSelectedKeys(keys as Set<string>)}}
                                className="w-[15rem] dropdown-menu-scroll"                            >
                            {categories.map((category) => (
                            <DropdownItem key={category.cat_name}>
                                {titleCase(category.cat_name)}
                            </DropdownItem>
                        ))}
                            </DropdownMenu>
                        </Dropdown>
                </div>
                <form className="flex flex-wrap sm:flex-row h-full w-full gap-2 items-center justify-center" onSubmit={submitForm}>
                    <div className="flex flex-row w-full items-center gap-10 justify-between">
                        <Input className="border-2 sky-600 rounded-xl "  color='primary' variant='bordered' type='text' name="name" placeholder='Name'  isRequired />
                        <Avatar showFallback src={newAvatar}  className="w-[40%] h-full text-large object-cover" onClick={()=>{avatarInputRef.current?.click()}} isBordered/>
                        <input key='2' type='file' className='hidden' ref={avatarInputRef} onChange={handleAvatarChange} accept='image/*'/>
                    </div>
                    <Textarea
                            className="w-full sky-600 text-black "
                            variant='bordered'
                            minRows={4}
                            placeholder="Description"
                            name='description'
                            color="primary"
                            />
                    <div className="w-full sm:w-[30%] h-full">  
                        <Button 
                        color="secondary"
                        variant="solid" 
                        className="w-full"
                        type="submit"
                        >
                        Create community
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
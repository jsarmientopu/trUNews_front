import { Textarea, Button} from '@nextui-org/react'
import { RiRefreshLine } from 'react-icons/ri'
import { createArticleType } from '@/dto/article'
import { aiModelInfoType } from '@/dto/article'
import { getTitleCategories } from '@/utils/Create_Article/fetch'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {CheckboxGroup} from "@nextui-org/react";
import { CustomCheckbox } from './CustomCheckbox'

const ModelInput=({formData, generated, setGenerated, setFormData, setCategory, Category, groupSelected, setGroupSelected, loading, setLoading}:{'formData':createArticleType, 'generated':boolean, 'setGenerated':any, 'setFormData':Dispatch<SetStateAction<createArticleType>>, 'setCategory':any, 'Category':any, 'groupSelected':any, 'setGroupSelected':any, loading:any, setLoading:any})=>{

    const [title, setTitle]=useState<Array<string>>([])
    const [data, setData]=useState<createArticleType>(formData)
    const [counter, setCounter]=useState<number>(0)

    const handleGenerating=async(event:any)=>{
        if(generated){
            setCounter((counter+1)%title.length)
            return
        }
        data.date=new Date().toISOString().split('T')[0];
        console.log(data)
        data.text=data.text.replaceAll('"',"'")
        console.log(data.text)
        setLoading(true)
        const res = await getTitleCategories(data)
        if(res.categorias.length>0 && res.titulos.length>0){
          setTitle(res.titulos)
          setCategory(res.categorias)
          setGroupSelected([res.categorias[0].label])
          setGenerated(true)
        }
        setLoading(false)
    }

    useEffect(()=>{
      if(title){
          setFormData({...formData, 'title':title[counter]})
      }
    }, [counter, Category])

    useEffect(()=>{
        setData(formData)
    },[formData])

    if(loading) return <div className='flex flex-row gap-4 mb-2'>The title and categories are being generated</div>

    return <>
    <div className='flex flex-row gap-4 mb-2'>
          <Button className='w-50 bg-[#FF6624] text-[#F8F8F8]' onClick={handleGenerating}>
            <RiRefreshLine className='fill-[#F8F8F8]' /> {generated? 'Regenerate title and categories':'Generate the title and categories'}
          </Button>
          <div className='flex flex-column items-center justify-center'>
            <p> Generate the title and the categories to which your article belongs through artificial intelligence! Try it now!</p>
          </div>
        </div>
        <div>
          <Textarea
            variant='bordered'
            minRows={1}
            labelPlacement="outside"
            className="w-full mb-2 text-3xl text-black"
            size='lg'
            name='title'
            value={title.length>0?title[counter]:''}
            isDisabled
          />
        <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        className="gap-1 pt-4"
        label="Select categories (At least one)"
        orientation="horizontal"
        value={groupSelected}
        onChange={(nice)=>{setGroupSelected((nice as string[]))}}
      >
        {Category.map((cat:any, index:number)=>(
            <CustomCheckbox key={index} id={index} value={cat.label}>{cat.label}</CustomCheckbox>
        ))}
      </CheckboxGroup>
      <p className="mt-4 ml-1 text-default-500 pb-6 px-2">
        Selected: {groupSelected.join(", ")}
      </p>
    </div>
        </div>
    </>
}

export default ModelInput;
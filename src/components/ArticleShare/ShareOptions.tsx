import React from 'react'
import { 
  FacebookShareButton, 
  FacebookIcon, 
  WhatsappShareButton, 
  WhatsappIcon, 
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'next-share';
import { usePathname } from 'next/navigation'
import {BiLink} from 'react-icons/bi'
import QR from './QR';
import Swal from 'sweetalert2';
import {Button} from "@nextui-org/react";

const ShareOptions=()=>{

    const pathname = usePathname()
    const copyToClipboard =(evt:any)=> {
        navigator.clipboard.writeText(process.env.FRONT_URL+pathname)
        Toast.fire({
        icon: 'success',
        title: 'Link copied'
        })
    }
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
        })

    return ( 
    <div className='flex flex-row justify-center items-center gap-0.5'> 
      <FacebookShareButton 
        blankTarget
        url={process.env.FRONT_URL+pathname} > 
        <FacebookIcon size={32} round /> 
      </FacebookShareButton> 
      <TwitterShareButton 
        blankTarget
        url={process.env.FRONT_URL+pathname} > 
        <TwitterIcon size={32} round /> 
      </TwitterShareButton> 
      <WhatsappShareButton  
        blankTarget
        url={process.env.FRONT_URL+pathname} > 
        <WhatsappIcon size={32} round /> 
      </WhatsappShareButton> 
     <TelegramShareButton
        url={process.env.FRONT_URL+pathname}
        blankTarget
        >
        <TelegramIcon size={32} round />
        </TelegramShareButton>
      <EmailShareButton 
        blankTarget
        url={process.env.FRONT_URL+pathname}> 
        <EmailIcon size={32} round /> 
      </EmailShareButton> 
      <Button className='flex flex-col justify-center' onClick={copyToClipboard} isIconOnly radius='full' size='sm'><BiLink/></Button>
      <QR path={process.env.FRONT_URL+pathname}></QR>

    </div> 
  ) 
}

export default ShareOptions;
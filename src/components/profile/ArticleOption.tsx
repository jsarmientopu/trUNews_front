import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {BsThreeDotsVertical} from 'react-icons/bs';
import { alert } from "@/utils/alertHandeler";
import { unsaveArticle } from "@/utils/Profile/fetch";
import Swal from 'sweetalert2';
import { usePathname } from 'next/navigation'

export default function ArticleOption({mode, article, articles, setArticles}:{'mode':boolean, article:any, articles:any, setArticles:any}) {

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

    const handleEvent=async(ev:any)=>{
      console.log(ev)
        if(ev.target.textContent.includes('Unsave')){
          alert('question','You will delete this article from your saves', '', ()=>{unsaveArticle(article.id_article, articles, setArticles)})
        }else if(ev.target.key=='delete'){
          console.log('delete')
        }else{
          navigator.clipboard.writeText(`${process.env.FRONT_URL}/articulo/${article.id_article}`)
          Toast.fire({
            icon: 'success',
            title: 'Link copied'
          })
        }
    
    }



    const items = [
        {
        mode:0,
        key: "unsave",
        label: "Unsave article",
        },{
        mode:1,
        key: "delete",
        label: "Delete article",
        },
        {
        mode:2,
        key: "copy",
        label: "Copy link",
        }
    ];

  return (
    <Dropdown>
      <DropdownTrigger >
        <Button className="bg-[#EEEFEF]" variant="flat"
        isIconOnly
        >
         <BsThreeDotsVertical size={17}/> 
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {items.filter((item) => item.mode==2 || item.mode==Number(mode)).map((item)=> (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
            onClick={handleEvent}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

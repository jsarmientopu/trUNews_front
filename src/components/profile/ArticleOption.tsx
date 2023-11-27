import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {BsThreeDotsVertical} from 'react-icons/bs';
import { alert } from "@/utils/alertHandeler";
import { unsaveArticle } from "@/utils/Profile/fetch";
import Swal from 'sweetalert2';
import { usePathname } from 'next/navigation'
import { deletePost } from "@/utils/fetchs";
import { getArticleType } from "@/dto/article";

export default function ArticleOption({mode, article, articles, setArticles}:{'mode':boolean, article:any, articles:Array<getArticleType>, setArticles:any}) {

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

    const handleEvent=async(mode:Number)=>{
        if(mode==0){
          alert('question','You will delete this article from your saves', '', ()=>{unsaveArticle(article.id_article, articles, setArticles)})
        }else if(mode==1){
          alert('question','You will delete this article from your saves', '', async ()=>{
            const res = await deletePost(article.id_article);
            if(res.err){
              alert('error','Your article can\'t be deleted', 'Try again later', ()=>{})
            }else{
              setArticles(articles.filter((item:getArticleType)=>item.id_article!=article.id_article));
            }
          }
            )
        }else{
          navigator.clipboard.writeText(`${process.env.FRONT_URL}/article/${article.id_article}`)
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
            onClick={()=>{handleEvent(item.mode)}}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

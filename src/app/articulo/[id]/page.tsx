'use client'
import PostComponent from "@/components/PostComponent"
import { getPost } from "@/utils/fetchs"
import { useEffect } from "react"
import {useState} from 'react'

export default function Articulo({ params }: any) {

    const[post,setPost] = useState()

    useEffect(()=>{
        const fetchData = async () =>{
            const post = await getPost(params.id)
            setPost(post)
        };
        fetchData(); 
    },[params.id])

    

    return (
        <>
            <PostComponent id = {post?.articles_id_article} image_url = {post?.image_url} title = {post?.title} text = {post?.text} date = {post?.date} author = {post?.writer.username} />
        </>

    )
}
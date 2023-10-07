'use client'

import React, {useState, useEffect} from "react";
import FeedArticleCard from "@/components/feed/FeedArticleCard";

export default function feedPage() {
    return (
        <div className="py-2">
            <div className="flex justify-center py-unit-4">
                <FeedArticleCard 
                    imageArticle="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                    profileImage="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    autor="Tatiana Alvarez"
                    username="Warpyt"
                    title="Título del Artículo"
                    summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
            </div>
            <div className="flex justify-center py-unit-4">
                <FeedArticleCard 
                    imageArticle="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                    profileImage="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    autor="Tatiana Alvarez"
                    username="Warpyt"
                    title="Título del Artículo"
                    summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
            </div>
            <div className="flex justify-center py-unit-4">
                <FeedArticleCard 
                    imageArticle="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                    profileImage="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    autor="Tatiana Alvarez"
                    username="Warpyt"
                    title="Título del Artículo"
                    summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
            </div>
        </div>
    )
}
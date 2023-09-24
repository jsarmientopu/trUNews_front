import React from "react";
import { LiaGlassesSolid } from "react-icons/lia";
import {Image, Button} from "@nextui-org/react";

const SavedCard = ()=>{
    return <>
        <div className="flex flex-row rounded-[15px] w-[49%] bg-[#EEEFEF] p-4 gap-3">
            <div className="w-[50%]">
                <Image
                    className="mr-0"
                    width={'100%'}
                    height={'100%'}
                    alt="NextUI hero Image with delay"
                    src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                />
            </div>
            <div className="flex flex-col justify-center w-[50%] gap-2">
                <p className="text-center">Title</p>
                <Button className="flex flex-col mx-[10%] py-7 bg-[#0079DC] text-[#F8F8F8]">
                    <div className="flex flex-col items-center">
                        <p className="">Ver articulo</p>
                        <LiaGlassesSolid size='1.5em'/>
                    </div>
                </Button>
            </div>
        </div>
    </>

}

export default SavedCard;
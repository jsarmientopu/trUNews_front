import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Image} from "@nextui-org/react";


const MainCard=()=>{

    const [isFollowed,setIsFollowed]=useState(false);

    return (
    <Card className="max-w-[80%] p-3">
      <CardHeader className="justify-between">
        
      </CardHeader>
      <CardBody className="flex flex-row flex-wrap md:flex-nowrap py-0 text-small text-default-400 h-full px-4 gap-5 align-middle">
        <div className="w-full md:w-[65%]">
          <Image
              width={'100%'}
              height={'100%'}
              alt="NextUI hero Image with delay"
              src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
        </div>
        <span className="flex flex-column items-center justify-center">
            <p className=" text-justify py-0 md:py-3 w-[85%]">
                Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
            </p>
        </span>
        {/* <span className="pt-2">
          #FrontendWithZoey 
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span> */}
      </CardBody>
      <CardFooter className="flex flex-row justify-between px-10">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Views</p>
        </div>
        <div className="flex gap-5">
          {/* <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" /> */}
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
          </div>
        </div>
      </CardFooter>
    </Card>
    )
}

export default MainCard
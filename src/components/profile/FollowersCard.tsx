
'use client'
import { Avatar, Button, Tooltip} from "@nextui-org/react";
import Link from "next/link";
import { GiBookCover } from "react-icons/gi";
import { FaPenNib } from "react-icons/fa";
import { Roles } from "@/utils/rolDefinition";


const FollowersCard=({data}:any)=>{

    return<Link target="_parent" href={{pathname:`/profile/${data.id_user}`}}  className="flex flex-row justify-between gap-10 px-7 w-full  py-2 transition ease-in-out delay-100 hover:scale-110 hover:shadow-lg">
            <div className="w-[25%] items-center"><Avatar className="w-full h-full text-large" src={data.profile_image?data.profile_image:"https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"}  isBordered /></div>
            <div className="flex flex-col justify-center w-[40%]">
                <p className="text-2xl">{data.name}</p>
                <p className="text-md">{data.username}</p>
            </div>
            <div className="flex flex-col justify-center">
            <Tooltip
            className="mx-2"
            placement='right'
            content={`This user is ${data.rol==Roles.lector?'Reader':'Writer'}`}
            >
                {data.rol==Roles.lector?
                    <Button className="bg-[#963ED9] text-[#F8F8F8] shadow-2xl" isIconOnly><GiBookCover size='1.5em'  /></Button>
                :
                    <Button className="bg-[#963ED9] text-[#F8F8F8] shadow-2xl" isIconOnly><FaPenNib size='1.5em' /></Button>
                }
            </Tooltip>
            </div>
        </Link>
}

export default FollowersCard;
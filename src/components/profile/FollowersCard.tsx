
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { GiBookCover } from "react-icons/gi";
import { FaPenNib } from "react-icons/fa";



const FollowersCard=({data}:any)=>{

    
    return <div className="flex flex-row justify-between gap-10 px-7 w-full  py-2 transition ease-in-out delay-100 hover:scale-110 hover:shadow-lg">
        <div className="w-[15%]"><Avatar  showFallback src={data.image_url} className="w-full h-full text-large" isBordered /></div>
        <div className="flex flex-col justify-center w-[35%]">
            <p className="text-2xl">{data.name}</p>
            <p className="text-md">{data.username}</p>
        </div>
        <Popover className="w-[40$]" placement="right">
            <PopoverTrigger>
                {data.rol==0?
                    <Button className="bg-[#963ED9] text-[#F8F8F8] shadow-2xl" isIconOnly><GiBookCover size='1.5em'  /></Button>
                :
                    <Button className="bg-[#963ED9] text-[#F8F8F8] shadow-2xl" isIconOnly><FaPenNib size='1.5em' /></Button>
                }
            </PopoverTrigger>
            <PopoverContent>
                {(titleProps) => (
                <div className="px-1 py-2">
                    <h3 className="text-small font-bold" {...titleProps}>
                    Rol
                    </h3>
                    <div className="text-tiny">This is user is {data.rol==0?'Reader':'Writer'}</div>
                    </div>
                    )}
            </PopoverContent>
        </Popover>
        </div>
}

export default FollowersCard;
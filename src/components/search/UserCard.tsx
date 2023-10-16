import { getUserType } from "@/dto/users";
import Link from "next/link";
import {Card, CardFooter, Avatar} from "@nextui-org/react";

const UserCard=({user}:{'user':getUserType})=>{
    return <Link href={{pathname:`/profile/${user.id_user}`}} className='w-full'>
        <Card className="w-full">
            <div className="flex flex-col item-center items-center px-3 py-0 text-small text-default-400 w-full">
                <div className="w-[75%] px-10 pt-6 pb-4">
                    <Avatar
                        className="mr-0 w-full h-full"
                        alt="NextUI hero Image with delay"
                        src={user.image_url?user.image_url:'https://www.sopitas.com/wp-content/uploads/2023/06/historia-detras-meme-hormiga-triste-origen-4.jpg?resize=1024,1019'}
                        isBordered
                    />
                </div>
                <p className="flex flex-row pt-2 justify-center w-[90%] text-xl text-black font-bold">
                    {user.name+' '+user.lastname}
                </p>
                <p className="flex flex-row pt-2 justify-center w-[90%] text-default-500 gap-2">
                    {'@'+user.username} <p className="text-default-500"> {user.rol==0?'Reader':'Writer'}</p>
                </p>
                <span className="flex flex-row pt-2 justify-start">
                {user.description}
                </span>
            </div>
            <CardFooter className="flex fle-row justify-between">
                <div className="flex flex-row gap-2">
                <p className="font-semibold text-default-400 text-small">{user.followersCount}</p>
                <p className=" text-default-400 text-small">Following</p>
                </div>
                <div className="flex flex-row gap-1">
                <p className="font-semibold text-default-400 text-small">{user.followingsCount}</p>
                <p className="text-default-400 text-small">Followers</p>
                </div>
            </CardFooter>
        </Card>
        <div className="flex flex-col gap-2">
        </div>
    </Link>
}

export default UserCard;
'use client'
import React from 'react';
import { Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { BsHandIndexThumb } from 'react-icons/bs'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSpring, a } from '@react-spring/web'
import verifyToken from '@/utils/utils';
import { joinCommunity } from '@/utils/Communities/fetch';
import { decryptedJWT } from '@/dto/users';
import Link from 'next/link';
import { AiOutlineCheck } from 'react-icons/ai';


function CommunityCard({ id_com, title, profile_image, cats, members, description, isMember }: any) {

    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })

    const [userInfo, setInfoUser] = useState<decryptedJWT>({ userId: -2, rol: -2 })

    async function token() {
        const rol = await verifyToken();
        setInfoUser(rol);
    }

    useEffect(() => {
        token();
    }, []);

    function jointoCommunity() {
        joinCommunity(userInfo.userId, id_com);
    }


    return (
        <div onClick={() => set(state => !state)} className='relative mb-2'>
            <a.div

                className={`backside cursor-pointer absolute top-0 left-0 p-4 flex flex-col items-center justify-center gap-3 h-[29rem] w-72 rounded-3xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.17)] bg-gradient-to-tr from-purple-800 via-purple-600 to-indigo-600 ${flipped ? "z-10" : ''}`}
                style={{
                    opacity,
                    transform,
                    rotateY: '180deg',
                }}
            >
                <div className='flex justify-center'>
                    <p className='mx-4 font-medium line-clamp-[14] text-justify text-white select-none'>
                        {description}
                    </p>
                </div>

                <div className='flex justify-center'>
                    <Button className='w-56 h-8 bg-[#FF461F] flex items-center justify-center rounded-lg gap-2 z-50'>
                        <Link href={`community/${id_com}`}>
                            <p className='text-center text-white font-medium text-xl'>
                                Read more
                            </p>
                        </Link>

                        <BsHandIndexThumb color="white" size="1.8em" className="rotate-[-45deg]" />
                    </Button>
                </div>



            </a.div>

            <a.div className='frontside cursor-pointer p-4 flex flex-col justify-between h-[29rem] w-72 rounded-3xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.17)] bg-white z-50' style={{ opacity: opacity.to(o => 1 - o), transform }}>

                <div className='break-words'>
                    <p className='text-center font-bold text-2xl line-clamp-2 select-none'>
                        {title}
                    </p>
                </div>
                <div className='flex justify-center'>
                    <Image className='shadow-2xl h-48 w-48 object-cover mb-1 select-none' radius='full' alt='test' src={profile_image} />
                </div>
                <div className='flex gap-2 justify-center flex-wrap'>
                    {cats.map((cat: any, index: any) => {
                        return (
                            <div key={index} className='bg-[#963ED9] p-1 rounded-md'>
                                <p className='text-white text-[0.65rem] text-center font-medium select-none'>
                                    {cat}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div className='flex justify-center'>
                    <p className='text-zinc-800 select-none'>
                        {members} members
                    </p>
                </div>
                <div className='flex justify-center'>
                    {!isMember?
                        <Button className='w-30 h-8 bg-[#FF461F] flex items-center justify-center rounded-lg gap-1' onPress={jointoCommunity}>

                            <p className='text-center text-white font-medium text-xl'>
                                Join
                            </p>
                            <BsHandIndexThumb color="white" size="1.8em" className="rotate-[-45deg]" />
                        </Button>
                    :
                        <Button className='w-30 h-8 bg-[#FF461F] flex items-center justify-center rounded-lg gap-1' disabled>

                            <p className='text-center text-white font-medium text-xl'>
                                Joined 
                            </p>
                            <AiOutlineCheck color="white" size="1.8em"></AiOutlineCheck>
                        </Button>}
                </div>


            </a.div>

        </div>
    )
}

export default CommunityCard;
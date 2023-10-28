'use client'
import React from 'react';
import { Card } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { PiCursorClick } from 'react-icons/pi'
import { TbHandClick } from 'react-icons/tb'
import { BsHandIndexThumb } from 'react-icons/bs'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSpring, a } from '@react-spring/web'


function CommunityCard() {

    const linkImage = "https://revistaastronauta.com/wp-content/uploads/2022/05/music.jpg"
    const categories = ["WORLD NEWS", "TECH", "TECH", "TECH", "TECH", "TECH", "TECH"]

    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })


    return (
        <div onClick={() => set(state => !state)} className='relative'>
            <a.div

                className={`backside cursor-pointer absolute top-5 left-0 p-4 flex flex-col justify-between h-[29rem] w-72 rounded-3xl shadow-2xl bg-gradient-to-tr from-purple-800 to-indigo-600 ${flipped ? "z-10" : ''}`}
                style={{
                    opacity,
                    transform,
                    rotateY: '180deg',
                }}
            >
                <div className='flex justify-center'>
                    <p className='mx-4 my-4 font-medium line-clamp-[14] text-justify text-white select-none'>
                        This is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description this is a sample description
                    </p>
                </div>

                <div className='flex justify-center'>
                    <Button className='mx-4 my-4 w-52 h-10 bg-[#FF461F] flex items-center justify-center rounded-lg gap-1 z-50'>

                        <p className='text-center text-white font-medium text-2xl'>
                            Read more
                        </p>
                        <BsHandIndexThumb color="white" size="2em" className="rotate-[-45deg]" />
                    </Button>
                </div>



            </a.div>

            <a.div className='frontside cursor-pointer mt-5 p-4 flex flex-col justify-between h-[29rem] w-72 rounded-3xl shadow-2xl bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-400 z-50' style={{ opacity: opacity.to(o => 1 - o), transform }}>

                <div className='break-words'>
                    <p className='text-center font-bold text-2xl line-clamp-2 select-none'>
                        Sample title
                    </p>
                </div>
                <div className='flex justify-center'>
                    <Image className='shadow-2xl h-48 w-48 object-cover mb-1 select-none' radius='full' alt='test' src={linkImage} />
                </div>
                <div className='flex gap-2 justify-center flex-wrap'>
                    {categories.map((cat: any, index: any) => {
                        return (
                            <div key={index} className='bg-[#963ED9] p-1 rounded-md'>
                                <p className='text-white text-sm text-center font-medium select-none'>
                                    {cat}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div className='flex justify-center'>
                    <p className='text-zinc-800 select-none'>
                        100 members
                    </p>
                </div>
                <div className='flex justify-center'>
                    <Button className='w-30 h-10 bg-[#FF461F] flex items-center justify-center rounded-lg gap-1'>

                        <p className='text-center text-white font-medium text-2xl'>
                            Join
                        </p>
                        <BsHandIndexThumb color="white" size="2em" className="rotate-[-45deg]" />
                    </Button>
                </div>


            </a.div>



        </div>
    )


    return (
        <div className='mt-5 p-4 flex flex-col justify-between h-[29rem] w-72 rounded-3xl shadow-2xl bg-gradient-to-tr from-cyan-500 from-60% to-blue-500'>

            <div className='break-words'>
                <p className='text-center font-bold text-2xl line-clamp-2'>
                    Sample long titleSample long titleSample long titleSample long title
                </p>
            </div>
            <div className='flex justify-center'>
                <Image className='h-48 w-48 object-cover mb-1' radius='full' alt='test' src={linkImage} />
            </div>
            <div className='flex gap-2 justify-center flex-wrap'>
                {categories.map((cat: any, index: any) => {
                    return (
                        <div key={index} className='bg-[#963ED9] p-1 rounded-md'>
                            <p className='text-white text-sm text-center font-medium'>
                                {cat}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className='flex justify-center'>
                <p className='text-zinc-800'>
                    100 members
                </p>
            </div>
            <div className='flex justify-center'>
                <Button className='w-30 h-10 bg-[#FF461F] flex items-center justify-center rounded-lg gap-1'>

                    <p className='text-center text-white font-medium text-2xl'>
                        Join
                    </p>
                    <BsHandIndexThumb color="white" size="2em" className="rotate-[-45deg]" />
                </Button>
            </div>


        </div>
    );
}

export default CommunityCard;
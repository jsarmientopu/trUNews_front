import React from 'react'
import { CardFooter, Image } from '@nextui-org/react'
import { Card } from '@nextui-org/react'
import { CardHeader } from '@nextui-org/react'
import { IoLocationSharp } from 'react-icons/io5'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineCheck } from 'react-icons/ai'
import {IoMdRemoveCircleOutline} from 'react-icons/io'




function EventCard({ eventName, eventDescription, place, date, image, participants, isAttendee }: any) {

    return (
        <div>

            <Card className="article_card w-80 h-[27rem] drop-shadow-[0_0px_10px_rgba(0,0,0,0.4)]" isPressable>
                <CardHeader className="absolute z-10 top-1 flex-col p-3 !items-start">
                    <p className="drop-shadow-[0_1.2px_3px_rgba(0,0,0,1000)] font-bold text-white text-2xl text-left mb-1">{eventName}</p>

                    <div className='flex justify-center items-center gap-1 mb-1'>
                        <IoLocationSharp className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)]" size="2em" color="white" />
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-medium text-white text-xl text-left leading-5">{place}</p>
                    </div>
                    <div className='flex justify-center items-center gap-1 mb-1'>
                        <AiTwotoneCalendar className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)]" size="2em" color="white" />
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-medium text-white text-xl text-left leading-5">{date}</p>

                    </div>
                    <div className='flex justify-center items-center gap-1 mb-1'>
                        <AiOutlineClockCircle className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)]" size="2em" color="white" />
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-medium text-white text-xl text-left leading-5">4:00pm</p>
                    </div>
                    <div className='flex justify-center items-center gap-1 mb-1'>
                        <AiOutlineCheck className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)]" size="2em" color="white" />
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-medium text-white text-xl text-left leading-5">{participants} people will attend</p>
                    </div>
                    <div className='flex justify-center items-center mt-2'>
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-normal text-white text-lg leading-5 text-justify line-clamp-[6]">{eventDescription}</p>
                    </div>


                </CardHeader>

                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover brightness-75"
                    src={image}
                />
                <CardFooter className='p-3 flex justify-center items-center gap-1'>
                    {isAttendee ?
                        <>
                            <IoMdAddCircleOutline size="1.5em" color="black" />
                            <p className='font-bold text-xl'>
                                Attend
                            </p>
                        </> :
                        <>
                            <IoMdRemoveCircleOutline size="1.5em" color="black" />
                            <p className='font-bold text-xl'>
                                Cancel attend
                            </p>
                        </>
                    }


                </CardFooter>

            </Card>

        </div>
    )
}

export default EventCard

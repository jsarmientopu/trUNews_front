import React from 'react'
import { CardFooter, Image } from '@nextui-org/react'
import { Card } from '@nextui-org/react'
import { CardHeader } from '@nextui-org/react'
import { IoLocationSharp } from 'react-icons/io5'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { useState } from 'react'
import { decryptedJWT } from '@/dto/users'
import { getFromLocalStorage } from '@/utils/localStorage'
import verifyToken from '@/utils/utils'
import { useEffect } from 'react'
import { attendEvent } from '@/utils/fetchs'
import { undoAttendEvent } from '@/utils/fetchs'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import ArticleOption from '../profile/ArticleOption'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { deleteEvent } from '@/utils/Events/fetchs'
import { alert } from '@/utils/alertHandeler'
import { FaCheck } from "react-icons/fa";




function EventCard({ id, eventName, eventDescription, place, date, hour, image, participants, isAttendee, isCreator, community_id }: any) {


    const [userInfo, setUserInfo] = useState<decryptedJWT>({ userId: -2, rol: -1 })
    const [attendeeState, setAttendeeState] = useState(isAttendee)
    const [participantsState, setParticipantsState] = useState(participants)
    const [hovering, setHovering] = useState(false)

    async function token() {
        const tok = getFromLocalStorage("token");
        if (tok) {
            const rol = await verifyToken();
            setUserInfo(rol);
        } else {
            setUserInfo({ userId: -1, rol: -1 });
        }
    }
    useEffect(() => {
        token()
    }, [])

    async function handleEvent() {
        if (userInfo.userId === -1) {
            //alert("You must be logged in to attend an event")
        } else {
            if (attendeeState) {
                const undoAttend = await undoAttendEvent(userInfo.userId, id)
                console.log(undoAttend)
                setParticipantsState(participantsState - 1)
                if (undoAttend) {
                    //alert("You have canceled your attendance to this event")
                }

            } else {
                const attend = await attendEvent(userInfo.userId, id)
                console.log(attend)
                setParticipantsState(participantsState + 1)
                if (attend) {
                    //alert("You have successfully attended this event")
                }
            }
            setAttendeeState(!attendeeState);
            console.log(attendeeState)
        }

    }

    async function handleDeleteEvent() {
        const deleted = await deleteEvent(userInfo.userId, id);
        // const deleted = await deleteEvent(community_id, id);
        if (deleted.err) {
            alert('error', deleted.err, '', () => { });
        } else {
            alert('question', 'Your event will be deleted permanently', '', () => { location.reload() })
        }
    }

    return (
        <div>

            <Card onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="relative article_card w-80 h-[27rem] drop-shadow-[0_0px_10px_rgba(0,0,0,0.4)]" isPressable onPress={() => handleEvent()}>
                <CardHeader className="absolute z-10 top-1 flex-col p-3 !items-start">
                    <p className="drop-shadow-[0_1.2px_3px_rgba(0,0,0,1000)] font-bold text-white text-2xl text-left mb-1 line-clamp-2">{eventName}</p>

                    <div className='flex justify-center items-center gap-1 mb-1'>
                        <IoLocationSharp className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)]" size="2em" color="white" />
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-medium text-white text-xl text-left leading-5 line-clamp-2">{place}</p>
                    </div>
                    <div className='flex justify-center items-center gap-1 mb-1'>
                        <AiTwotoneCalendar className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)]" size="2em" color="white" />
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-medium text-white text-xl text-left leading-5">{date}</p>

                    </div>
                    <div className='flex justify-center items-center gap-1 mb-1'>
                        <AiOutlineClockCircle className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)]" size="2em" color="white" />
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-medium text-white text-xl text-left leading-5">{hour}</p>
                    </div>
                    <div className='flex justify-center items-center gap-1 mb-1'>
                        <AiOutlineCheck className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)]" size="2em" color="white" />
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-medium text-white text-xl text-left leading-5">{participantsState} people will attend</p>
                    </div>
                    <div className='flex justify-center items-center mt-2'>
                        <p className="drop-shadow-[0_1.2px_2px_rgba(0,0,0,1000)] font-normal text-white text-lg leading-5 text-justify line-clamp-[6]">{eventDescription}</p>
                    </div>


                </CardHeader>

                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover brightness-[.6]"
                    src={image}
                />
                <CardFooter className='p-3 flex justify-center items-center gap-1'>
                    {attendeeState && !hovering ?
                        <>
                            <FaCheck size="1.5em" color="green" />
                            <p className='font-bold text-xl text-green-700'>
                                Attending
                            </p>

                        </> :
                        !attendeeState && !hovering ?
                            <>
                                <IoMdAddCircleOutline size="1.5em" color="green" />
                                <p className='font-bold text-xl text-green-700'>
                                    Attend
                                </p>
                            </> :
                            attendeeState && hovering ?
                                <>
                                    <IoMdRemoveCircleOutline size="1.5em" color="#b91c1c" />
                                    <p className='font-bold text-xl text-[#b91c1c]'>
                                        Cancel attend
                                    </p>
                                </> :
                                !attendeeState && hovering ?
                                    <>
                                        <IoMdAddCircleOutline size="1.5em" color="green" />
                                        <p className='font-bold text-xl text-green-700'>
                                            Attend
                                        </p>

                                    </> : <></>


                    }


                </CardFooter>
                {isCreator ?
                    <div className="absolute top-0 right-0">
                        <Dropdown>
                            <DropdownTrigger >
                                <Button className="bg-transparent text-white" variant='light'
                                    isIconOnly size='lg'
                                >
                                    <BsThreeDotsVertical size={'2em'} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions">
                                <DropdownItem
                                    key='delete'
                                    color='danger'
                                    className='text-danger'
                                    onClick={handleDeleteEvent}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    :
                    <></>
                }

            </Card>

        </div>
    )
}

export default EventCard

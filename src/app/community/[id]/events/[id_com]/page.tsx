'use client'
import React from 'react'
import { useEffect } from 'react';
import { getCommunityEvents } from '@/utils/fetchs';
import { useState } from 'react';
import {BsCalendarX} from 'react-icons/bs'
import EventCard from '@/components/events/EventCard';

function Page({ params }: any) {

    const [eventsData, setEventsData] = useState<any[]>()


    useEffect(() => {
        (async () => {
            const eventsFetch = await getCommunityEvents(params.id)
            setEventsData(eventsFetch)
            console.log(eventsFetch)

        })();
    }, [])



    return (
        <div className='p-5'>
            <p className='text-black font-bold text-5xl lg:text-7xl flex justify-center mb-3'>
                Events
            </p>
            <div id="divider" className="flex justify-center">
                <div className="w-[90%] h-0.5 bg-gray-200 mb-3 rounded-full">
                </div>
            </div>
            <p className='text-black font-medium text-xl flex justify-center text-center mb-3'>
                Check the events scheduled for your community!
            </p>
            <div id="divider" className="flex justify-center">
                <div className="w-[90%] h-0.5 bg-gray-200 mb-3 rounded-full">
                </div>
            </div>
            <>
                {
                    eventsData?.length === 0 ?
                        <div className='flex flex-col justify-center items-center h-[50vh] gap-4'>
                            <BsCalendarX size='7em' color='black'/>
                            <p className='text-black font-normal text-3xl'>
                                There's no scheduled events yet
                            </p>

                        </div>
                        :
                        <div className='flex justify-center flex-wrap gap-14 mt-3'>
                            {
                                eventsData?.map((event: any, index: any) => {
                                    const eventDate = event.date
                                    const originalDate = new Date(eventDate);
                                    const year = originalDate.getFullYear();
                                    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
                                    const day = originalDate.getDate().toString().padStart(2, '0');
                                    const sanitizedDate = `${year}-${month}-${day}`;

                                    return (
                                        <div key={index}>
                                            <EventCard id={event.id_event} eventName={event.name} place={event.place} date={sanitizedDate} image={event.image_url} participants={event.attendeesCount} eventDescription={event.description} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </>

        </div>
    )
}

export default Page

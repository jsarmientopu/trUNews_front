import { decryptedJWT } from "@/dto/users";
import EventCard from "../events/EventCard";
import { getAttendedEvents } from "@/utils/fetchs";
import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import { getSaved } from "@/utils/fetchs";
import { getArticleType } from "@/dto/article";
import { useViewportScroll } from "framer-motion";

const AttendedEvents = ({ userInfo, userView }: { 'userInfo': decryptedJWT, 'userView': number }) => {
    const ani = useSpring({
        from: { width: '40%' },
        to: { width: '80%' },
        config: { duration: 500 },
    })

    const [attendedEventsData, setAttendedEventsData] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            const attendedEventsFetch = await getAttendedEvents(userInfo.userId)
            setAttendedEventsData(attendedEventsFetch)
            console.log(attendedEventsFetch)
        })();
    }, [])


    return <animated.div className="flex flex-col bg-[#F0F2F4] md:w-[80%] rounded-2xl justify-center items-center shadow-xl" style={ani}>
        <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full lg:w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">

            <p className="text-2xl">Attended Events</p>


        </div>

        {
            attendedEventsData.length > 0 ?
                <div className="flex flex-wrap lg:flex-wrap lg:flex-row justify-center items-center h-[50%] sm:h-full w-[95%] py-5 px-5 lg:px-14 sm:pb-10 pt-0 gap-4 bg-[#F0F2F4]">
                    {


                        attendedEventsData?.map((fullEvent: any, index: any) => {
                            const eventDate = fullEvent.event.date
                            const originalDate = new Date(eventDate);
                            const year = originalDate.getFullYear();
                            const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
                            const day = originalDate.getDate().toString().padStart(2, '0');
                            const sanitizedDate = `${year}-${month}-${day}`;
                            return (
                                <EventCard id={fullEvent.event_id_attendee} eventName={fullEvent.event.name} eventDescription={fullEvent.event.description} place={fullEvent.event.place} date={sanitizedDate} image={fullEvent.event.image_url} participants={fullEvent.event.attendeesCount} isAttendee={fullEvent.event.isAttendee} />
                            )
                        })

                    }

                </div> :
                <div className="flex flex-wrap lg:flex-wrap lg:flex-row h-[50%] sm:h-full w-[95%] py-5 px-5 lg:px-14 sm:pb-10 pt-0 gap-4 bg-[#F0F2F4]">
                    You haven't attended any events yet
                </div>
        }


    </animated.div>
}

export default AttendedEvents;
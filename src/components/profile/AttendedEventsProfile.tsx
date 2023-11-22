import { decryptedJWT } from "@/dto/users";
import EventCard from "../events/EventCard";
import { getAttendedEvents } from "@/utils/fetchs";
import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import { getSaved } from "@/utils/fetchs";
import { getArticleType } from "@/dto/article";
import { useViewportScroll } from "framer-motion";
import CommunityCard from "../communities-panel/CommunityCard";
import { getMyCommunities } from "@/utils/Profile/fetch";

const CommunityPanel = ({ userInfo, userView, mode }: { 'userInfo': decryptedJWT, 'userView': number, mode:[boolean,boolean, boolean] }) => {
    const ani = useSpring({
        from: { width: '40%' },
        to: { width: '80%' },
        config: { duration: 500 },
    })

    const [attendedEventsData, setAttendedEventsData] = useState<any[]>([])
    const [myCommunities, setMyCommunities] = useState<any[]>([])
    const [counter, setCounter]=useState<number>(1)

    useEffect(()=>{
        setCounter(1);
    },[mode])

    useEffect(() => {
        (async () => {
            let communityOrEvent;
            if(mode[1]){
                communityOrEvent = await getAttendedEvents(userView)
                if(communityOrEvent.err){
                    setAttendedEventsData([]);
                }else{
                    setAttendedEventsData(communityOrEvent)
                    console.log(communityOrEvent)
                }
            }else{
                communityOrEvent = await getMyCommunities(userView)
                if(communityOrEvent.err){
                    setMyCommunities([]);
                }else{
                    setMyCommunities(communityOrEvent)
                    console.log(communityOrEvent)
                }
            }
        })();
    }, [])


    return <animated.div className="flex flex-col bg-[#F0F2F4] md:w-[80%] rounded-2xl justify-center items-center shadow-xl py-4" style={ani}>
        <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full lg:w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">
            <p className="text-2xl">{mode[1]?"Attended Events":"Your communities"}</p>
        </div>

        {
            mode[1]?attendedEventsData.length > 0: myCommunities.length > 0?
                <div className="flex flex-wrap lg:flex-wrap lg:flex-row justify-center items-center h-[50%] sm:h-full w-[95%] py-5 px-5 lg:px-14 sm:pb-10 pt-0 gap-20 bg-[#F0F2F4]">
                    {mode[1]?
                        attendedEventsData?.filter((element:any, index)=>index<counter*6).map((event: any, index: any) => {
                            const eventDate = event.date
                            const originalDate = new Date(eventDate);
                            const year = originalDate.getFullYear();
                            const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
                            const day = originalDate.getDate().toString().padStart(2, '0');
                            const sanitizedDate = `${year}-${month}-${day}`;
                            return (
                                <div key={index}>
                                    <EventCard id={event.id_event} eventName={event.name} eventDescription={event.description} place={event.place} date={sanitizedDate} image={event.image_url} participants={event.attendeesCount} isAttendee={event.isAttendee} />
                                </div>
                            )
                        })
                    :
                        myCommunities?.filter((element:any, index)=>index<counter*6).map((event: any, index: any) => {
                            return (
                                <div key={index}>
                                    <CommunityCard id_com={event.id_community} title={event.name} profile_image={event.avatar_url} cats={event.categorias} members={event.followerCount} description={event.description} isMember={event.isMember}/>
                                </div>
                            )
                        })
                    }
                </div> :
                <div className="flex flex-wrap lg:flex-wrap lg:flex-row h-[50%] sm:h-full w-[95%] py-5 px-5 lg:px-14 sm:pb-10 pt-0 gap-4 bg-[#F0F2F4]">
                    {mode[1]?'You haven\'t attended any events yet':'You don\'t belong to any community yet'}
                </div>
        }
        {mode[1]?
        attendedEventsData.length>counter*6?
        <button onClick={()=>{setCounter(counter+1)}} className='bg-primary text-white py-2 px-3 rounded-xl'>
            See more
        </button>
        :
        <></>
        :
            myCommunities.length>counter*6?
            <button onClick={()=>{setCounter(counter+1)}} className='bg-primary text-white py-2 px-3 rounded-xl'>
                See more
            </button>
        :
             <></>
        }


    </animated.div>
}

export default CommunityPanel;
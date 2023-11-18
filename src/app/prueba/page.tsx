'use client'
import { ScrollShadow } from "@nextui-org/react"
import EventCard from "@/components/events/EventCard"
import eventsMock from "@/components/events/mockData.js"

export default function PruebaArticulo() {
    return (
        <div className="p-8">
            {
                eventsMock.map((event: any, index: any) => {
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

    )
}
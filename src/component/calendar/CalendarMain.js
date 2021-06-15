import { useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

const CalendarMain = () => {
    // let [eventInfo, setEventInfo] = useState(

    // );
    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'event 1', date: '2021-06-16', userId:'123' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 1', date: '2021-06-16' },
                    // { title: 'event 2', date: '2021-06-15' }
                ]}
                dateClick={(e) => console.log(e)}
                eventContent={renderEventContent}
            />
        </>
    );
}

function renderEventContent(eventInfo) {
    console.log(eventInfo.event)
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

export default CalendarMain;
import React from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/es-mx';
import { messages } from '../../helpers/calendar-messages';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es');

const localizer = momentLocalizer(moment);

const myEventsList = [
    {
        title: 'Cumpleaños de vero',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate()
    }
];

export const CalendarScreen = () => {
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: '0.8',
            display: 'block',
            color: '#fff'
        }

        return {
            style
        }
    }

    return (
        <>
            <Navbar />

            <div className="myCustomHeight calendar-screen">
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    messages={messages}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
        </>
    )
}

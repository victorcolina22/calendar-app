import React from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const myEventsList = [
    {
        title: 'Cumpleaños de vero',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate()
    }
];

export const CalendarScreen = () => {
    return (
        <>
            <Navbar />

            <div className="myCustomHeight calendar-screen">
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </>
    )
}

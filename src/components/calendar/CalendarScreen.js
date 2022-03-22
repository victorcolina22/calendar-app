import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es-mx';
import { messages } from '../../helpers/calendar-messages';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';

moment.locale('es');

const localizer = momentLocalizer(moment);

const myEventsList = [
    {
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        user: {
            _id: '123',
            name: 'Victor'
        }
    }
];

export const CalendarScreen = () => {
    const [lasView, setLastView] = useState(localStorage.getItem('lastView' || 'month'));

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
    };

    const onDoubleClick = (e) => {
        console.log(e);
    };

    const onSelect = (e) => {
        console.log(e);
    };

    const onViewChange = (view) => {
        setLastView(view);
        localStorage.setItem('lastView', view)
    };

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
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelect}
                    onView={onViewChange}
                    view={lasView}
                    components={{
                        event: CalendarEvent
                    }}
                />
            </div>
        </>
    )
}

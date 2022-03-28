import React, { useState } from 'react';

import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { messages } from '../../helpers/calendar-messages';

import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

import moment from 'moment';
import 'moment/locale/es-mx';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
    const dispatch = useDispatch();

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
        dispatch(uiOpenModal());
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
            <CalendarModal />
        </>
    )
}

import React, { useState } from 'react';

import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { messages } from '../../helpers/calendar-messages';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

import moment from 'moment';
import 'moment/locale/es-mx';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { events } = useSelector(state => state.calendar);

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
        dispatch(eventSetActive(e));
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
                    events={events}
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

                <AddNewFab />

                <CalendarModal />
            </div>
        </>
    )
}

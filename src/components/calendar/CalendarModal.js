import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';

import { customStyles } from '../../helpers/centerModalStyles';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { eventAddNew, eventClearActiveEvent } from '../../actions/events';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = moment().clone().add(2, 'hours'); // El método "clone()" genera una copia de la fecha establecida previamente.

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlusOne.toDate()
}

export const CalendarModal = () => {
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate());

    const [titleValid, setTitleValid] = useState(true)
    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    const inputTitle = useRef();

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }
    }, [activeEvent, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    };

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    };

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
            return;
        };

        if (title.trim().length < 2) {
            setTitleValid(false);
            return;
        }

        dispatch(eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
                _id: '123',
                name: 'Victor'
            }
        }));

        setTitleValid(true);
        closeModal();
    };

    return (

        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className='form-control'
                    />
                </div>

                <div className="form-group mt-2">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={titleValid ? 'form-control eventTitle' : 'form-control eventTitle is-invalid'}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                        ref={inputTitle}
                    />
                    <p
                        className='invalid-text'
                        style={{ display: titleValid ? 'none' : 'block' }}>
                        El título debe ser mayor a 2 carácteres
                    </p>
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mt-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <div className="d-grid">
                    <button
                        type="submit"
                        className="btn btn-outline-primary mt-2"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </div>

            </form>
        </Modal>
    )
};

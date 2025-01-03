import React from 'react';
import { useTypedDispatch, useTypedSelector } from "../../../../hooks/useRedux";
import { setPlanningDays, setPlanningMode, setPlanningName, setPlanningTime } from "../../slice/synchronizationSlice";
import Input from "../../../../UI/Input/Input";
import "./planning.scss";

const Planning: React.FC = () => {
    const dispatch = useTypedDispatch();
    const planningMode = useTypedSelector(state => state.synchronizationSlice.planning.mode);
    const selectedDays = useTypedSelector(state => state.synchronizationSlice.planning.selectedDays);
    const time = useTypedSelector(state => state.synchronizationSlice.planning.time);
    const name = useTypedSelector(state => state.synchronizationSlice.planning.name);

    const handleModeChange = (mode: 'single' | 'recurring') => {
        dispatch(setPlanningMode(mode));
    };

    const handleDayChange = (day: string) => {
        dispatch(setPlanningDays(
            selectedDays.includes(day)
                ? selectedDays.filter(d => d !== day)
                : [...selectedDays, day]
        ));
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPlanningTime(e.target.value));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPlanningName(e.target.value));
    }

    const daysOfWeek = [
        'Каждый понедельник',
        'Каждый вторник',
        'Каждую среду',
        'Каждый четверг',
        'Каждую пятницу',
        'Каждую субботу',
        'Каждое воскресенье'
    ];

    return (
        <div className="planning">
            <div className="planning__mode">
                <div className="planning__item">
                    <input
                        type="radio"
                        name="planningMode"
                        value="single"
                        id='single'
                        checked={planningMode === 'single'}
                        onChange={() => handleModeChange('single')}/>
                    <label htmlFor='single'>Единовременно</label>
                </div>
                <div className="planning__item">
                    <input
                        type="radio"
                        name="planningMode"
                        id='recurring'
                        value="recurring"
                        checked={planningMode === 'recurring'}
                        onChange={() => handleModeChange('recurring')}/>
                    <label htmlFor='recurring'>Многократно</label>
                </div>
                {planningMode === 'recurring' && 
                <Input 
                    value={name}
                    placeholder='Название задачи' 
                    className='planning__name'
                    onChange={handleNameChange}/>}
            </div>

            {planningMode === 'recurring' && (
                <div className="planning__recurring">
                    <div className="planning__days">
                        {daysOfWeek.map(day => (
                            <div key={day} className="planning__days-item">
                                <input
                                    id={day}
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    onChange={() => handleDayChange(day)}/>
                                <label htmlFor={day}>{day}</label>
                            </div>
                        ))}
                    </div>
                    <div className="planning__time">
                        <label>Время:</label>
                        <Input
                            type="time"
                            value={time}
                            onChange={handleTimeChange}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Planning;
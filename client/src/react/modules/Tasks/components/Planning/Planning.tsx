import React from 'react';
import { useTypedDispatch, useTypedSelector } from "../../../../hooks/useRedux";
import { setPlanningDays, setPlanningMode, setPlanningTime } from '../../slice/tasksSlice';
import Input from "../../../../UI/Input/Input";
import "./planning.scss";

const Planning: React.FC = () => {
    const dispatch = useTypedDispatch();
    const planningMode = useTypedSelector(state => state.tasksSlice.planning.mode);
    const selectedDays = useTypedSelector(state => state.tasksSlice.planning.selectedDays);
    const time = useTypedSelector(state => state.tasksSlice.planning.time);

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
                <label>
                    <input
                        type="radio"
                        name="planningMode"
                        value="single"
                        checked={planningMode === 'single'}
                        onChange={() => handleModeChange('single')}
                    />
                    Единовременно
                </label>
                <label>
                    <input
                        type="radio"
                        name="planningMode"
                        value="recurring"
                        checked={planningMode === 'recurring'}
                        onChange={() => handleModeChange('recurring')}
                    />
                    Многократно
                </label>
            </div>

            {planningMode === 'recurring' && (
                <div className="planning__recurring">
                    <div className="planning__days">
                        {daysOfWeek.map(day => (
                            <label key={day}>
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    onChange={() => handleDayChange(day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                    <div className="planning__time">
                        <label>
                            Время:
                            <Input
                                type="time"
                                value={time}
                                onChange={handleTimeChange}
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Planning;
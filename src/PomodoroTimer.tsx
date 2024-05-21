import React, { useState, useEffect } from 'react';
import { useInterval } from 'react-use';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const PomodoroTimer: React.FC = () => {
    const [minutes, setMinutes] = useState<number>(25);
    const [seconds, setSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreak, setIsBreak] = useState<boolean>(false);
    const [customWorkTime, setCustomWorkTime] = useState<number>(25);
    const [customBreakTime, setCustomBreakTime] = useState<number>(5);

    useEffect(() => {
        if (!isActive) {
            setMinutes(isBreak ? customBreakTime : customWorkTime);
            setSeconds(0);
        }
    }, [customWorkTime, customBreakTime, isBreak, isActive]);

    useInterval(() => {
        if (isActive) {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (isBreak) {
                        setMinutes(customWorkTime);
                        setIsBreak(false);
                    } else {
                        setMinutes(customBreakTime);
                        setIsBreak(true);
                    }
                    notifyUser();
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }
    }, isActive ? 1000 : null);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(customWorkTime);
        setSeconds(0);
        setIsBreak(false);
    };

    const notifyUser = () => {
        if (Notification.permission === 'granted') {
            new Notification(isBreak ? 'Break time is over!' : 'Work time is over!');
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(isBreak ? 'Break time is over!' : 'Work time is over!');
                }
            });
        }
    };

    const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomWorkTime(parseInt(e.target.value, 10));
    };

    const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomBreakTime(parseInt(e.target.value, 10));
    };

    return (
        <div className="pomodoro-timer min-h-screen flex items-center justify-center py-12">
            <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
                <h1 className="text-3xl font-semibold text-gray-700 mb-4">Pomodoro Timer</h1>
                <div className={`timer-display text-6xl mb-4 ${isBreak ? 'text-red-500' : 'text-green-500'}`}>
                    <span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
                </div>
                <div className="controls flex justify-center mb-4 space-x-4">
                    <button
                        onClick={toggleTimer}
                        className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                    >
                        {isActive ? <FaPause /> : <FaPlay />}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition duration-300"
                    >
                        <FaRedo />
                    </button>
                </div>
                <div className="settings space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                        <label className="text-gray-600">Work Time:</label>
                        <input
                            type="number"
                            value={customWorkTime}
                            onChange={handleWorkTimeChange}
                            className="w-16 text-center bg-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <label className="text-gray-600">Break Time:</label>
                        <input
                            type="number"
                            value={customBreakTime}
                            onChange={handleBreakTimeChange}
                            className="w-16 text-center bg-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;

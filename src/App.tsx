import React, { useEffect } from 'react';
import PomodoroTimer from './PomodoroTimer';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="app text-center p-6 font-sans bg-gray-100">
      <PomodoroTimer />
    </div>
  );
};

export default App;

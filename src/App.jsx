import React from 'react';
import bgImage from './japan-background-digital-art.jpg';
import { useTime } from './hooks/useTime';
import { useTodos } from './hooks/useTodos';
import { useTimer } from './hooks/useTimer';
import ClockCard from './components/ClockCard';
import QuoteCard from './components/QuoteCard';
import PomodoroTimer from './components/PomodoroTimer';
import TodoList from './components/TodoList';

export default function App() {
  const { currentTime, getGreeting } = useTime();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { 
    timeLeft, 
    isActive, 
    timerMode, 
    switchTimerMode, 
    toggleTimer, 
    resetTimer 
  } = useTimer();

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-700 flex items-center justify-center p-4 md:p-8 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      {/* Main Content */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column: Time & Quotes */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <ClockCard currentTime={currentTime} greeting={getGreeting()} />
          <QuoteCard />
        </div>

        {/* Center Column: Timer */}
        <div className="lg:col-span-4">
          <PomodoroTimer 
            timeLeft={timeLeft}
            isActive={isActive}
            timerMode={timerMode}
            switchTimerMode={switchTimerMode}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
          />
        </div>

        {/* Right Column: Todo List */}
        <div className="lg:col-span-4">
          <TodoList 
            todos={todos}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
import React from 'react';
import CyberpunkBackground from './components/CyberpunkBackground';
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
    <div className="min-h-screen text-cyan-50 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Cyberpunk Background */}
      <CyberpunkBackground />
      
      {/* Heavy Overlay for contrast */}
      {/* <div className="absolute inset-0 bg-black/40 pointer-events-none"></div> */}

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
          background-color: #164e63;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
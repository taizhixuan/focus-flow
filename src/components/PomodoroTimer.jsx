import React from 'react';
import { Brain, Coffee, RotateCcw, Play, Pause } from 'lucide-react';

export default function PomodoroTimer({ 
  timeLeft, 
  isActive, 
  timerMode, 
  switchTimerMode, 
  toggleTimer, 
  resetTimer 
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* 模式切换 Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-full mb-12 w-full max-w-xs">
        {[
          { id: 'focus', label: '专注', icon: Brain, min: 25 },
          { id: 'short', label: '短休', icon: Coffee, min: 5 },
          { id: 'long', label: '长休', icon: Coffee, min: 15 },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => switchTimerMode(mode.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              timerMode === mode.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <mode.icon size={14} />
            {mode.label}
          </button>
        ))}
      </div>

      {/* 倒计时圆环 (模拟) */}
      <div className="relative mb-12">
        <div className={`text-7xl font-mono font-bold tracking-tighter transition-colors duration-500 ${isActive ? 'text-indigo-600' : 'text-slate-700'}`}>
          {formatTime(timeLeft)}
        </div>
        {isActive && (
          <div className="absolute -right-4 top-0 animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center gap-6">
        <button 
          onClick={resetTimer}
          className="p-4 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
          title="重置"
        >
          <RotateCcw size={24} />
        </button>

        <button 
          onClick={toggleTimer}
          className={`p-6 rounded-[2rem] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-white flex items-center justify-center ${
            isActive ? 'bg-amber-500' : 'bg-indigo-600'
          }`}
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      {/* 状态提示文字 */}
      <p className="mt-8 text-slate-400 text-sm">
        {isActive ? '保持专注...' : '准备好了吗？'}
      </p>

    </div>
  );
}

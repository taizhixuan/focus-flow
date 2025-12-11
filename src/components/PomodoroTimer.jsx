import React from 'react';
import { Brain, Coffee, RotateCcw, Play, Pause } from 'lucide-react';

import { useSound } from '../hooks/useSound';

export default function PomodoroTimer({ 
  timeLeft, 
  isActive, 
  timerMode, 
  switchTimerMode, 
  toggleTimer, 
  resetTimer 
}) {
  const { playSound } = useSound();

  const handleModeSwitch = (id) => {
    playSound('click');
    switchTimerMode(id);
  };

  const handleReset = () => {
    playSound('delete');
    resetTimer();
  };

  const handleToggle = () => {
    if (!isActive) playSound('start');
    else playSound('click');
    toggleTimer();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-2xl shadow-[0_0_15px_rgba(0,243,255,0.1)] border border-cyan-500/30 h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* 模式切换 Tabs */}
      <div className="flex bg-black/40 p-1 rounded-lg mb-12 w-full max-w-xs border border-cyan-500/20">
        {[
          { id: 'focus', label: 'FOCUS', icon: Brain, min: 25 },
          { id: 'short', label: 'SHORT', icon: Coffee, min: 5 },
          { id: 'long', label: 'LONG', icon: Coffee, min: 15 },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeSwitch(mode.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-md transition-all duration-300 tracking-wider ${
              timerMode === mode.id
                ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,243,255,0.2)] border border-cyan-500/50'
                : 'text-slate-500 hover:text-cyan-200 hover:bg-white/5'
            }`}
          >
            <mode.icon size={14} />
            {mode.label}
          </button>
        ))}
      </div>

      {/* 倒计时圆环 (模拟) */}
      <div className="relative mb-12">
        <div className={`text-7xl font-mono font-bold tracking-tighter transition-colors duration-500 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_20px_rgba(0,243,255,0.6)]' : 'text-slate-200'}`}>
          {formatTime(timeLeft)}
        </div>
        {isActive && (
          <div className="absolute -right-4 top-0 animate-pulse w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f3ff]"></div>
        )}
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center gap-6">
        <button 
          onClick={handleReset}
          className="p-4 rounded-full text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/20"
          title="重置"
        >
          <RotateCcw size={24} />
        </button>

        <button 
          onClick={handleToggle}
          className={`p-6 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 text-black flex items-center justify-center font-bold ${
            isActive ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]' : 'bg-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.5)]'
          }`}
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      {/* 状态提示文字 */}
      <p className="mt-8 text-cyan-500/60 text-xs font-mono tracking-widest uppercase">
        {isActive ? 'SYSTEM :: FOCUSED' : 'SYSTEM :: READY'}
      </p>

    </div>
  );
}

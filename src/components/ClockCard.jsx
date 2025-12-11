import React from 'react';
import { Zap } from 'lucide-react';

export default function ClockCard({ currentTime, greeting }) {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('zh-CN', options);
  };

  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_15px_rgba(0,243,255,0.1)] border border-cyan-500/30 flex flex-col justify-between h-48 hover:shadow-[0_0_25px_rgba(0,243,255,0.3)] transition-all duration-300 group">
      <div>
        <p className="text-cyan-400/80 text-sm font-code mb-1 tracking-wider uppercase">
          {formatDate(currentTime)}
        </p>
        <h1 className="text-5xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
          {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </h1>
      </div>
      <div className="flex items-center gap-2 text-cyan-300 bg-cyan-950/50 w-fit px-3 py-1 rounded-sm text-xs font-bold border border-cyan-500/50 uppercase tracking-widest">
        <Zap size={14} />
        {greeting}
      </div>
    </div>
  );
}

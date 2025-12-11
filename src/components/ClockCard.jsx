import React from 'react';
import { Zap } from 'lucide-react';

export default function ClockCard({ currentTime, greeting }) {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('zh-CN', options);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between h-48 hover:shadow-md transition-shadow duration-300">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{formatDate(currentTime)}</p>
        <h1 className="text-5xl font-bold tracking-tight text-slate-800">
          {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </h1>
      </div>
      <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 w-fit px-3 py-1 rounded-full text-xs font-semibold">
        <Zap size={14} />
        {greeting}
      </div>
    </div>
  );
}

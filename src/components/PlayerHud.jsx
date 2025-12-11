import React from 'react';
import { Shield, Zap, TrendingUp, Cpu } from 'lucide-react';

export default function PlayerHud({ level, rank, xp, nextLevelXP, progress }) {
  return (
    <div className="lg:col-span-12 bg-black/80 backdrop-blur-xl rounded-2xl p-4 shadow-[0_0_20px_rgba(0,243,255,0.15)] border border-cyan-500/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      
      {/* Decorative Scan Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-pulse"></div>

      {/* Avatar / Level Info */}
      <div className="flex items-center gap-4 z-10">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-cyan-950 flex items-center justify-center border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.5)]">
            <Cpu size={32} className="text-cyan-200" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-black text-cyan-400 text-xs font-bold px-2 py-0.5 rounded border border-cyan-500">
            LVL {level}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
            {rank}
            <Shield size={16} className="text-cyan-500" />
          </h2>
          <p className="text-cyan-500/60 text-xs font-mono">ID: USER_001 // SYSTEM_ONLINE</p>
        </div>
      </div>

      {/* XP Progress */}
      <div className="flex-1 w-full max-w-2xl flex flex-col gap-2 z-10">
        <div className="flex justify-between text-xs font-bold font-mono text-cyan-300">
          <span className="flex items-center gap-1"><Zap size={12} /> XP: {xp}</span>
          <span>NEXT LEVEL: {nextLevelXP}</span>
        </div>
        <div className="w-full h-3 bg-cyan-950/50 rounded-full overflow-hidden border border-cyan-500/20 relative">
          <div 
            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.5)] transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
          {/* Glitch overlay */}
          <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

      {/* Stats (Placeholder for streaks/etc later) */}
      <div className="hidden md:flex gap-4 text-center z-10">
        <div className="bg-cyan-950/30 p-2 rounded border border-cyan-500/10">
           <div className="text-cyan-400 font-bold text-lg">Active</div>
           <div className="text-[10px] text-cyan-600 uppercase tracking-wider">Status</div>
        </div>
      </div>
      
    </div>
  );
}

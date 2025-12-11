import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const QUOTES = [
  "种一棵树最好的时间是十年前，其次是现在。",
  "你必须非常努力，才能看起来毫不费力。",
  "不要假装努力，结果不会陪你演戏。",
  "星光不问赶路人，时光不负有心人。",
  "每一个不曾起舞的日子，都是对生命的辜负。",
  "将来的你，一定会感谢现在拼命的自己。",
  "自律给我自由。",
  "很多事情不是因为有希望才坚持，而是坚持了才有希望。",
  "知足且上进，温柔而坚定。",
  "路虽远，行则将至；事虽难，做则必成。"
];

export default function QuoteCard() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { playSound } = useSound();

  const nextQuote = () => {
    playSound('click');
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/80 to-black backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_15px_rgba(189,0,255,0.2)] border border-purple-500/30 text-white flex flex-col justify-between flex-1 min-h-[200px] relative overflow-hidden group hover:border-purple-500/60 transition-colors">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="opacity-80 text-xs font-bold tracking-[0.2em] mb-4 flex items-center gap-2 text-purple-300 uppercase">
          <span>Daily Transmission</span>
          <div className="h-px w-8 bg-purple-500"></div>
        </div>
        <p className="text-xl md:text-2xl font-mono leading-relaxed text-slate-100 drop-shadow-md">
          "{QUOTES[quoteIndex]}"
        </p>
      </div>
      
      <button 
        onClick={nextQuote}
        className="relative z-10 self-end mt-4 p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 text-purple-300"
        title="Refresh Data"
      >
        <RefreshCw size={18} />
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

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

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500/90 to-purple-600/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg text-white flex flex-col justify-between flex-1 min-h-[200px] relative overflow-hidden group">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-400 opacity-20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="opacity-80 text-sm font-medium mb-4 flex items-center gap-2">
          <span>每日灵感</span>
          <div className="h-px w-8 bg-white/40"></div>
        </div>
        <p className="text-xl md:text-2xl font-serif leading-relaxed">
          "{QUOTES[quoteIndex]}"
        </p>
      </div>
      
      <button 
        onClick={nextQuote}
        className="relative z-10 self-end mt-4 p-2 hover:bg-white/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
        title="换一句"
      >
        <RefreshCw size={18} />
      </button>
    </div>
  );
}

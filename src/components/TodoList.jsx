import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Circle, 
  Trash2, 
  AlertCircle, 
  Briefcase, 
  User, 
  BookOpen, 
  Code2, 
  Layers,
  Filter,
  X
} from 'lucide-react';
import { useSound } from '../hooks/useSound';

const PRIORITY_STYLES = {
  high: {
    color: 'text-red-400',
    border: 'border-red-500/50',
    hover: 'hover:bg-red-950/30',
    active: 'bg-red-500 text-black shadow-lg shadow-red-500/20'
  },
  medium: {
    color: 'text-amber-400',
    border: 'border-amber-500/50',
    hover: 'hover:bg-amber-950/30',
    active: 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
  },
  low: {
    color: 'text-emerald-400',
    border: 'border-emerald-500/50',
    hover: 'hover:bg-emerald-950/30',
    active: 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
  }
};

const CategoryIcon = ({ cat, className }) => {
  switch(cat) {
    case 'work': return <Briefcase size={14} className={className} />;
    case 'personal': return <User size={14} className={className} />;
    case 'study': return <BookOpen size={14} className={className} />;
    case 'dev': return <Code2 size={14} className={className} />;
    default: return <Layers size={14} className={className} />;
  }
};

export default function TodoList({ todos, addTodo, toggleTodo, deleteTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('work');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed', 'work', 'personal', 'study', 'dev'
  const [showFilters, setShowFilters] = useState(false);
  
  const { playSound } = useSound();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    playSound('start');
    addTodo(inputValue, priority, category);
    setInputValue('');
  };

  const handleToggle = (id) => {
    playSound('success');
    toggleTodo(id);
  };

  const handleDelete = (id) => {
    playSound('delete');
    deleteTodo(id);
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return t.category === filter;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-2xl shadow-[0_0_15px_rgba(0,243,255,0.1)] border border-cyan-500/30 h-full p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wider">
          <Layers className="text-cyan-400" size={20} />
          Missions
        </h2>
        
        <div className="flex gap-2 items-center">
           <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded-md transition-colors ${filter !== 'all' || showFilters ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:bg-white/5'}`}
            title="Filter Missions"
           >
             <Filter size={16} />
           </button>
           <span className="text-xs font-mono font-bold bg-cyan-950/50 text-cyan-300 px-2 py-1 rounded-sm border border-cyan-500/30">
            {activeCount} ACT
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="mb-4 flex flex-wrap gap-2 p-2 bg-white/5 rounded-lg animate-in slide-in-from-top-2 fade-in duration-200">
           {['all', 'active', 'completed', 'work', 'personal', 'study', 'dev'].map(f => (
             <button
              key={f}
              onClick={() => { playSound('hover'); setFilter(f); }}
              className={`text-xs px-2 py-1 rounded capitalize transition-all border ${
                filter === f 
                  ? 'bg-cyan-500 text-black border-cyan-500 font-bold shadow-[0_0_10px_rgba(0,243,255,0.3)]' 
                  : 'text-slate-400 border-transparent hover:border-white/10 hover:text-cyan-200'
              }`}
             >
               {f}
             </button>
           ))}
        </div>
      )}

      {/* Modern Input Zone */}
      <form onSubmit={handleSubmit} className="relative mb-6 flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="New Mission Objective..."
            className="w-full pl-4 pr-12 py-3 bg-black/40 border-transparent focus:bg-black/60 border focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] focus:ring-0 rounded-lg transition-all outline-none text-sm text-cyan-50 placeholder:text-cyan-900/50 font-mono"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 p-1.5 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 hover:shadow-[0_0_10px_rgba(0,243,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputValue.trim()}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Controls Row */}
        <div className="flex gap-4">
          {/* Priority Select */}
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded border border-white/5">
            {['low', 'medium', 'high'].map(p => {
               const style = PRIORITY_STYLES[p];
               const isActive = priority === p;
               return (
                <button
                  key={p}
                  type="button"
                  onClick={() => { playSound('click'); setPriority(p); }}
                  className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                    isActive ? style.active : `${style.color} ${style.hover}`
                  }`}
                  title={`Priority: ${p}`}
                >
                  <AlertCircle size={12} />
                </button>
              );
            })}
          </div>

          {/* Category Select */}
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded border border-white/5 flex-1 overflow-x-auto custom-scrollbar">
            {['work', 'personal', 'study', 'dev'].map(c => (
              <button
                key={c}
                type="button"
                onClick={() => { playSound('click'); setCategory(c); }}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all border ${
                  category === c 
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.3)]' 
                    : 'text-slate-500 border-transparent hover:text-cyan-200'
                }`}
              >
                <CategoryIcon cat={c} />
                {c}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* 列表区域 */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {filteredTodos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-cyan-900/50 text-xs font-mono gap-2">
            <div className="w-12 h-12 bg-cyan-900/20 rounded-full flex items-center justify-center border border-cyan-500/10">
              <Filter size={24} className="opacity-50 text-cyan-700" />
            </div>
            <p className="uppercase tracking-widest">No Missions Found</p>
            {filter !== 'all' && (
              <button 
                onClick={() => setFilter('all')}
                className="text-cyan-400 hover:text-cyan-300 underline mt-2"
              >
                Clear Filter
              </button>
            )}
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredTodos.map(todo => (
              <li 
                key={todo.id} 
                className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 border relative overflow-hidden ${
                  todo.completed 
                    ? 'bg-black/30 border-transparent opacity-50' 
                    : `bg-cyan-950/10 border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,243,255,0.05)]`
                }`}
              >
                {/* Priority Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  todo.priority === 'high' ? 'bg-red-500/80 shadow-[0_0_5px_#ef4444]' : 
                  todo.priority === 'medium' ? 'bg-amber-500/80' : 'bg-emerald-500/80'
                }`}></div>

                <button 
                  onClick={() => handleToggle(todo.id)}
                  className={`flex-shrink-0 ml-2 transition-colors ${todo.completed ? 'text-cyan-700' : 'text-cyan-500/50 hover:text-cyan-400'}`}
                >
                  {todo.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm truncate transition-all font-mono ${todo.completed ? 'text-cyan-900 line-through decoration-cyan-900' : 'text-cyan-100'}`}>
                      {todo.text}
                    </span>
                    {todo.priority === 'high' && !todo.completed && (
                       <AlertCircle size={12} className="text-red-500 animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <span className="flex items-center gap-1 text-[10px] text-cyan-600/60 uppercase font-bold tracking-wider">
                       <CategoryIcon cat={todo.category || 'general'} className="opacity-70" />
                       {todo.category || 'general'}
                     </span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-cyan-900 hover:text-red-500 transition-all p-1"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

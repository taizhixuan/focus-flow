import React, { useState } from 'react';
import { CheckCircle2, Plus, Circle, Trash2 } from 'lucide-react';

export default function TodoList({ todos, addTodo, toggleTodo, deleteTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 h-full p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="text-emerald-500" size={20} />
          今日任务
        </h2>
        <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
          {todos.filter(t => t.completed).length}/{todos.length}
        </span>
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="relative mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加一个新任务..."
          className="w-full pl-4 pr-12 py-3 bg-slate-50 border-transparent focus:bg-white border focus:border-indigo-500 focus:ring-0 rounded-xl transition-all outline-none text-sm placeholder:text-slate-400"
        />
        <button 
          type="submit"
          className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!inputValue.trim()}
        >
          <Plus size={18} />
        </button>
      </form>

      {/* 列表区域 */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {todos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
              <CheckCircle2 size={24} className="opacity-20" />
            </div>
            <p>暂无任务，享受当下吧</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.map(todo => (
              <li 
                key={todo.id} 
                className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  todo.completed ? 'bg-slate-50/50' : 'bg-white hover:bg-slate-50 border border-slate-100/50 hover:border-slate-200'
                }`}
              >
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 transition-colors ${todo.completed ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-500'}`}
                >
                  {todo.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                </button>
                
                <span className={`flex-1 text-sm truncate transition-all ${todo.completed ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700'}`}>
                  {todo.text}
                </span>

                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all p-1"
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

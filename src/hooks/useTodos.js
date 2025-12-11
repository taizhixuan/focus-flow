import { useState, useEffect } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('focusflow_todos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('focusflow_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority = 'medium', category = 'general') => {
    if (!text.trim()) return;
    setTodos([...todos, { 
      id: Date.now(), 
      text, 
      completed: false,
      priority, // 'high', 'medium', 'low'
      category // 'work', 'personal', 'study', 'dev'
    }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
}

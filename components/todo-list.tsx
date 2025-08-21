'use client'

import { useState, useTransition } from 'react';
import { addTodoAction, toggleTodoAction, deleteTodoAction } from '@/app/actions/todos';
import type { Todo } from '@/lib/todos';

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [isPending, startTransition] = useTransition();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = async (formData: FormData) => {
    const text = formData.get('text') as string;
    if (!text.trim()) return;
    
    setNewTodo('');
    startTransition(() => {
      addTodoAction(text);
    });
  };

  const handleToggle = (id: number, completed: boolean) => {
    startTransition(() => {
      toggleTodoAction(id, !completed);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(() => {
      deleteTodoAction(id);
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <form action={handleAddTodo} className="flex gap-2">
        <input
          type="text"
          name="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !newTodo.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '...' : 'Add'}
        </button>
      </form>

      <div className="space-y-2">
        {initialTodos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 border rounded-md ${
              todo.completed ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id, todo.completed)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              disabled={isPending}
            />
            <span
              className={`flex-1 ${
                todo.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-900'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              disabled={isPending}
              className="px-2 py-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
            >
              ×
            </button>
          </div>
        ))}
        
        {initialTodos.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No todos yet. Add one above! 📝
          </p>
        )}
      </div>

      {isPending && (
        <div className="text-center text-sm text-gray-500">
          Updating...
        </div>
      )}
    </div>
  );
}
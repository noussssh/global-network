'use server'

import { addTodo, toggleTodo, deleteTodo } from '@/lib/todos';
import { revalidatePath } from 'next/cache';

export async function addTodoAction(text: string) {
  if (!text.trim()) {
    throw new Error('Todo text cannot be empty');
  }
  
  const todo = await addTodo(text.trim());
  if (!todo) {
    throw new Error('Failed to add todo');
  }
  
  revalidatePath('/');
  return todo;
}

export async function toggleTodoAction(id: number, completed: boolean) {
  const success = await toggleTodo(id, completed);
  if (!success) {
    throw new Error('Failed to toggle todo');
  }
  
  revalidatePath('/');
}

export async function deleteTodoAction(id: number) {
  const success = await deleteTodo(id);
  if (!success) {
    throw new Error('Failed to delete todo');
  }
  
  revalidatePath('/');
}
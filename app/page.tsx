import { getTodos } from '@/lib/todos';
import TodoList from '@/components/todo-list';

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Global Network Todo App
          </h1>
          <p className="text-gray-600">
            A demo todo list powered by Next.js and Turso (Cloud SQLite)
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">My Todos</h2>
          <TodoList initialTodos={todos} />
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>✨ Data stored in Turso Cloud SQLite database</p>
          <p>🚀 Built with Next.js 15 App Router</p>
        </div>
      </main>
    </div>
  );
}

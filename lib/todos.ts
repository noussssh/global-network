import turso from './db';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export async function createTodosTable() {
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  await turso.execute(`
    CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed)
  `);
}

export async function getTodos(): Promise<Todo[]> {
  try {
    await createTodosTable();
    const result = await turso.execute('SELECT * FROM todos ORDER BY created_at DESC');
    return result.rows.map(row => ({
      id: row.id as number,
      text: row.text as string,
      completed: Boolean(row.completed),
      created_at: row.created_at as string,
      updated_at: row.updated_at as string,
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}

export async function addTodo(text: string): Promise<Todo | null> {
  try {
    await createTodosTable();
    const result = await turso.execute({
      sql: 'INSERT INTO todos (text) VALUES (?) RETURNING *',
      args: [text]
    });
    const row = result.rows[0];
    if (row) {
      return {
        id: row.id as number,
        text: row.text as string,
        completed: Boolean(row.completed),
        created_at: row.created_at as string,
        updated_at: row.updated_at as string,
      };
    }
    return null;
  } catch (error) {
    console.error('Error adding todo:', error);
    return null;
  }
}

export async function toggleTodo(id: number, completed: boolean): Promise<boolean> {
  try {
    await turso.execute({
      sql: 'UPDATE todos SET completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [completed, id]
    });
    return true;
  } catch (error) {
    console.error('Error toggling todo:', error);
    return false;
  }
}

export async function deleteTodo(id: number): Promise<boolean> {
  try {
    await turso.execute({
      sql: 'DELETE FROM todos WHERE id = ?',
      args: [id]
    });
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    return false;
  }
}
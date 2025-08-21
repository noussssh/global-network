import turso from "@/lib/db";

interface TableRow {
  name: string;
  [key: string]: unknown;
}

export default async function TestDBPage() {
  try {
    // Test database connection
    const result = await turso.execute("SELECT 'Hello from Turso!' as message");
    
    // Test tables exist
    const tables = await turso.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `);
    
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-green-50">
            <h2 className="text-lg font-semibold text-green-800">Connection Status</h2>
            <p className="text-green-700">✅ Successfully connected to Turso database</p>
            <p className="text-sm text-gray-600">Message: {String(result.rows[0].message)}</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Database Tables</h2>
            {tables.rows.length > 0 ? (
              <ul className="space-y-1">
                {tables.rows.map((table, index: number) => (
                  <li key={index} className="text-sm text-gray-700">
                    📋 {String((table as unknown as TableRow).name)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tables found</p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>
        <div className="p-4 border rounded-lg bg-red-50">
          <h2 className="text-lg font-semibold text-red-800">Connection Error</h2>
          <p className="text-red-700">❌ Failed to connect to database</p>
          <pre className="text-xs text-gray-600 mt-2 overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
}
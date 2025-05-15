import mysql from 'mysql2/promise';

export async function POST(request) {
  try {
    const body = await request.json();
const { name, email, tel, salary, status } = body;

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const [result] = await connection.execute(
  'INSERT INTO employee (Name, Email, TEL, Salary, Status) VALUES (?, ?, ?, ?, ?)',
  [name, email, tel, salary, status]
    );

    await connection.end();

    return new Response(JSON.stringify({ message: 'Employee added', id: result.insertId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
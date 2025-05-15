import mysql from 'mysql2/promise';

export async function POST(req) {
  try {
    const body = await req.json();
    const { ID, Name, Email, TEL, Salary, Status } = body;

    // เชื่อมต่อฐานข้อมูล
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, // เปลี่ยนตรงนี้
    });

    // อัปเดตข้อมูล
    const [result] = await connection.execute(
      'UPDATE employee SET Name=?, Email=?, TEL=?, Salary=?, Status=? WHERE ID=?',
      [Name, Email, TEL, Salary, Status, ID]
    );

    await connection.end();

    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
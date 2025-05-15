// src/app/api/add-product/route.js
import mysql from 'mysql2/promise';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, amount } = body;

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [result] = await db.execute(
      'INSERT INTO products (name, price, amount) VALUES (?, ?, ?)',
      [name, price, amount]
    );

    await db.end();

    return new Response(JSON.stringify({ message: 'เพิ่มสินค้าเรียบร้อยแล้ว', result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  
  } catch (err) {
    console.error('Error inserting product:', err);
    return new Response(JSON.stringify({ error: 'ไม่สามารถเพิ่มสินค้าลงฐานข้อมูลได้' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

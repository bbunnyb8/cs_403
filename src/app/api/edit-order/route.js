import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME // เปลี่ยนตรงนี้
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const order_id = formData.get('order_id');
    const status = formData.get('status');

    if (!order_id || !status) {
      return NextResponse.json({ success: false, error: 'Missing order_id or status' }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'UPDATE orders SET status = ? WHERE order_id = ?',
      [status, order_id]
    );
    await connection.end();

    return NextResponse.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
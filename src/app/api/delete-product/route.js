// app/api/delete-product/route.js
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// สร้าง connection ไปยังฐานข้อมูลของคุณ
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export async function DELETE(req) {
  try {
    const contentLength = req.headers.get('content-length');
    if (!contentLength || parseInt(contentLength) === 0) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    const body = await req.json();
    const { product_id } = body;

    if (!product_id) {
      return NextResponse.json({ error: 'Missing product_id' }, { status: 400 });
    }

    const conn = await mysql.createConnection(dbConfig);

    const [result] = await conn.execute(
      'DELETE FROM products WHERE product_id = ?',
      [product_id]
    );

    await conn.end();

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Invalid or malformed JSON' }, { status: 400 });
  }
}


import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const form = await req.formData();
  const product_id = form.get("product_id"); // รับ product_id
  const name = form.get("name");
  const price = form.get("price");
  const amount = form.get("amount");

  console.log("Received:", { product_id, name, price, amount });

  if (!product_id || !name || !price || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const query = `
      UPDATE products
      SET name = ?, price = ?, amount = ?
      WHERE product_id = ?
    `;
    const values = [name, parseFloat(price), parseInt(amount), product_id];

    const [result] = await connection.execute(query, values);
    await connection.end();

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

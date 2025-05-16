import mysql from 'mysql2/promise';

export async function POST(request) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const body = await request.json();
    const { items, total_price, user_id } = body;
    // items: [{ id: product_id, quantity, price }]
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No items' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connection.beginTransaction();

    // 1. Insert order
    const [orderResult] = await connection.execute(
      'INSERT INTO `orders` (total_amount, total_price, user_id, status, date) VALUES (?, ?, ?, ?, NOW())',
      [
        items.reduce((sum, item) => sum + item.quantity, 0),
        total_price,
        user_id || null,
        'pending',
      ]
    );
    const order_id = orderResult.insertId;

    // 2. Insert order_item & update product stock
    for (const item of items) {
      await connection.execute(
        'INSERT INTO order_items (order_id, product_id, amount, total_price) VALUES (?, ?, ?, ?)',
        [order_id, item.id, item.quantity, item.price * item.quantity]
      );
      // หัก stock
      await connection.execute(
        'UPDATE products SET amount = amount - ? WHERE product_id = ? AND amount >= ?',
        [item.quantity, item.id, item.quantity]
      );
    }

    await connection.commit();
    await connection.end();

    return new Response(JSON.stringify({ success: true, order_id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await connection.rollback();
    await connection.end();
    console.error('Order error:', err);
    return new Response(JSON.stringify({ error: 'Order failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
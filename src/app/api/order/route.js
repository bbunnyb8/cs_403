import { db } from '@/lib/db';

export async function GET() {
    try {
    const [rows] = await db.query(`
        SELECT 
        orders.order_id,
        orders.user_id,
        users.name AS name,
        orders.date,
        orders.total_amount,
        orders.total_price,
        orders.status
        FROM orders
        JOIN users ON orders.user_id = users.user_id
    `);
    return new Response(JSON.stringify(rows), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

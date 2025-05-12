import { db } from '@/lib/db';

export async function GET() {
    try {
    const [rows] = await db.query('SELECT * FROM products');
    return new Response(JSON.stringify(rows), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

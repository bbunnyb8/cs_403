import mysql from 'mysql2/promise'

export async function POST(req) {
    try {
    const { username, password } = await req.json()

    const connection = await mysql.createConnection({
        host: 'localhost',
      user: 'root',  // <-- เปลี่ยนเป็นชื่อจริงของ user
      password: '12345678',  // <-- รหัสผ่านของ MySQL user
      database: 'be_luna'    // <-- ชื่อ database ที่ใช้
    })

    const [rows] = await connection.execute(
      'SELECT * FROM login WHERE user = ? AND pass = ?',
        [username, password]
    )

    await connection.end()

    if (rows.length > 0) {
        return Response.json({ success: true })
    } else {
        return Response.json({ success: false }, { status: 401 })
    }

    } catch (err) {
    console.error('API login error:', err)
    return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    })
    }
}

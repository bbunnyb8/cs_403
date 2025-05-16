import mysql from 'mysql2/promise'

export async function POST(req) {
    try {
    const { username, password } = await req.json()

    // ✅ Log ค่าที่รับมาจากหน้า Login
    console.log('📥 Received login request')
    console.log('🧑 Username:', username)
    console.log('🔒 Password:', password)

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',     // แก้ให้ตรงกับ phpMyAdmin ของคุณ
        password: '12345678',     // แก้ให้ตรง
        database: 'be_luna'
    })

    console.log('✅ Connected to MySQL')

    const [rows] = await connection.execute(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password]
    )

    console.log('🔎 Query Result:', rows)

    await connection.end()

    if (rows.length > 0) {
        // ส่ง user_id กลับไปด้วย
        return Response.json({ success: true, user_id: rows[0].user_id })
    } else {
        return Response.json({ success: false }, { status: 401 })
    }

    } catch (err) {
    console.error('❌ API login error:', err)
    return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    })
    }
}

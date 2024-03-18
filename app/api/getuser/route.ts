import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
    let db;
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id'); // Получение ID из query параметров

        if (!id) {
            // Если ID не предоставлен, возвращаем сообщение об ошибке
            return NextResponse.json({ error: 'Необходимо указать ID пользователя' }, { status: 400 });
        }

        db = await pool.getConnection();
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);

        // Утверждение, что rows является массивом RowDataPacket[]
        const dataRows = rows as RowDataPacket[];

        if (dataRows.length === 0) {
            // Если пользователь с таким ID не найден
            return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
        }

        return NextResponse.json(dataRows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
    } finally {
        if (db) {
            db.release();
        }
    }
}

import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';

export async function PATCH(req: NextRequest) {
  let db;
  try {
    const body = await req.json();
    // Извлекаем sumMinus вместе с другими полями
    const { id, status_payment, balance: sumMinus } = body;

    if (!id || !status_payment || sumMinus === undefined) {
      return new Response(JSON.stringify({ error: 'Необходимы ID, status_payment и sumMinus' }), { status: 400 });
    }

    db = await pool.getConnection();

    // Предполагаем, что balance не может быть отрицательным. Добавляем проверку для этого.
    const checkBalanceQuery = 'SELECT balance FROM users WHERE id = ?';
    const [balanceResult] = await db.execute(checkBalanceQuery, [id]);

    if (balanceResult.length > 0 && balanceResult[0].balance >= sumMinus) {
      const updateQuery = 'UPDATE users SET status_payment = ?, balance = balance - ? WHERE id = ?';
      const [result] = await db.execute(updateQuery, [status_payment, sumMinus, id]);
      
      db.release();

      if (result.affectedRows > 0) {
        return new Response(JSON.stringify({ success: true, message: 'Статус оплаты и баланс успешно обновлены.' }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: 'Пользователь не найден.' }), { status: 404 });
      }
    } else {
      db.release();
      return new Response(JSON.stringify({ error: 'Недостаточно средств на счете или пользователь не найден.' }), { status: 400 });
    }
  } catch (error) {
    console.error('Ошибка при обновлении статуса оплаты и баланса:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера.' }), { status: 500 });
  } finally {
    if (db) {
      db.release();
    }
  }
}

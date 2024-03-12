// // app/api/brands.ts

import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';
import { RowDataPacket } from 'mysql2';

export async function GET() {
    let db;
    try {
        db = await pool.getConnection();
        const query = 'SELECT * FROM brands_generation';
        const [rows] = await db.execute(query);

        // Утверждение, что rows является массивом RowDataPacket[]
        const dataRows = rows as RowDataPacket[];

        // Преобразование результатов запроса
        const transformedRows = dataRows.map(row => ({
            Tech: row.Tech, 
            CasinoBrand: row["Casino Brand"],
            CurrentStatus: row["Current Status"],
            Sandbox: row["Sandbox"],
            GEO: row["GEO"],
            OurOfferContent: row["Our offer content"],
            GoBig: row["gobig"],
            Weight: row["вес"],
            LinkImg: row["Link img"],
            Segment2: row["Segment2"],
            FirstPriority: row["Первый приоритет"],
            Trendsetting: row["Trendsetting"],
            Hottest: row["Hottest"],
            QuickSignUp: row["Quick Sign-Up"],
            Video: row["Video"],
            id_brand: row["id_brand"],
            review: row["review"],
            categories: row["categories"],
            categories_value: row["categories_value"],
            WithdrawalLimits: row["WithdrawalLimits"],
            advantages: row["advantages"],
            DepositMethods: row["DepositMethods"],
            WithdrawalMethods: row["WithdrawalMethods"],
            RestrictedCountries: row["RestrictedCountries"]
        }))
        return NextResponse.json(transformedRows);
      } catch (error) {
        return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
          // return NextResponse.json({ error: error.message || 'Ошибка при получении данных' }, { status: 500 });
      } finally {
          if (db) {
              db.release();
          }
      }
  }


//         const transformedRows = rows.map(row => ({
//             Tech: row.Tech, 
//             CasinoBrand: row["Casino Brand"],
//             CurrentStatus: row["Current Status"],
//             Sandbox: row["Sandbox"],
//             InteractionType: row["Interaction Type"],
//             GEO: row["GEO"],
//             Localization: row["Localization"],
//             Shortcomings: row["Shortcomings"],
//             DateOfLastChange: row["Date of Last Change"],
//             TypeOfDeal: row["The type of a deal"],
//             CPA: row["CPA"],
//             RS: row["RS"],
//             BL: row["BL"],
//             BN: row["BN"],
//             BonusType: row["Bonus type"],
//             Segment: row["Segment"],
//             DepositBonusPercentage: row["Deposit bonus, %"],
//             MaxBonus: row["Max bonus"],
//             FreeSpins: row["Free spins"],
//             Wager: row["Wager"],
//             MinDeposit: row["Min deposit"],
//             Vta: row["В-та"],
//             OfferContent: row["Offer content"],
//             OurOfferContent: row["Our offer content"],
//             AffiliateLink: row["Affiliate Link"],
//             Reg2Dep: row["reg2dep"],
//             GoBig: row["gobig"],
//             Weight: row["вес"],
//             Count: row["count"],
//             LinkImg: row["Link img"],
//             CasinoBrand1: row["Casino brand 1"],
//             KeitaroGoBigID: row["keitaro gobig ID"],
//             KeitaroR2dID: row["keitaro r2d ID"],
//             Postback: row["postback"],
//             Segment2: row["Segment2"],
//             FirstPriority: row["Первый приоритет"],
//             Trendsetting: row["Trendsetting"],
//             Hottest: row["Hottest"],
//             QuickSignUp: row["Quick Sign-Up"],
//             Video: row["Video"],
//             id_brand: row["id_brand"],
//             review: row["review"],
//             categories: row["categories"],
//             categories_value: row["categories_value"],
//             WithdrawalLimits: row["WithdrawalLimits"],
//             advantages: row["advantages"],
//             DepositMethods: row["DepositMethods"],
//             WithdrawalMethods: row["WithdrawalMethods"],
//             RestrictedCountries: row["RestrictedCountries"]
//         }))


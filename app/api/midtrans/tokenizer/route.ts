import { NextResponse } from "next/server";

const Midtrans = require('midtrans-client');

let snap = new Midtrans.Snap({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SECRET_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
})

export async function POST(request: Request) {
    const { id, campaignId, campaignName, amount } = await request.json();


    let parameter = {
        // item_details: [{
        //     id: campaignId,
        //     name: campaignName,
        //     price: amount,
        //     quantity: 1,
        // }],
        transaction_details: {
            order_id: id,
            gross_amount: amount,
        }
    }

    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json({token});
}
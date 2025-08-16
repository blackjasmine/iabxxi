import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { id, email } = body;

    const token = jwt.sign(
        {id: id, email: email},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );

    return NextResponse.json({token});
}
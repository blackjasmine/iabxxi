'use server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST(req) {
    const body = await req.json();
    const { tokened } = body;



    try {
        const tokens = jwt.verify(tokened, process.env.JWT_SECRET);

        
        const { data: user, error } = await supabase
            .from('platform')
            .select('*')
            .eq('email', tokens.email)
            .single();

        if (error || !user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            nama: user.nama,
            email: user.email,
            imgurl: user.imgurl,
            id: user.id
        });

    } catch {
        return NextResponse.json(
            { error: 'Token invalid or expired' },
            { status: 401 }
        );
    }
}
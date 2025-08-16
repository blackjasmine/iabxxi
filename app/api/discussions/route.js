'use server';
import supabase from "@/lib/supabase";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req) {
    const { content, token } = await req.json();
    const tokens = jwt.verify(token, process.env.JWT_SECRET);
    const userid = tokens.id;

    const { data, error } = await supabase
        .from('discussions')
        .insert([{ userid: userid, content }])
        .select();

    if (error) return NextResponse.json(
        {error: error},
        {status: 500}
    );
    return NextResponse.json(
        {
            id: data[0].id,
            message: 'Postingan berhasil ditambahkan!'
        },
        { status: 200 }
    );
}

export async function GET(_request) {
    console.log('Mulai ambil data.');
    const { data, error } = await supabase
        .from('discussions')
        .select('*, platform(nama, imgurl)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase error: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const discussions = (data || []).map((item) => ({
        ...item,
        nama: item.platform?.nama || null,
        imgurl: item.platform?.imgurl || null
    }));

    return NextResponse.json(
        discussions,
        {status: 200}
    );
}

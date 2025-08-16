import jwt from 'jsonwebtoken';
import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    const { content, token } = await req.json();
    const tokens = jwt.verify(token, process.env.JWT_SECRET);
    const userid = tokens.id;
    const { id } = await params;
    const discussionid = id;


    const { data, error } = await supabase
        .from('comments')
        .insert([{ discussionid, userid, content }]);
    if (error) return NextResponse.json(
        {error: error},
        {status: 500}
    )
    return NextResponse.json(
        {message: 'Komentar ditambahkan!'},
        {status: 200}
    );
}

export async function GET(req, { params }) {
    const { id } = await params;
    const discussionid = id;

    const { data, error } = await supabase
        .from('comments')
        .select('*, platform(nama, imgurl)')
        .eq('discussionid', discussionid)
        .order('created_at', { ascending: true });


    if (error) return NextResponse.json(
        {error: error},
        {status: 500}
    )

    const comments = data.map(item => ({
        ...item,
        nama: item.platform?.nama || null,
        imgurl: item.platform?.imgurl || null
    }));

    return NextResponse.json(
        comments,
        {status: 200}
    );
}

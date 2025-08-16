import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';


export async function DELETE(req, { params }) {
    const { token } = await req.json();
    const tokens = jwt.verify(token, process.env.JWT_SECRET);
    const userid = Number(tokens.id);
    const { id } = await params;
    const discussionid = Number(id);

    const { data, error } = await supabase
        .from('discussions')
        .delete()
        .match({ id: discussionid, userid: userid })
        .select();
    if (error) return NextResponse.json(
        {error: error},
        {status: 500}
    )

    if (!data || data.length === 0) {
        return NextResponse.json(
            {message: 'Tidak diizinkan menghapus diskusi ini!'},
            {status: 403}
        );
    }

    return NextResponse.json(
        {message: 'Diskusi berhasil dihapus.'},
        {status: 200}
    );
}
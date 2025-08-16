import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";
import path from "path";

export const runtime = 'nodejs';

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get('image');
    const email = formData.get('email');

    if (!file) {
        return NextResponse.json({ error: 'Tidak ada file!' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name);

    const { data: user, error } = await supabase
        .from('platform')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !user) {
        return NextResponse.json(
            {error: 'Database error or user not found!'},
            {status: 404}
        )
    }

    const fileName = `iabxxi-${user.id}-${Date.now()}${ext}`;

    const { data, error: err } = await supabase.storage
        .from('profiles')
        .upload(fileName, buffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: false,
        });

    if (err) throw err;

    const { data: datas, error: erro } = await supabase.storage
        .from('profiles')
        .getPublicUrl(fileName);

    if (erro) throw erro;

    const { data: users, error: errorr } = await supabase
        .from('platform')
        .update({imgurl: datas.publicUrl})
        .eq('id', user.id);

    if (errorr) throw errorr;

    const { data: datass, error: errorrs } = await supabase
        .from('platform')
        .select('*')
        .eq('email', email)
        .single();

    if (errorrs) throw errorrs;

    return NextResponse.json({
        nama: datass.nama,
        email: datass.email,
        imgurl: datass.imgurl
    });
}
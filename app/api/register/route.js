import supabase from "@/lib/supabase";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { nama, email, password } = body;

    const { data: user, error } = await supabase
        .from('platform')
        .select('*')
        .eq('email', email)
    if (error) {
        return NextResponse.json(
            {error: 'Database error!'},
            {status: 500}
        )
    }
    if (user.length > 0) {
        return NextResponse.json(
            {error: 'Email sudah terdaftar!'},
            {status: 400}
        )
    }

    const { data, error: err } = await supabase
        .from('platform')
        .insert([{nama, email, password}]);
    if (err) {
        return NextResponse.json(
            {error: 'Gagal daftar!'},
            {status: 500}
        )
    }

    return NextResponse.json(
        {message: 'Berhasil daftar!'},
        {status: 201}
    );
}
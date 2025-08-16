'use client';
import { useState } from "react";
import supabase from "@/lib/supabase";
import axios from "axios";
import './Login.css';
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [change, setChange] = useState("password");


    async function handleLogin(e) {
        e.preventDefault();

        const { data: user, error } = await supabase
            .from('platform')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            alert('User not found!');
            return;
        }

        if (user.password !== password) {
            alert('Wrong password!');
            return;
        }

        const id = user.id;
        const data = { id, email };

        const res = await axios.post('/api/login', data);
        console.log('Response data: ', res);

        localStorage.setItem('token', res.data.token);
        alert('Login berhasil.');

        window.location.href = '/dashboard';
    }

    const handleCheck = () => {
        if (change === "password") {
            setChange("text");
        } else {
            setChange("password");
        };
    };

    return (
        <div className="logCont">
            <div className="imgCont">
            </div>
            <div className="cont">
                <div className='judLog'>
                    <p>Login Form</p>
                </div>
                <div className="formLog">
                    <form onSubmit={handleLogin}>
                        <p className='email'>Email</p>
                        <br />
                        <input className='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <p>Password</p>
                        <br />
                        <input type={change} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <div className="checkCont">
                            <input type="checkbox" name="password" className='check' onChange={handleCheck} />
                            <p className='pCheck'>{change === "password" ? 'Perlihatkan password' : 'Sembunyikan password'}</p>
                        </div>
                        <div className="butt">
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                </div>
                <div className="footLog">
                    <p>Belum punya akun? <Link className="aLink" href="/register">Daftar</Link></p>
                </div>
            </div>
        </div>
    );
}
'use client';
import './Register.css';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Register () {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [change2, setChange2] = useState("password");
    const router = useRouter();


    const handleReg = async (e) => {
        e.preventDefault();

        if (!nama || !email || !password) {
            alert('Harap isi semua kolom.');
            return;
        }

        const data = { nama, email, password };
        
        try {
            const res = await axios.post('/api/register', data);
            alert(res.data.message || 'Berhasil mengirim data ke server.');
            router.push('/login');
        } catch (err) {
            console.error('Gagal mengirim data ke server:', err);
            alert('Gagal mengirim data.');
        }
    };

    const handleChange2 = () => {
        if (change2 === "password") {
            setChange2("text");
        } else {
            setChange2("password");
        };
    };


    return (
        <div className="regCont">
            <div className="img">
            </div>
            
            <div className="formCont">
                <div className="judReg">
                    <h1>Register Form</h1>
                </div>

                <div className="formReg">
                    <form onSubmit={handleReg}>
                        <label htmlFor="nama">Nama</label>
                        <input type="text" name="nama" id="nama" value={nama} onChange={(e) => setNama(e.target.value)} />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input type={change2} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="hide2">
                            <input className='checkbox2' type="checkbox" name="checked" onChange={handleChange2} />
                            <p className='p2'>{change2 === "password" ? 'Perlihatkan password' : 'Sembunyikan password'}</p>
                        </div>
                        <button type='submit'>Register</button>
                    </form>
                    <p className="footers">Sudah punya akun? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    )
};


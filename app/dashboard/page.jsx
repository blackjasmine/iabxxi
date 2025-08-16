'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import './Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        axios.post('/api/me', { tokened: token })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                alert('Token invalid atau epired!');
                router.push('/login');
            });
    }, []);


    //Handle Upload----->
    if (!user) return (<div className="loadingSek"><p>Loading...</p></div>);
    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        if (selected) {
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = async () => {
        if (!file) return alert('Pilih file terlebih dahulu!');
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('email', user.email);

        try {
            const res = await axios.post('/api/upload', formData);
            setUser(res.data);
            setFile(null);
            setPreview(null);
        } catch (err) {
            console.error('Gagal upload: ', err);
            alert('Gagal upload file.');
        } finally {
            setLoading(false);
        }
    };


    //Fungsi Logout----->
    const handleLogOut = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    }


    return (
        <div className="dashCont">
            <div className="sec1">
                <div className="info">
                    <p className="nama">{user.nama}</p>
                    <div className="image">
                        <img 
                        src={preview || user.imgurl || '/cat.jpg'} 
                        alt="profile-picture"
                        width="100"
                        height="100"
                        style={{borderRadius: "50%", objectFit: "cover"}} 
                        />
                    </div>
                    <div className="upload">
                        <input type="file" id='uploadInput' className='hiddenInput' accept='image/*' onChange={handleFileChange} />
                        <label htmlFor="uploadInput" className='customFileButton'>Pilih foto</label>
                        <button onClick={handleUpload} className='buttonDash' disabled={loading}>
                            {loading ? 'Mengunggah...' : 'Ganti foto profile'}
                        </button>
                    </div>
                    <div className="logout">
                        <button onClick={handleLogOut}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="sec2">
                <div className="welcome">
                    <h1>Selamat datang di dashboard anda <span>{user.nama}!</span></h1>
                    <p>Mulai chat/diskusi bersama teman. klik tombol diskusi di bawah!</p>
                    <Link href="/discussion" className='diskusiButt'>Diskusi</Link>
                </div>
            </div>
        </div>
    );
}
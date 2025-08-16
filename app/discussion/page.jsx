'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import './DiscussionPage.css';
import Link from "next/link";
import DiscussionItem from "../components/DiscussionItem";

export default function DiscussionPage() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [sembunyi, setSembunyi] = useState("sembunyi");
    const [sembunyi2, setSembunyi2] = useState("terlihat");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/api/discussions');
            setPosts(res.data);
        } catch (err) {
            console.error('Gagal ambil diskusi: ', err);
        }
    };

    const handlePost = async () => {
        if (!newPost.trim()) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/discussions',
                { 
                    content: newPost,
                    token: token
                 },
            );
            setNewPost('');
            fetchPosts();
        } catch (err) {
            console.error('Gagal posting: ', err);
        }
    };

    const handleSembunyi = () => {
        if (sembunyi === "sembunyi") {
            setSembunyi("terlihat");
            setSembunyi2("sembunyi");
        } else {
            setSembunyi("sembunyi");
            setSembunyi2("telihat");
        };
    };


    return(
        <div className="container">
            <div className="createPost">
                <div className="navCont">
                    <h2><a href="/dashboard" className="a">IABXXI</a></h2>
                    <p className="nav" onClick={handleSembunyi}>{sembunyi === "sembunyi" ? 'Buat Post' : 'Batalkan'}</p>
                </div>

                <div className={`${sembunyi} postArea`}>
                    <textarea 
                        className="textArea"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Tulis postingan..."
                    />
                    <br />
                    <button className="postButt" onClick={handlePost}>Posting</button>
                </div>
            </div>

            <div className={`${sembunyi2} komentar`}>
                {posts.map((post) => (
                    <DiscussionItem key={post.id} post={post} fetchPosts={fetchPosts} />
                ))}
            </div>

            <div className="dash">
                <Link href="/dashboard" className="dashButt">Dashboard</Link>
            </div>
        </div>
    );
} 
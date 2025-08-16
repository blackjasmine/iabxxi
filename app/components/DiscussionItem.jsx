'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import './DiscussionItem.css';

const DiscussionItem = ({ post, fetchPosts }) => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [commentInput, setCommentInput] = useState('');
    const [hide, setHide] = useState("komen");
    const [padTop, setPadTop] = useState("notPadTop");
    const [delButt, setDelButt] = useState("hide");


    useEffect(() => {
        const init = async () => {
            await findUser();
            await fetchComments();
        };
        init();
    }, []);


    const findUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/me', {tokened: token});
            setUser(res.data);
        } catch (err) {
            console.log('Error, token invalid or expired', err);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`/api/discussions/${post.id}/comments`);
            setComments(res.data);
        } catch (err) {
            console.error('Gagal ambil komentar: ', err);
        }
    };

    const handleComment = async () => {
        if (!commentInput.trim()) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post(`/api/discussions/${post.id}/comments`,
                { 
                    content: commentInput,
                    token: token 
                },
            );
            setCommentInput('');
            fetchComments();
        } catch (err) {
            console.error('Gagal kirim komentar: ', err);
        }
    };

    const hideComment = () => {
        if (hide === "komen") {
            setHide("muncul");
            setPadTop("padTop");
        } else {
            setHide("komen");
            setPadTop("notPadTop");
        };
    };

    const dateFormat = (a) => {
        const isoDate = a;
        const date = new Date(isoDate);
        const formatted = date.toLocaleString("id-ID", {
            dateStyle: "medium",
            timeStyle: "short"
        });
        return formatted;
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Yakin ingin menghapus diskusi ini?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`/api/discussions/${id}`, { data: { token } });
            alert(res.data.message);
            fetchPosts();
        } catch (err) {
            console.error(err);
            alert('Gagal menghapus diskusi.');
        }
    };

    const hideButt = () => {
        if (delButt === "hide") {
            setDelButt("appear");
        } else {
            setDelButt("hide");
        };
    };

    return (
        <div className={`${padTop} komenCont`}>
            <div className="photoProf">
                <img 
                className="imgPost"
                key={post.id}
                src={post.imgurl || '/cat.jpg'} 
                alt="profile-picture"
                width="25"
                height="25"
                style={{borderRadius: "50%", objectFit: "cover"}} 
                />
                <div className="nameTime">
                    <p className="namaPost">{post.nama}</p>
                    <p className="waktuPost">{dateFormat(post.created_at)}</p>
                </div>
            </div>
            <p onClick={hideComment} className="post">{post.content}</p>
            <div className="delete">
                {user?.id === post.userid && (
                    <div className="delCont">
                        <p className="delHide" onClick={hideButt}>...</p>
                        <button className={`delButt ${delButt}`} onClick={() => handleDelete(post.id)}>Hapus postingan</button>
                    </div>
                )}
            </div>
            <div className={`${hide} komen2`}>
                {comments.map((c, index) => (
                    <div key={c.id} className="komenPost">
                        <img 
                        className="imgKomen"
                        src={c.imgurl || '/cat.jpg'} 
                        alt="profile-picture"
                        width="20"
                        height="20"
                        style={{borderRadius: "50%", objectFit: "cover"}} 
                        />
                        <p className="pKomen" key={c.id} style={{marginTop: '5px'}}>
                            <strong>{c.nama}</strong>: <span className="pKonten">{c.content}</span>
                        </p>
                    </div>
                ))}
            </div>
            <input 
                name="comment"
                className={`${hide} inputComment`}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Tulis komentar..."
            />
            <button className={`${hide} commentButt`} onClick={handleComment}>Kirim</button>
        </div>
    );
}

export default DiscussionItem;
import './Home.css';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="homeCont">
      <div className="navBar">
        <div className="judNav">
          <p className="judul">
            <Link href="/">IABXXI</Link>
          </p>
        </div>
        <div className="navigation">
          <ul className="ul">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li className="login">
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sec1">
        <h1>IABXXI</h1>
        <p className="trans">CARI TEMAN?</p>
        <p className="trans">KUMPUL TEMAN?</p>
        <p className="pTrans">DISINI AJA!</p>
        <p className="pLog">Login/Register untuk gabung!</p>
        <p className="logButt">
          <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

import './About.css';



export default function About () {


    return (
        <div className="containerAb">
            <h2 className='h23'>About Me</h2>
            <p className="namaAb">Mohammad Iqbal</p>
            <img className='imgAbout' src={'/aku.jpg'} alt="Iqbal.jpg" />
            <p className="descrypt">Bukan programmer, ngoding cuma hobi doang.
                Tapi misal ada yang mau rekrut jadi programmer nggak papa juga si,
                wkwkwk. Kebetulan gua pake React js dan Next js kalo misal ada yang lirik, hehe.
                <br /><br /> Asal kota Blora, Jawa Tengah. Umur? Udah tua kayaknya si. Yaudah
                segitu aja, kalo kebanyakan kenalnya  nanti malah sayang. Kan katanya
                tak kenal maka tak sayang, kalau banyak kenal maka makin sayang. wkwkwk...
            </p>
        </div>
    );
};

import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "IABXXI",
  description: "Web forum diskusi hanya untuk senang-senang.",
  metadataBase: new URL("https://iabxxi.vercel.app/"),
  openGraph: {
    title: 'IABXXI',
    description: 'Forum diskusi untuk semua orang.',
    url: 'https://iabxxi.vercel.app/',
    images: ['/og-image.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "IABXXI",
    description: "Forum diskusi.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

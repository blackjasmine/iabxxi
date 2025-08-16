import './global.css';

export const metadata = {
  title: "IABXXI",
  description: "Web forum diskusi hanya untuk senang-senang.",
  openGraph: {
    title: 'IABXXI',
    description: 'Forum diskusi untuk semua orang.',
    images: ['/og-image.png'],
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

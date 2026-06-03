import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Betterly — Master Communication & Life Skills',
  description: 'Practice real-world communication, confidence, and social skills with interactive scenarios and gamified progress tracking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Aurora background */}
        <div className="aurora-bg">
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

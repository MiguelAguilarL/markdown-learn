import type { Metadata } from 'next';
import './globals.css';
import { ProgressProvider } from '../context/ProgressContext';
import { ReferenceProvider } from '../context/ReferenceContext';
import { useReference } from '../hooks/useReference';
import ReferencePanel from '../components/reference/ReferencePanel';

export const metadata: Metadata = {
  title: 'MarkdownLearn — Ejercicios Interactivos',
  description: 'Plataforma interactiva para aprender y practicar la sintaxis de CommonMark y GitHub Flavored Markdown (GFM).',
};

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { openPanel } = useReference();
  return (
    <div onClick={() => openPanel()}>
      {children}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&family=Public+Sans:wght@400;600;700;800&family=Geist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-[#0D1117] text-[#E6EDF3] antialiased overflow-hidden flex flex-col">
        <ProgressProvider>
          <ReferenceProvider>
            {children}
            <ReferencePanel />
          </ReferenceProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}

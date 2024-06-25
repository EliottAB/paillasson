import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import "./globals.css";
import "./css/styles.css";
import 'leaflet/dist/leaflet.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paillasson",
  description: "Paillasson est une application qui vous permet de communiquer entre voisins et de rendre ou demander des services. Vous pouvez créer ou rejoindre un voisinage proche de chez vous !",
  icons: {
    icon: "/icon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer />
        </body>
    </html>
  );
}

"use client"

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/global.css";

import { Inter } from "next/font/google";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap" 
});

interface SessionProviderProps {
  session: Session | null;
  children: React.ReactNode;
}

const RootLayout: React.FC<SessionProviderProps> = ({ children, session }) => {
  const pathname = usePathname();

  return (
    <html
      className={`${
        pathname === "/sign-in" ||
        pathname === `/project/${pathname.replace("/project/", "")}` ||
        pathname === "/create-project"
          ? "not-scrollable"
          : ""
      }`}
      lang="en"
    >
      <head>
        <meta name="description" content="Dribble clone made with Next JS" />
        <title>Flexibble</title>
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <main className="app paddings">{children}</main>
          <Footer />
        </SessionProvider>

        <ToastContainer 
          position="bottom-right"
          autoClose={3600}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          bodyClassName='font-inter text-sm font-medium'
          />
      </body>
    </html>
  );
};

export default RootLayout;

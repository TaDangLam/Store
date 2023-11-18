'use client'
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';

import './globals.css'
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Home',
//   description: 'LK Store',
// }



export default function RootLayout({ children }) {
  const pathname = usePathname();
  // const url = ['/auth', '/auth/signup', '/auth/forgotPassword', '/dashboard', '/dashboard/user', '/dashboard/order', '/dashboard/product', '/dashboard/category', '/dashboard/product/edit/a', '/dashboard/product/delete'];
  // const showHeaderAndFooter = !url.includes(pathname);
  const isAuthOrDashboardPage = pathname.startsWith('/auth') || pathname.startsWith('/dashboard') || pathname.startsWith('/order');
  const showHeaderAndFooter = !isAuthOrDashboardPage;
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className='wrapper'>
          {showHeaderAndFooter && <Header/>}
        </header>
        <main className={`${showHeaderAndFooter ? 'body-cus' : ''}`}>
          {children}
        </main>
        <footer className='footer-cus'>
          {showHeaderAndFooter && <Footer />}
        </footer>
      </body>
    </html>
  )
}

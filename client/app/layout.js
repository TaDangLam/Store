import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'LK Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">     
      <body className={inter.className}>
        <header className='wrapper'>
          <Header/>
        </header>
        <main className='body-cus'>
          {children}
        </main>
        <footer className='footer-cus'><Footer /></footer>
      </body>
    </html>
    
  )
}

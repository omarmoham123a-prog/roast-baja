import Navbar from '@/components/Navbar'
import Cart from '@/components/Cart'
import './globals.css'

export const metadata = {
  title: 'Roast Baja - روست باجا',
  description: 'أجود أنواع القهوة المحمصة في مصر',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-black text-white">
        <Navbar />
        {children}
        <Cart />
      </body>
    </html>
  )
}

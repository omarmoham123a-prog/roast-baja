npx create-next-app@latest roast-baja --typescript --tailwind --eslint --app
cd roast-baja
npm install @supabase/supabase-js framer-motion lucide-react
import Navbar from '@/components/Navbar'
import Cart from '@/components/Cart'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        {children}
        <Cart />
      </body>
    </html>
  )
}

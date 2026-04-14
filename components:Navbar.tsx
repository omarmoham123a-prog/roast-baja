'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/70 border-b border-yellow-500/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://i.postimg.cc/JsmBKpH8/logo.png"
            alt="ROAST BAJA"
            width={50}
            height={50}
            className="drop-shadow-lg"
          />
          <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            ROAST BAJA
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            href="https://wa.me/201148351947" 
            className="btn-gold px-6 py-2 text-sm hidden md:block"
          >
            اطلب واتساب
          </Link>
          <div className="p-2 bg-yellow-500/20 rounded-xl cursor-pointer">
            <ShoppingCart size={24} />
          </div>
          <Menu className="md:hidden" size={24} />
        </div>
      </div>
    </nav>
  )
}
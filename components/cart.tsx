'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Phone, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  weight: number
  image: string
}

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      if (saved) setCartItems(JSON.parse(saved))
    }
  }, [])

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.weight === item.weight)
      if (existing) {
        return prev.map(i => 
          i.id === item.id && i.weight === item.weight 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: number, weight: number) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.weight === weight)))
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-28 p-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-2xl shadow-yellow-500/50 hover:scale-110 transition-all duration-300 z-50"
      >
        <ShoppingCart size={28} className="text-black" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-96 bg-black/95 backdrop-blur-xl border-l border-yellow-500/50 z-50 p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                السلة
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={32} className="text-yellow-400 hover:text-yellow-300" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.weight}`}
                  className="flex gap-4 p-4 bg-black/40 rounded-xl border border-yellow-500/30"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg mb-1 truncate">{item.name}</h4>
                    <p className="text-yellow-400 text-sm mb-2">{item.weight}ج</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => removeFromCart(item.id, item.weight)}
                          className="w-10 h-10 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center"
                        >
                          <X size={20} />
                        </button>
                        <span className="font-bold text-xl">
                          {(item.price * item.quantity).toLocaleString()} جنيه
                        </span>
                      </div>
                      <span className="text-sm bg-yellow-500/20 px-3 py-1 rounded-full">
                        ×{item.quantity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {cartItems.length > 0 ? (
              <>
                <div className="border-t border-yellow-500/50 pt-6 mb-8">
                  <div className="text-2xl font-black text-right mb-6">
                    المجموع: {total.toLocaleString()} جنيه
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="btn-gold py-4 text-lg font-bold shadow-2xl">
                      تأكيد الطلب
                    </button>
                    <a 
                      href={`https://wa.me/201148351947?text=مرحبا!%0Aعايز اطلب:%0A${cartItems.map(i => `${i.name} (${i.weight}ج) ×${i.quantity}`).join('%0A')}%0Aالمجموع: ${total} جنيه`}
                      className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-2xl shadow-green-500/25 transition-all duration-300"
                    >
                      <MessageCircle size={24} />
                      واتساب
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-yellow-400">
                <ShoppingCart size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">السلة فارغة</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
    </>
  )
}

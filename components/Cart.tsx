'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, MessageCircle } from 'lucide-react'
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

  // الجزء السحري: تعريف الوظيفة عشان المنتج يضاف لما تضغط على الزرار في الصفحة
  useEffect(() => {
    const handleAdd = (item: CartItem) => {
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
      });
      setIsOpen(true); // يفتح السلة تلقائياً أول ما تضيف منتج
    };

    // ربط الوظيفة بالـ window عشان الـ ProductCard يشوفها
    // @ts-ignore
    window.addToCart = handleAdd;
  }, []);

  // تحميل السلة من الذاكرة
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      if (saved) setCartItems(JSON.parse(saved))
    }
  }, [])

  // حفظ السلة عند كل تغيير
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const removeFromCart = (id: number, weight: number) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.weight === weight)))
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <>
      {/* زرار السلة العائم */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 p-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-2xl shadow-yellow-500/50 hover:scale-110 transition-all duration-300 z-50"
      >
        <ShoppingCart size={28} className="text-black" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-black">
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-black/95 backdrop-blur-xl border-l border-yellow-500/50 z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                سلتك
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={32} className="text-yellow-400 hover:text-yellow-300" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <motion.div
                  layout
                  key={`${item.id}-${item.weight}`}
                  className="flex gap-4 p-4 bg-white/5 rounded-xl border border-yellow-500/20"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg mb-1 truncate text-yellow-50">{item.name}</h4>
                    <p className="text-yellow-400 text-sm mb-2">{item.weight}ج</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-yellow-500">
                        {(item.price * item.quantity).toLocaleString()} ج.م
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-yellow-500/20 px-2 py-1 rounded-full text-yellow-200">
                          ×{item.quantity}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id, item.weight)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {cartItems.length > 0 ? (
              <div className="border-t border-yellow-500/30 pt-6">
                <div className="text-2xl font-black text-right mb-6 text-yellow-50">
                  الإجمالي: {total.toLocaleString()} ج.م
                </div>
                <div className="flex flex-col gap-3">
                  <a 
                    href={`https://wa.me/201148351947?text=${encodeURIComponent(
                      `مرحبا روست باجا! 👋\nعايز اطلب:\n${cartItems.map(i => `- ${i.name} (${i.weight}ج) ×${i.quantity}`).join('\n')}\n\nالإجمالي: ${total} جنيه`
                    )}`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-2xl transition-all"
                  >
                    <MessageCircle size={24} />
                    إتمام الطلب عبر واتساب
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-yellow-500/50">
                <ShoppingCart size={64} className="mx-auto mb-4 opacity-20" />
                <p className="text-xl">السلة لسه فاضية</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

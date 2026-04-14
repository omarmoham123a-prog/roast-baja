'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingCart, Package } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  weights?: number[]
}

export default function ProductCard({ product }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState<number>(125)
  const [quantity, setQuantity] = useState(1)

  const finalPrice = product.weights 
    ? product.price * (selectedWeight / 125) * quantity 
    : product.price * quantity

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-black/40 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-400/60 transition-all duration-500 overflow-hidden gold-gradient"
    >
      <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-sm font-bold">
          {product.category}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-yellow-400">{product.name}</h3>
      
      {product.weights && (
        <div className="mb-4">
          <label className="block text-sm mb-2 text-yellow-200">الوزن:</label>
          <div className="flex flex-wrap gap-2">
            {product.weights.map((weight) => (
              <button
                key={weight}
                onClick={() => setSelectedWeight(weight)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  selectedWeight === weight
                    ? 'bg-yellow-500 text-black shadow-lg'
                    : 'bg-yellow-500/30 hover:bg-yellow-500/50'
                }`}
              >
                {weight}ج
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-3xl font-black text-yellow-400">
            {finalPrice.toLocaleString()} جنيه
          </span>
          <span className="text-sm text-yellow-200 ml-2">للطلب الواحد</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-yellow-500/20 rounded-xl hover:bg-yellow-500/40">
            <Package size={20} />
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 p-2 bg-yellow-500/20 border border-yellow-500/50 rounded-xl text-center font-bold"
          />
        </div>
      </div>

      <button className="w-full btn-gold flex items-center justify-center gap-2 text-lg shadow-2xl">
        <ShoppingCart size={24} />
        أضف للسلة
      </button>
    </motion.div>
  )
}
// أضف هذا في نهاية ProductCard.tsx قبل الـ return
import Cart from './Cart'

// داخل الـ Component
const handleAddToCart = () => {
  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price * (selectedWeight / 125),
    quantity,
    weight: selectedWeight,
    image: product.image
  }
  // @ts-ignore
  window.addToCart(cartItem)
}

// غير الزر الأخير لـ:
<button 
  onClick={handleAddToCart}
  className="w-full btn-gold flex items-center justify-center gap-2 text-lg shadow-2xl"
>
  <ShoppingCart size={24} />
  أضف للسلة
</button>

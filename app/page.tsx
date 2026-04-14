"use client"; // أهم سطر عشان الموقع يشتغل

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';

// بيانات المنتجات
const products = [
  {
    id: 1,
    name: 'الكلاسيك',
    category: 'قهوة تركي',
    price: 140,
    image: 'https://i.postimg.cc/GTwptpkL/roast1.jpg',
    weights: [125, 250, 500, 1000]
  },
  {
    id: 2,
    name: 'السلطان',
    category: 'قهوة تركي',
    price: 150,
    image: 'https://i.postimg.cc/GTwptpkL/roast1.jpg',
    weights: [125, 250, 500, 1000]
  },
  {
    id: 3,
    name: 'بريميوم',
    category: 'قهوة تركي',
    price: 160,
    image: 'https://i.postimg.cc/GTwptpkL/roast1.jpg',
    weights: [125, 250, 500, 1000]
  },
  {
    id: 4,
    name: 'أرابيكا جولد',
    category: 'قهوة تركي',
    price: 170,
    image: 'https://i.postimg.cc/GTwptpkL/roast1.jpg',
    weights: [125, 250, 500, 1000]
  },
  {
    id: 5,
    name: 'إسبيشيال',
    category: 'قهوة تركي',
    price: 180,
    image: 'https://i.postimg.cc/GTwptpkL/roast1.jpg',
    weights: [125, 250, 500, 1000]
  },
  {
    id: 6,
    name: 'الإيطالي',
    category: 'إسبريسو كليو',
    price: 170,
    image: 'https://i.postimg.cc/ftgrf3HZ/espresso1.jpg',
    weights: [125, 250, 500, 1000]
  },
  {
    id: 7,
    name: 'الكولومبي',
    category: 'إسبريسو كليو',
    price: 150,
    image: 'https://i.postimg.cc/ftgrf3HZ/espresso1.jpg',
    weights: [125, 250, 500, 1000]
  },
  {
    id: 8,
    name: 'فولكانو',
    category: 'إسبريسو كبسولات',
    price: 250,
    image: 'https://i.postimg.cc/7fQSP35Y/capsule1.jpg'
  },
  {
    id: 9,
    name: 'ريستيرتو',
    category: 'إسبريسو كبسولات',
    price: 250,
    image: 'https://i.postimg.cc/s1YWSFvg/capsule2.jpg'
  },
  {
    id: 10,
    name: 'ساده',
    category: 'قهوة فرنساوي',
    price: 300,
    image: 'https://i.postimg.cc/xXMqrMHF/french1.jpg'
  },
  {
    id: 11,
    name: 'فانيليا',
    category: 'قهوة فرنساوي',
    price: 320,
    image: 'https://i.postimg.cc/XBr7sC4L/french2.jpg'
  },
  {
    id: 12,
    name: 'كلاسيك',
    category: 'نسكافيه',
    price: 300,
    image: 'https://i.postimg.cc/nC91NSLD/nescafe1.jpg'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-screen flex items-center justify-center overflow-hidden gold-gradient"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="text-center z-10 px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Image
              src="https://i.postimg.cc/JsmBKpH8/logo.png"
              alt="ROAST BAJA"
              width={200}
              height={200}
              className="mx-auto mb-8 drop-shadow-2xl"
            />
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              ROAST BAJA
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-yellow-100/90">
              أجود أنواع القهوة المحمصة • توصيل لجميع محافظات مصر
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#products" className="btn-gold text-lg">
                اطلب الآن
              </a>
              <a 
                href="https://wa.me/201148351947" 
                className="btn-gold bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
              >
                واتساب 📱
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-center mb-20 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
          >
            منتجاتنا الفاخرة
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8 text-yellow-400">
            تواصل معانا
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="https://wa.me/201148351947" className="btn-gold p-8 text-xl">
              واتساب 📱<br/>01148351947
            </a>
            <a href="tel:01148369371" className="btn-gold p-8 text-xl">
              هاتف 📞<br/>01148369371
            </a>
            <div className="p-8 gold-gradient rounded-2xl">
              <p className="text-xl mb-4">توصيل لجميع محافظات مصر</p>
              <p className="text-yellow-400 font-bold text-lg">
                الدفع: محفظة كاش على 01148369371
              </p>
            </div>
          </div>
        </div>
      </section>
      <Cart />
    </main>
  );
}

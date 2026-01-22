"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  CreditCard,
  Gift,
  Truck,
} from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "kit-iniciante",
      name: "Kit Iniciante Holístico",
      price: 65,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1602519037249-84e79c5b5c8b?w=200&h=200&fit=crop",
    },
    {
      id: "oleo-lavanda",
      name: "Óleo Essencial de Lavanda",
      price: 15,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=200&fit=crop",
    },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "bem-vindo10") {
      setIsPromoApplied(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-24 bg-background">
          <div className="content-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                O seu carrinho está vazio
              </h1>
              <p className="text-gray-500 mb-8">
                Explore a nossa loja e descubra produtos para apoiar a sua
                jornada espiritual.
              </p>
              <Link
                href="/loja"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all"
              >
                Explorar Loja
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">
            O Seu Carrinho ({cartItems.length}{" "}
            {cartItems.length === 1 ? "item" : "itens"})
          </h1>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-6"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold text-lg mt-1">
                          {item.price}€
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-4 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {(item.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Link
                href="/loja"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-4"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continuar a Comprar
              </Link>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 h-fit">
              <h2 className="font-semibold text-xl text-gray-900 mb-6">
                Resumo da Encomenda
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código Promocional
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="BEM-VINDO10"
                      disabled={isPromoApplied}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-primary outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    disabled={isPromoApplied}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      isPromoApplied
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isPromoApplied ? "Aplicado!" : "Aplicar"}
                  </button>
                </div>
              </div>

              {/* Summary Lines */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Envio
                  </span>
                  <span>
                    {shipping === 0 ? "Grátis" : `${shipping.toFixed(2)}€`}
                  </span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto (10%)</span>
                    <span>-{discount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>

              {shipping === 0 && (
                <p className="text-sm text-green-600 mb-6 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Parabéns! Tem direito a envio grátis!
                </p>
              )}

              {/* Checkout Button */}
              <button className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl">
                <CreditCard className="w-5 h-5" />
                Finalizar Compra
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">🔒 SSL Seguro</span>
                  <span className="flex items-center gap-1">↩️ 14 Dias</span>
                  <span className="flex items-center gap-1">📦 Rastreável</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

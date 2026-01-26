"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";

export const dynamic = 'force-dynamic';
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Filter,
  Star,
  Heart,
  Eye,
  Package,
  Sparkles,
} from "lucide-react";

type ProductCategory =
  | "all"
  | "cristais"
  | "oleos"
  | "livros"
  | "acessorios"
  | "kits";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

const products: Product[] = [
  {
    id: "cristal-ametista",
    name: "Ametista Natural Polida",
    description:
      "Cristal de ametista para meditação e proteção energética. Ajuda na intuição e paz interior.",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&h=400&fit=crop",
    category: "cristais",
    rating: 4.9,
    reviews: 47,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "cristal-quartzo-rosa",
    name: "Quartzo Rosa Bruto",
    description:
      "Pedra do amor incondicional. Abre o chakra do coração e promove autoamor.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    category: "cristais",
    rating: 4.8,
    reviews: 32,
    inStock: true,
  },
  {
    id: "oleo-lavanda",
    name: "Óleo Essencial de Lavanda",
    description:
      "Óleo 100% puro para relaxamento, sono e redução de ansiedade. 10ml.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    category: "oleos",
    rating: 5.0,
    reviews: 89,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "oleo-eucalipto",
    name: "Óleo Essencial de Eucalipto",
    description:
      "Purificação e limpeza energética. Ideal para difusores e rituais. 10ml.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    category: "oleos",
    rating: 4.7,
    reviews: 28,
    inStock: true,
  },
  {
    id: "livro-despertar",
    name: "O Despertar da Consciência",
    description:
      "Guia completo para iniciantes em espiritualidade e desenvolvimento pessoal.",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    category: "livros",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "livro-chakras",
    name: "Manual dos 7 Chakras",
    description:
      "Aprenda a equilibrar seus centros energéticos com exercícios práticos.",
    price: 28,
    originalPrice: 35,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    category: "livros",
    rating: 4.8,
    reviews: 73,
    inStock: true,
    isNew: true,
  },
  {
    id: "pulseira-7chakras",
    name: "Pulseira 7 Chakras",
    description:
      "Pulseira artesanal com 7 pedras naturais correspondentes aos chakras.",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    category: "acessorios",
    rating: 4.6,
    reviews: 41,
    inStock: true,
  },
  {
    id: "incenso-sage",
    name: "Kit Incenso Sálvia Branca",
    description:
      "5 bastões de sálvia branca para limpeza energética de ambientes.",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1600298882525-1ac025c98b68?w=400&h=400&fit=crop",
    category: "acessorios",
    rating: 4.9,
    reviews: 64,
    inStock: true,
  },
  {
    id: "kit-iniciante",
    name: "Kit Iniciante Holístico",
    description:
      "Kit completo: 3 cristais + óleo essencial + guia de meditação. Perfeito para começar.",
    price: 65,
    originalPrice: 80,
    image:
      "https://images.unsplash.com/photo-1602519037249-84e79c5b5c8b?w=400&h=400&fit=crop",
    category: "kits",
    rating: 5.0,
    reviews: 28,
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: "kit-meditacao",
    name: "Kit Meditação Profunda",
    description:
      "Almofada de meditação + vela aromática + sino tibetano + guia de práticas.",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop",
    category: "kits",
    rating: 4.8,
    reviews: 19,
    inStock: false,
  },
];

const categories: { value: ProductCategory; label: string; icon: string }[] = [
  { value: "all", label: "Todos", icon: "✨" },
  { value: "cristais", label: "Cristais", icon: "💎" },
  { value: "oleos", label: "Óleos Essenciais", icon: "🌿" },
  { value: "livros", label: "Livros", icon: "📚" },
  { value: "acessorios", label: "Acessórios", icon: "🔮" },
  { value: "kits", label: "Kits Especiais", icon: "🎁" },
];

export default function LojaPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [sortBy, setSortBy] = useState<
    "popular" | "price-low" | "price-high" | "newest"
  >("popular");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return b.reviews - a.reviews;
      }
    });

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
        <div className="content-container">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Loja Holística
            </motion.div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-main mb-4">
              Produtos para o Seu Bem-Estar
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Cristais, óleos essenciais, livros e acessórios selecionados para
              apoiar a sua jornada de transformação espiritual.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.value
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-text-secondary hover:bg-primary/10 border border-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 ml-auto">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="popular">Mais Populares</option>
                <option value="price-low">Preço: Menor → Maior</option>
                <option value="price-high">Preço: Maior → Menor</option>
                <option value="newest">Novidades</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NOVO
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          BESTSELLER
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100,
                          )}
                          %
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-2 rounded-full transition-all ${
                          wishlist.includes(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`}
                        />
                      </button>
                      <Link
                        href={`/loja/${product.id}`}
                        className="p-2 bg-white/90 text-gray-600 rounded-full hover:bg-primary hover:text-white transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Out of Stock Overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-full">
                          Esgotado
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">
                          {product.price}€
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice}€
                          </span>
                        )}
                      </div>

                      <button
                        disabled={!product.inStock}
                        className={`p-3 rounded-xl transition-all ${
                          product.inStock
                            ? "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500">Tente selecionar outra categoria.</p>
            </div>
          )}

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚚", title: "Envio Grátis", desc: "Em compras +50€" },
              { icon: "🔒", title: "Pagamento Seguro", desc: "SSL Encriptado" },
              { icon: "↩️", title: "Devoluções", desc: "14 dias garantia" },
              { icon: "💬", title: "Suporte", desc: "Resposta em 24h" },
            ].map((badge, i) => (
              <div
                key={i}
                className="text-center p-6 bg-white rounded-xl border border-gray-100"
              >
                <span className="text-3xl mb-2 block">{badge.icon}</span>
                <h4 className="font-semibold text-gray-900">{badge.title}</h4>
                <p className="text-sm text-gray-500">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

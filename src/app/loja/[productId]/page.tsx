"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  Plus,
  Minus,
  Check,
} from "lucide-react";

// Dados do produto (em produção viria do Sanity CMS)
const product = {
  id: "kit-iniciante",
  name: "Kit Iniciante Holístico",
  description:
    "Kit completo para quem quer iniciar a sua jornada de transformação espiritual. Inclui cristais cuidadosamente selecionados, óleo essencial premium e guia de meditação exclusivo.",
  longDescription: `
    <p>Este kit foi especialmente criado para quem está a dar os primeiros passos no mundo das terapias holísticas e deseja ter as ferramentas essenciais para praticar em casa.</p>
    
    <h4>O que está incluído:</h4>
    <ul>
      <li><strong>Ametista Natural (3-4cm)</strong> - Para proteção, intuição e paz interior</li>
      <li><strong>Quartzo Rosa (3-4cm)</strong> - Para amor incondicional e autoamor</li>
      <li><strong>Quartzo Transparente (3-4cm)</strong> - Para amplificação energética e clareza</li>
      <li><strong>Óleo Essencial de Lavanda 10ml</strong> - 100% puro, para relaxamento</li>
      <li><strong>Guia de Meditação Digital</strong> - E-book com 21 práticas guiadas</li>
      <li><strong>Saquinho de Veludo</strong> - Para guardar os seus cristais</li>
    </ul>
    
    <h4>Benefícios:</h4>
    <ul>
      <li>Ideal para iniciantes</li>
      <li>Todos os cristais são limpos e energizados antes do envio</li>
      <li>Inclui instruções de uso e limpeza</li>
      <li>Economia de 15€ comparado a comprar separadamente</li>
    </ul>
  `,
  price: 65,
  originalPrice: 80,
  images: [
    "https://images.unsplash.com/photo-1602519037249-84e79c5b5c8b?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
  ],
  rating: 5.0,
  reviews: 28,
  inStock: true,
  category: "kits",
};

const relatedProducts = [
  {
    id: "cristal-ametista",
    name: "Ametista Natural",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "oleo-lavanda",
    name: "Óleo de Lavanda",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    rating: 5.0,
  },
  {
    id: "livro-despertar",
    name: "O Despertar da Consciência",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    rating: 4.9,
  },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAdding(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/loja"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à Loja
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-square rounded-3xl overflow-hidden bg-white"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.originalPrice && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100,
                    )}
                    % OFF
                  </span>
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-primary">
                  {product.price}€
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.originalPrice}€
                  </span>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || !product.inStock}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                    isAdded
                      ? "bg-green-500 text-white"
                      : product.inStock
                        ? "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isAdding ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isAdded ? (
                    <>
                      <Check className="w-6 h-6" />
                      Adicionado!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-2xl mb-8">
                {[
                  {
                    icon: <Truck className="w-6 h-6" />,
                    text: "Envio Grátis +50€",
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    text: "Pagamento Seguro",
                  },
                  {
                    icon: <RefreshCw className="w-6 h-6" />,
                    text: "14 Dias Devolução",
                  },
                ].map((badge, i) => (
                  <div key={i} className="text-center">
                    <div className="text-primary mb-2 flex justify-center">
                      {badge.icon}
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      {badge.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Detalhes do Produto
                </h3>
                <div
                  className="prose prose-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.longDescription }}
                />
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              Produtos Relacionados
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/loja/${item.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {item.rating}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xl font-bold text-primary mt-2">
                      {item.price}€
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

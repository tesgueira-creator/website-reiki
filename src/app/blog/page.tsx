"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag, User, Search } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "o-que-e-reiki-kundalini",
    title: "O Que É Reiki Kundalini e Como Pode Transformar a Sua Vida",
    excerpt:
      "Descubra a poderosa técnica de cura energética que desperta a sua energia vital adormecida e promove equilíbrio em todos os níveis do ser.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop",
    category: "Reiki",
    author: "Rafaella Kally",
    date: "15 Jan 2026",
    readTime: "8 min",
    featured: true,
  },
  {
    id: "7-chakras-guia-completo",
    title: "Os 7 Chakras: Guia Completo para Iniciantes",
    excerpt:
      "Aprenda sobre cada um dos 7 centros energéticos do corpo, como identificar bloqueios e técnicas simples para os equilibrar no dia a dia.",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=500&fit=crop",
    category: "Chakras",
    author: "Rafaella Kally",
    date: "10 Jan 2026",
    readTime: "12 min",
  },
  {
    id: "meditacao-para-ansiedade",
    title: "5 Técnicas de Meditação para Controlar a Ansiedade",
    excerpt:
      "Exercícios práticos de meditação que pode fazer em casa para reduzir o stress e encontrar paz interior mesmo nos dias mais caóticos.",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&h=500&fit=crop",
    category: "Meditação",
    author: "Rafaella Kally",
    date: "5 Jan 2026",
    readTime: "6 min",
  },
  {
    id: "cristais-para-protecao",
    title: "Cristais de Proteção: Quais Usar e Como Programar",
    excerpt:
      "Conheça os melhores cristais para proteção energética, aprenda a limpá-los e programá-los para criar um escudo de luz ao seu redor.",
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&h=500&fit=crop",
    category: "Cristais",
    author: "Rafaella Kally",
    date: "28 Dez 2025",
    readTime: "7 min",
  },
  {
    id: "sinais-bloqueio-energetico",
    title: "10 Sinais de Que Tem Bloqueios Energéticos",
    excerpt:
      "Aprenda a identificar os sintomas físicos, emocionais e espirituais que indicam bloqueios no seu campo energético e o que fazer.",
    image:
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&h=500&fit=crop",
    category: "Energia",
    author: "Rafaella Kally",
    date: "20 Dez 2025",
    readTime: "5 min",
  },
  {
    id: "ritual-lua-cheia",
    title: "Ritual da Lua Cheia: Liberte o Que Não Serve Mais",
    excerpt:
      "Um ritual poderoso para fazer em cada Lua Cheia, libertando padrões negativos, mágoas e crenças limitantes que o impedem de evoluir.",
    image:
      "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=800&h=500&fit=crop",
    category: "Rituais",
    author: "Rafaella Kally",
    date: "15 Dez 2025",
    readTime: "9 min",
  },
];

const categories = ["Todos", ...new Set(blogPosts.map((p) => p.category))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "Todos" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container">
          <SectionTitle
            label="Blog & Artigos"
            title="Sabedoria para a Sua Jornada"
            subtitle="Artigos, guias e reflexões sobre espiritualidade, cura energética e desenvolvimento pessoal"
          />

          {/* Search & Filter */}
          <div className="mt-12 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && activeCategory === "Todos" && !searchQuery && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Link href={`/blog/${featuredPost.id}`} className="group block">
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                          EM DESTAQUE
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {featuredPost.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium text-gray-700">
                            {featuredPost.author}
                          </span>
                        </div>
                        <span className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          Ler Artigo
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                        Ler mais
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">Nenhum artigo encontrado.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Todos");
                }}
                className="text-primary hover:underline"
              >
                Ver todos os artigos
              </button>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary to-primary-dark p-10 md:p-16 rounded-3xl text-center text-white">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Receba Sabedoria na Sua Caixa de Email
            </h3>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Subscreva a newsletter e receba artigos exclusivos, meditações
              guiadas e dicas de bem-estar.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="O seu email..."
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-white/30"
              />
              <button
                type="submit"
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

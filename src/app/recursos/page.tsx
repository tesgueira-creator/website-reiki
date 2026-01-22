"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Download,
  Play,
  FileText,
  Headphones,
  BookOpen,
  Video,
  Lock,
  ChevronRight,
  Clock,
  Star,
  Users,
} from "lucide-react";

type ResourceCategory = "all" | "meditations" | "ebooks" | "videos" | "guides";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  duration?: string;
  pages?: number;
  isPremium: boolean;
  image: string;
  downloads?: number;
}

const resources: Resource[] = [
  {
    id: "meditacao-relaxamento",
    title: "Meditação Guiada para Relaxamento Profundo",
    description:
      "Uma meditação de 15 minutos para libertar tensão e alcançar um estado de paz interior.",
    category: "meditations",
    duration: "15 min",
    isPremium: false,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    downloads: 1234,
  },
  {
    id: "meditacao-chakras",
    title: "Alinhamento dos 7 Chakras",
    description:
      "Meditação completa para equilibrar e alinhar todos os seus centros energéticos.",
    category: "meditations",
    duration: "25 min",
    isPremium: true,
    image:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&h=300&fit=crop",
    downloads: 856,
  },
  {
    id: "ebook-reiki-iniciantes",
    title: "Guia Completo de Reiki para Iniciantes",
    description:
      "Tudo o que precisa de saber para começar a sua jornada no Reiki. Inclui técnicas práticas.",
    category: "ebooks",
    pages: 45,
    isPremium: false,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    downloads: 2341,
  },
  {
    id: "ebook-cristais",
    title: "O Poder dos Cristais: Manual Prático",
    description:
      "Aprenda a escolher, limpar e programar cristais para diferentes propósitos de cura.",
    category: "ebooks",
    pages: 62,
    isPremium: true,
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&h=300&fit=crop",
    downloads: 1567,
  },
  {
    id: "video-auto-reiki",
    title: "Vídeo Aula: Auto-Reiki em Casa",
    description:
      "Aprenda técnicas de auto-tratamento de Reiki que pode praticar no conforto do seu lar.",
    category: "videos",
    duration: "35 min",
    isPremium: false,
    image:
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=400&h=300&fit=crop",
    downloads: 789,
  },
  {
    id: "guide-morning-routine",
    title: "Rotina Matinal para Energia e Clareza",
    description:
      "Um guia passo a passo para começar o seu dia com intenção, energia e foco.",
    category: "guides",
    pages: 12,
    isPremium: false,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    downloads: 3456,
  },
  {
    id: "meditacao-sono",
    title: "Meditação para Dormir Profundamente",
    description:
      "Técnica de relaxamento progressivo para uma noite de sono reparador.",
    category: "meditations",
    duration: "20 min",
    isPremium: false,
    image:
      "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=400&h=300&fit=crop",
    downloads: 4521,
  },
  {
    id: "video-limpeza-aura",
    title: "Técnicas de Limpeza de Aura",
    description:
      "Vídeo tutorial com 5 técnicas simples para limpar e proteger a sua aura diariamente.",
    category: "videos",
    duration: "22 min",
    isPremium: true,
    image:
      "https://images.unsplash.com/photo-1528991435120-da109ca7eeb6?w=400&h=300&fit=crop",
    downloads: 678,
  },
];

const categories = [
  { id: "all" as ResourceCategory, label: "Todos", icon: BookOpen },
  {
    id: "meditations" as ResourceCategory,
    label: "Meditações",
    icon: Headphones,
  },
  { id: "ebooks" as ResourceCategory, label: "E-books", icon: FileText },
  { id: "videos" as ResourceCategory, label: "Vídeos", icon: Video },
  { id: "guides" as ResourceCategory, label: "Guias", icon: BookOpen },
];

export default function RecursosPage() {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>("all");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredResources = resources.filter((resource) => {
    const categoryMatch =
      activeCategory === "all" || resource.category === activeCategory;
    const premiumMatch = !showPremiumOnly || resource.isPremium;
    return categoryMatch && premiumMatch;
  });

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case "meditations":
        return <Headphones className="w-4 h-4" />;
      case "ebooks":
        return <FileText className="w-4 h-4" />;
      case "videos":
        return <Video className="w-4 h-4" />;
      case "guides":
        return <BookOpen className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
        <div className="content-container">
          <SectionTitle
            label="Biblioteca Gratuita"
            title="Recursos para a Sua Jornada"
            subtitle="Meditações guiadas, e-books e conteúdo exclusivo para apoiar o seu crescimento espiritual"
          />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-12">
            {[
              { icon: Download, label: "Downloads", value: "15K+" },
              { icon: Users, label: "Utilizadores", value: "2.5K+" },
              { icon: Star, label: "Avaliação", value: "4.9" },
              { icon: BookOpen, label: "Recursos", value: "20+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border border-gray-100 text-center"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-bold text-xl text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPremiumOnly}
                onChange={() => setShowPremiumOnly(!showPremiumOnly)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-600">Apenas Premium</span>
            </label>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {getCategoryIcon(resource.category)}
                    {categories.find((c) => c.id === resource.category)?.label}
                  </div>

                  {/* Premium Badge */}
                  {resource.isPremium && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-medium text-white">
                      <Star className="w-3 h-3" />
                      Premium
                    </div>
                  )}

                  {/* Play Button for videos/meditations */}
                  {(resource.category === "videos" ||
                    resource.category === "meditations") && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      {resource.duration ? (
                        <>
                          <Clock className="w-3 h-3" />
                          {resource.duration}
                        </>
                      ) : (
                        <>
                          <FileText className="w-3 h-3" />
                          {resource.pages} páginas
                        </>
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {resource.downloads?.toLocaleString()} downloads
                    </span>
                  </div>

                  {/* Action Button */}
                  {resource.isPremium ? (
                    <Link
                      href="/cliente"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      <Lock className="w-4 h-4" />
                      Desbloquear Premium
                    </Link>
                  ) : (
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all">
                      <Download className="w-4 h-4" />
                      Download Gratuito
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Receba Recursos Exclusivos
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Subscreva a nossa newsletter e receba meditações, guias e conteúdo
              exclusivo diretamente no seu email.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="O seu email"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all whitespace-nowrap"
              >
                Subscrever
              </button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

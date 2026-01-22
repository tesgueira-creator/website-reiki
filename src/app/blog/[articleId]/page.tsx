"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

// Dados do artigo (em produção viria do Sanity CMS)
const article = {
  id: "o-que-e-reiki-kundalini",
  title: "O Que É Reiki Kundalini e Como Pode Transformar a Sua Vida",
  excerpt:
    "Descubra a poderosa técnica de cura energética que desperta a sua energia vital adormecida.",
  image:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop",
  category: "Reiki",
  author: {
    name: "Rafaella Kally",
    avatar: "/rafaella-profile.png",
    bio: "Terapeuta holística especializada em Reiki Kundalini há mais de 10 anos.",
  },
  date: "15 Janeiro 2026",
  readTime: "8 min",
  content: `
    <p class="lead">O Reiki Kundalini é uma das técnicas de cura energética mais poderosas e transformadoras disponíveis hoje. Combinando os princípios ancestrais do Reiki tradicional com o despertar da energia Kundalini, esta prática oferece uma experiência de cura profunda que abrange todos os níveis do ser - físico, emocional, mental e espiritual.</p>

    <h2>O Que É Energia Kundalini?</h2>
    
    <p>A palavra "Kundalini" vem do sânscrito e significa "enrolada como uma serpente". Na tradição yoguica, a Kundalini é descrita como uma energia primordial que reside na base da coluna vertebral, no chakra raiz. Esta energia está presente em todos os seres humanos desde o nascimento, mas na maioria das pessoas permanece "adormecida" ou latente.</p>
    
    <p>Quando despertada de forma segura e gradual, a Kundalini sobe pela coluna através dos chakras, purificando e equilibrando cada centro energético até alcançar o chakra coronário no topo da cabeça. Este processo leva a estados expandidos de consciência, maior intuição e uma profunda sensação de paz interior.</p>

    <h2>Como Funciona o Reiki Kundalini?</h2>
    
    <p>O Reiki Kundalini combina:</p>
    
    <ul>
      <li><strong>A canalização de energia universal</strong> - característica do Reiki tradicional</li>
      <li><strong>O despertar controlado da Kundalini</strong> - para amplificar o processo de cura</li>
      <li><strong>O equilíbrio dos chakras</strong> - garantindo que a energia flua harmoniosamente</li>
    </ul>
    
    <p>Durante uma sessão, o terapeuta atua como canal para a energia universal, direcionando-a através das mãos para o corpo do cliente. A diferença está na intensidade e profundidade do trabalho energético, que inclui a ativação gradual da Kundalini.</p>

    <h2>Benefícios do Reiki Kundalini</h2>
    
    <h3>Nível Físico</h3>
    <ul>
      <li>Redução de dores crónicas</li>
      <li>Melhoria do sistema imunitário</li>
      <li>Aumento da energia e vitalidade</li>
      <li>Melhor qualidade de sono</li>
    </ul>
    
    <h3>Nível Emocional</h3>
    <ul>
      <li>Libertação de traumas e bloqueios emocionais</li>
      <li>Redução de ansiedade e stress</li>
      <li>Maior estabilidade emocional</li>
      <li>Aumento da autoestima e autoamor</li>
    </ul>
    
    <h3>Nível Mental</h3>
    <ul>
      <li>Maior clareza de pensamento</li>
      <li>Melhoria da concentração</li>
      <li>Libertação de padrões de pensamento negativos</li>
      <li>Desenvolvimento da intuição</li>
    </ul>
    
    <h3>Nível Espiritual</h3>
    <ul>
      <li>Conexão mais profunda com o Eu Superior</li>
      <li>Maior consciência e presença</li>
      <li>Despertar espiritual gradual e seguro</li>
      <li>Sensação de propósito e significado</li>
    </ul>

    <h2>O Que Esperar de Uma Sessão</h2>
    
    <p>Uma sessão típica de Reiki Kundalini dura cerca de 60 minutos e inclui:</p>
    
    <ol>
      <li><strong>Conversa inicial (10 min)</strong> - Para compreender as suas necessidades e intenções</li>
      <li><strong>Relaxamento e centragem (5 min)</strong> - Preparação para receber a energia</li>
      <li><strong>Tratamento energético (40 min)</strong> - O terapeuta trabalha nos seus centros energéticos</li>
      <li><strong>Integração e partilha (5 min)</strong> - Discussão da experiência e orientações</li>
    </ol>
    
    <p>Durante o tratamento, pode sentir sensações como calor, formigueiro, ondas de energia, visualização de cores ou simplesmente um profundo relaxamento. Algumas pessoas adormecem - e está tudo bem, a energia continua a trabalhar.</p>

    <h2>O Reiki Kundalini É Seguro?</h2>
    
    <p>Sim, quando praticado por um terapeuta qualificado e experiente. Ao contrário de algumas práticas de despertar Kundalini mais intensas (como certas formas de Kundalini Yoga), o Reiki Kundalini promove um despertar gradual e suave, respeitando o ritmo natural de cada pessoa.</p>
    
    <p>É importante notar que o Reiki Kundalini é uma terapia complementar e não substitui tratamento médico. Se tem condições de saúde específicas, consulte sempre o seu médico.</p>

    <h2>Pronto Para Experimentar?</h2>
    
    <p>Se sente que chegou o momento de iniciar a sua jornada de transformação, o Reiki Kundalini pode ser o catalisador que procura. Com mais de 10 anos de experiência, tenho acompanhado centenas de pessoas no seu processo de cura e despertar.</p>
    
    <p>A primeira sessão é sempre uma oportunidade de explorar, sem qualquer compromisso. Estou aqui para responder às suas dúvidas e criar um espaço seguro para a sua transformação.</p>
  `,
};

const relatedArticles = [
  {
    id: "7-chakras-guia-completo",
    title: "Os 7 Chakras: Guia Completo",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
    readTime: "12 min",
  },
  {
    id: "meditacao-para-ansiedade",
    title: "5 Técnicas de Meditação para Ansiedade",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop",
    readTime: "6 min",
  },
];

export default function BlogArticlePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-white">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px] max-h-[600px] mb-12">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="content-container">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Blog
              </Link>
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {article.category}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white max-w-4xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Article Content */}
            <article>
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {article.author.name}
                    </p>
                    <p className="text-sm">{article.author.bio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime} de leitura
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary prose-strong:text-gray-800"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Pronta para começar a sua transformação?
                </h3>
                <p className="text-gray-600 mb-6">
                  Agende a sua primeira sessão de Reiki Kundalini e descubra o
                  poder da cura energética.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/servicos"
                    className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all"
                  >
                    Agendar Sessão
                  </Link>
                  <Link
                    href="/questionario"
                    className="inline-flex items-center justify-center border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    Fazer Questionário
                  </Link>
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium">
                      Partilhar:
                    </span>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1877f2] hover:text-white transition-all"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1da1f2] hover:text-white transition-all"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">Guardar</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Author Card */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Sobre a Autora
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {article.author.name}
                    </p>
                    <p className="text-sm text-gray-500">Terapeuta Holística</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Especializada em Reiki Kundalini e terapias energéticas, com
                  mais de 10 anos de experiência.
                </p>
                <Link
                  href="/sobre"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Conhecer mais →
                </Link>
              </div>

              {/* Related Articles */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Artigos Relacionados
                </h4>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.id}`}
                      className="flex gap-4 group"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h5>
                        <p className="text-sm text-gray-500 mt-1">
                          {related.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-primary p-6 rounded-2xl text-white">
                <h4 className="font-semibold mb-3">Newsletter</h4>
                <p className="text-white/80 text-sm mb-4">
                  Receba artigos exclusivos e dicas de bem-estar.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="O seu email..."
                    className="w-full px-4 py-3 rounded-xl text-gray-900 text-sm outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-primary px-4 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all"
                  >
                    Subscrever
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

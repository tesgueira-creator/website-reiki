import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { trackCTAClick } from "@/components/shared/Analytics";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rafaellakally.com";

type ServiceDetail = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  heroImage: string;
  outcomes: string[];
  benefits: string[];
  includes: string[];
  faq: { question: string; answer: string }[];
};

const services: ServiceDetail[] = [
  {
    slug: "reiki-kundalini",
    title: "Reiki Kundalini",
    summary:
      "Reequilíbrio profundo dos chakras para restaurar energia vital e serenidade.",
    description:
      "Sessão individual que desperta e harmoniza a energia Kundalini. Ideal para quem sente cansaço extremo, ansiedade, insónia ou falta de foco. Combina imposição de mãos, respiração e ancoragem para um relaxamento profundo.",
    duration: "60 min",
    price: 55,
    category: "Energia & Vitalidade",
    heroImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80&auto=format&fit=crop",
    outcomes: [
      "Redução de stress e ansiedade na 1.ª sessão",
      "Sono mais profundo e reparador",
      "Sensação de leveza e clareza mental",
    ],
    benefits: [
      "Harmoniza chakras e liberta bloqueios energéticos",
      "Reforça o sistema energético e melhora vitalidade",
      "Promove paz interior e foco emocional",
    ],
    includes: [
      "Avaliação energética inicial",
      "Sessão guiada de 60 min",
      "Sugestões de autocuidado pós-sessão",
    ],
    faq: [
      {
        question: "Quantas sessões são recomendadas?",
        answer:
          "Geralmente 3 sessões semanais ou quinzenais para consolidar resultados, ajustando conforme resposta do corpo.",
      },
      {
        question: "Posso fazer online?",
        answer:
          "Sim. A sessão à distância mantém a mesma estrutura, com orientação prévia por videochamada e follow-up curto no final.",
      },
      {
        question: "Há contraindicações?",
        answer:
          "Não substitui acompanhamento médico. Gestantes ou pessoas com condições clínicas devem informar antes para ajustar a sessão.",
      },
    ],
  },
  {
    slug: "mesa-radionica",
    title: "Mesa Radiónica",
    summary:
      "Diagnóstico e limpeza energética precisa para remover bloqueios e energias densas.",
    description:
      "Ferramenta de radiestesia avançada que identifica padrões, magias e formas-pensamento. Entrega um relatório simples com os ajustes efetuados e recomendações.",
    duration: "60 min",
    price: 50,
    category: "Diagnóstico & Harmonização",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop",
    outcomes: [
      "Mapa claro de bloqueios energéticos",
      "Limpeza de padrões densos e formas-pensamento",
      "Equilíbrio dos chakras e do campo áurico",
    ],
    benefits: [
      "Identifica e limpa interferências energéticas",
      "Apoia decisões ao alinhar a energia do ambiente",
      "Complementa terapias de autoconhecimento",
    ],
    includes: [
      "Levantamento energético inicial",
      "Ajustes e harmonização na mesa",
      "Resumo com recomendações práticas",
    ],
    faq: [
      {
        question: "Preciso estar presente?",
        answer:
          "Não. A sessão pode ser feita à distância; apenas necessito do seu nome completo e intenção principal.",
      },
      {
        question: "O que recebo depois?",
        answer:
          "Recebe um resumo dos ajustes realizados e sugestões simples para manter o equilíbrio.",
      },
      {
        question: "Com que frequência devo repetir?",
        answer:
          "Mensalmente ou a cada 6 semanas, conforme a intensidade dos bloqueios identificados.",
      },
    ],
  },
  {
    slug: "terapia-multidimensional",
    title: "Terapia Multidimensional",
    summary:
      "Cura pelo coração para libertar traumas emocionais e padrões repetitivos.",
    description:
      "Também conhecida como 'cirurgia espiritual', atua em camadas emocionais profundas com suporte da equipa espiritual. Indicada para lutos, ansiedade persistente e sensação de estagnação.",
    duration: "50 min",
    price: 50,
    category: "Cura Emocional",
    heroImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80&auto=format&fit=crop",
    outcomes: [
      "Alívio emocional e sensação de paz",
      "Libertação de padrões de autocobrança",
      "Maior clareza sobre próximos passos pessoais",
    ],
    benefits: [
      "Trabalha traumas sem reviver a dor",
      "Apoia processos de luto e transições",
      "Reforça autoestima e autocompaixão",
    ],
    includes: [
      "Check-in breve para intenção da sessão",
      "Sessão guiada de 50 min",
      "Follow-up curto com recomendações",
    ],
    faq: [
      {
        question: "Vou sentir algo físico?",
        answer:
          "Pode sentir calor, formigueiro ou relaxamento profundo. Cada pessoa responde de forma única.",
      },
      {
        question: "É necessário acreditar?",
        answer:
          "Não. Basta estar recetivo e em ambiente tranquilo; a prática não exige crenças específicas.",
      },
      {
        question: "Posso combinar com outras terapias?",
        answer:
          "Sim. Informe para coordenarmos intervalos seguros e evitar sobrecarga emocional.",
      },
    ],
  },
  {
    slug: "leitura-aura",
    title: "Leitura de Aura",
    summary:
      "Mapeie padrões, dons e bloqueios que influenciam decisões e relacionamentos.",
    description:
      "Análise dos campos áuricos para identificar temas recorrentes, talentos e pontos de atenção. Ótimo para ganhar clareza em momentos de decisão.",
    duration: "45 min",
    price: 60,
    category: "Clareza & Propósito",
    heroImage:
      "https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=1200&q=80&auto=format&fit=crop",
    outcomes: [
      "Clareza sobre padrões e relacionamentos",
      "Reconhecimento de talentos e potenciais",
      "Próximos passos práticos com confiança",
    ],
    benefits: [
      "Identifica bloqueios e potenciais",
      "Auxilia decisões profissionais e pessoais",
      "Entrega insights aplicáveis imediatamente",
    ],
    includes: [
      "Leitura guiada em tempo real",
      "Resumo verbal com principais insights",
      "3 recomendações práticas para 30 dias",
    ],
    faq: [
      {
        question: "Preciso preparar algo?",
        answer:
          "Traga 1-2 perguntas ou temas prioritários. Esteja em local calmo para receber as informações.",
      },
      {
        question: "Como é entregue o resultado?",
        answer:
          "O resultado é partilhado na sessão; pode gravar áudio ou tomar notas.",
      },
      {
        question: "Posso repetir em quanto tempo?",
        answer: "Recomendo esperar 4-6 semanas para integrar as orientações.",
      },
    ],
  },
  {
    slug: "limpeza-energetica",
    title: "Limpeza Energética",
    summary:
      "Remoção de densidades e reorganização do campo energético pessoal.",
    description:
      "Sessão focada em limpar cargas emocionais, inveja ou ambientes pesados que afetam humor e produtividade.",
    duration: "60 min",
    price: 75,
    category: "Proteção & Reequilíbrio",
    heroImage:
      "https://images.unsplash.com/photo-1578603320349-84efc63a2b98?w=1200&q=80&auto=format&fit=crop",
    outcomes: [
      "Sensação imediata de leveza",
      "Melhoria de humor e foco",
      "Ambiente pessoal mais harmonizado",
    ],
    benefits: [
      "Limpa cargas densas e miasmas",
      "Harmoniza casa ou espaço de trabalho",
      "Reforça proteção energética",
    ],
    includes: [
      "Avaliação rápida do campo",
      "Técnicas de limpeza e selamento",
      "Sugestões de manutenção diária",
    ],
    faq: [
      {
        question: "Serve para ambientes?",
        answer:
          "Sim, pode ser combinada com limpeza de espaços. Informe a necessidade específica.",
      },
      {
        question: "Quanto tempo dura o efeito?",
        answer:
          "Depende do estilo de vida e exposição. Manutenção mensal mantém estabilidade.",
      },
      {
        question: "Funciona online?",
        answer:
          "Sim. A limpeza é feita à distância com igual protocolo e envio de orientações.",
      },
    ],
  },
  {
    slug: "meditacao-guiada",
    title: "Meditação Guiada",
    summary:
      "Sessões personalizadas para acalmar a mente e equilibrar os chakras.",
    description:
      "Prática guiada com foco em respiração, visualização e ancoragem. Ideal para quem precisa reduzir ansiedade, melhorar sono e criar rotina de pausa consciente.",
    duration: "50 min",
    price: 50,
    category: "Mindfulness & Relaxamento",
    heroImage:
      "https://images.unsplash.com/photo-1594432003349-6b0db3a68e6c?w=1200&q=80&auto=format&fit=crop",
    outcomes: [
      "Redução de tensão e aceleração mental",
      "Rotina simples de meditação para casa",
      "Melhor qualidade de sono",
    ],
    benefits: [
      "Guias práticas e adaptadas ao seu ritmo",
      "Integra técnicas de grounding e respiração",
      "Adequado para iniciantes ou praticantes irregulares",
    ],
    includes: [
      "Sessão guiada com áudio",
      "Sugestão de prática de 10-15 min diária",
      "Checklist de preparação de ambiente",
    ],
    faq: [
      {
        question: "Preciso ter experiência?",
        answer: "Não. Começamos com técnicas simples e progressivas.",
      },
      {
        question: "Recebo o áudio?",
        answer: "Sim, pode receber um áudio curto para praticar depois.",
      },
      {
        question: "Ajuda no sono?",
        answer:
          "Sim, técnicas de respiração e relaxamento ajudam a adormecer mais rápido.",
      },
    ],
  },
  {
    slug: "consultoria-energetica",
    title: "Consultoria Energética",
    summary:
      "Orientação estratégica para decisões pessoais ou profissionais com leitura energética.",
    description:
      "Sessão de orientação profunda para mapear padrões e próximos passos. Útil em mudanças de carreira, relacionamento ou grandes decisões.",
    duration: "75 min",
    price: 100,
    category: "Clareza & Estratégia",
    heroImage:
      "https://images.unsplash.com/photo-1610332049839-cd79d8b83e60?w=1200&q=80&auto=format&fit=crop",
    outcomes: [
      "Plano claro para o próximo trimestre",
      "Identificação de bloqueios que travam decisões",
      "Estratégias energéticas e práticas diárias",
    ],
    benefits: [
      "Combina leitura energética com aconselhamento",
      "Ajuda a priorizar decisões críticas",
      "Entregável simples com 3 ações prioritárias",
    ],
    includes: [
      "Briefing inicial",
      "Sessão estratégica de 75 min",
      "Mini-plano em 24h com próximos passos",
    ],
    faq: [
      {
        question: "Serve para negócios?",
        answer: "Sim, pode ser aplicado a decisões de carreira ou projetos.",
      },
      {
        question: "Há follow-up?",
        answer: "Inclui um follow-up curto por mensagem para dúvidas do plano.",
      },
      {
        question: "Online funciona?",
        answer:
          "Sim, realizamos por videochamada com partilha de ecrã para o plano.",
      },
    ],
  },
  {
    slug: "cura-holistica",
    title: "Cura Holística",
    summary:
      "Sessão integrativa que combina técnicas energéticas e orientação emocional.",
    description:
      "Abordagem completa para alinhar corpo, mente e espírito. Mistura reiki, respiração e aconselhamento breve para quem quer um reset geral.",
    duration: "90 min",
    price: 120,
    category: "Equilíbrio Integral",
    heroImage:
      "https://images.unsplash.com/photo-1599598427862-5e9ebf9a4d10?w=1200&q=80&auto=format&fit=crop",
    outcomes: [
      "Relaxamento profundo e clareza",
      "Plano simples de autocuidado de 7 dias",
      "Reequilíbrio energético completo",
    ],
    benefits: [
      "Sessão longa para tratar várias camadas",
      "Integra técnicas para corpo e mente",
      "Ideal para quem quer reset rápido",
    ],
    includes: [
      "Check-in inicial",
      "Combinação de técnicas energéticas",
      "Plano de 7 dias pós-sessão",
    ],
    faq: [
      {
        question: "Quantas vezes devo fazer?",
        answer:
          "Mensal ou bimestralmente, conforme necessidade e ritmo de integração.",
      },
      {
        question: "Posso escolher técnicas?",
        answer:
          "Ajustamos conforme objetivo e conforto; explique preferências no início.",
      },
      {
        question: "Inclui acompanhamento?",
        answer:
          "Inclui mensagem de follow-up breve para ajustar o plano de 7 dias.",
      },
    ],
  },
  {
    slug: "pack-alinhamento-total",
    title: "Pack Alinhamento Total",
    summary:
      "Combo de Mesa Radiónica + Sessão de Reiki para transformação completa.",
    description:
      "Sequência em duas etapas: diagnóstico e limpeza profunda na mesa, seguido de reposição energética com Reiki. Ideal para quem quer reset completo e economia em pacote.",
    duration: "2 sessões",
    price: 90,
    category: "Programa Integrado",
    heroImage:
      "https://images.unsplash.com/photo-1533073526757-2c8ca94d4ad0?w=1200&h=800&fit=crop",
    outcomes: [
      "Mapa claro de bloqueios + limpeza",
      "Reposição energética completa",
      "Economia versus sessões avulsas",
    ],
    benefits: [
      "Diagnóstico + limpeza + reposição",
      "Planeamento de 2 semanas para consolidação",
      "Acompanha recomendações entre sessões",
    ],
    includes: [
      "Mesa Radiónica (sessão 1)",
      "Reiki Kundalini (sessão 2)",
      "Check-in rápido pós-programa",
    ],
    faq: [
      {
        question: "Qual o intervalo entre sessões?",
        answer:
          "Recomendo 7-10 dias entre a mesa e o reiki para integrar os ajustes.",
      },
      {
        question: "Posso alterar a ordem?",
        answer:
          "Mantemos primeiro diagnóstico e limpeza para maximizar o efeito do reiki.",
      },
      {
        question: "Inclui acompanhamento?",
        answer:
          "Sim, um follow-up curto após a segunda sessão para ajustar autocuidado.",
      },
    ],
  },
];

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};

  const title = `${service.title} | Terapias por Rafaella Kally`;
  const description = service.summary;
  const url = `${baseUrl}/servicos/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) return notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.category,
    description: service.description,
    provider: {
      "@type": "Person",
      name: "Rafaella Kally",
    },
    areaServed: "Portugal",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: service.price,
      url: `${baseUrl}/servicos/${service.slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const handleCTA = (label: string) => () =>
    trackCTAClick(label, `/agendar?servico=${service.slug}`);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-28 pb-16 bg-gradient-to-b from-white to-gray-50">
          <div className="content-container content-grid items-center">
            <div className="col-span-12 lg:col-span-6 space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">
                {service.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-main">
                {service.title}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                {service.summary}
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                <span className="px-3 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                  {service.duration}
                </span>
                <span className="px-3 py-2 rounded-full bg-gray-900 text-white font-semibold">
                  {service.price}€
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/agendar?servico=${service.slug}`}
                  onClick={handleCTA("Agendar-servico")}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary-dark transition"
                >
                  Agendar agora
                </Link>
                <Link
                  href="/contacto"
                  onClick={handleCTA("Contactar-servico")}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
                >
                  Falar por mensagem
                </Link>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-secondary">
                {service.outcomes.map((item) => (
                  <li
                    key={item}
                    className="p-3 rounded-lg bg-white border border-border shadow-sm"
                  >
                    ✅ {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 lg:col-span-6 relative h-[420px] md:h-[520px] mt-8 lg:mt-0">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="content-container content-grid gap-10">
            <div className="col-span-12 md:col-span-7 space-y-6">
              <SectionTitle
                label="Detalhes da terapia"
                title="O que acontece na sessão"
                subtitle="Transparência total para que saiba o que esperar antes de agendar."
              />
              <p className="text-text-secondary leading-relaxed">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-border bg-white shadow-sm">
                  <h3 className="font-semibold text-text-main mb-3">
                    Benefícios principais
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    {service.benefits.map((benefit) => (
                      <li key={benefit}>• {benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-xl border border-border bg-white shadow-sm">
                  <h3 className="font-semibold text-text-main mb-3">Inclui</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    {service.includes.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white border border-border shadow-lg">
                <h3 className="text-xl font-semibold text-text-main mb-4">
                  Resumo
                </h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>Duração:</strong> {service.duration}
                  </li>
                  <li>
                    <strong>Valor:</strong> {service.price}€
                  </li>
                  <li>
                    <strong>Modalidade:</strong> Presencial ou online
                  </li>
                  <li>
                    <strong>Indicado para:</strong> {service.category}
                  </li>
                </ul>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    href={`/agendar?servico=${service.slug}`}
                    onClick={handleCTA("Agendar-resumo")}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary-dark transition"
                  >
                    Agendar sessão
                  </Link>
                  <Link
                    href="/faq"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
                  >
                    Ver perguntas frequentes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="content-container content-grid gap-8">
            <div className="col-span-12 md:col-span-10 md:col-start-2 text-center">
              <SectionTitle
                label="Perguntas frequentes"
                title="FAQ desta terapia"
                subtitle="Respostas rápidas para decidir com confiança."
                centered
              />
            </div>

            <div className="col-span-12 md:col-span-10 md:col-start-2 space-y-4">
              {service.faq.map((item) => (
                <details
                  key={item.question}
                  className="group border border-border rounded-xl bg-gray-50 p-4 open:bg-white open:shadow-sm"
                >
                  <summary className="font-semibold text-text-main cursor-pointer flex justify-between items-center">
                    {item.question}
                    <span className="text-primary text-sm group-open:rotate-45 transition">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Footer />
    </>
  );
}

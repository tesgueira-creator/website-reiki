import { Metadata } from "next";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Heart, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Casos de Sucesso | Transformações Reais com Reiki",
  description:
    "Descobre histórias reais de transformação através de Reiki Kundalini e terapias holísticas. Resultados comprovados em ansiedade, stress, dor crónica e bem-estar emocional.",
  keywords: [
    "casos de sucesso reiki",
    "testemunhos reiki",
    "resultados reiki",
    "antes e depois reiki",
    "cura com reiki",
    "transformação pessoal",
  ],
};

interface CaseStudy {
  id: string;
  clientName: string;
  age: string;
  issue: string;
  before: string;
  treatment: string;
  duration: string;
  sessions: number;
  after: string;
  results: string[];
  quote: string;
  image?: string;
}

// EXEMPLO - Replace with real case studies
const caseStudies: CaseStudy[] = [
  {
    id: "maria-ansiedade",
    clientName: "(EXEMPLO) Maria S.",
    age: "42 anos",
    issue: "Ansiedade e Insónia Crónicas",
    before:
      "Maria sofria de ansiedade severa há 5 anos, com crises de pânico frequentes e insónia. Tomava medicação ansiolítica diariamente e evitava situações sociais. Relatava acordar várias vezes durante a noite com taquicardia.",
    treatment:
      "Programa de 8 sessões de Reiki Kundalini com foco em chakra cardíaco e plexo solar",
    duration: "3 meses",
    sessions: 8,
    after:
      "Após o tratamento, Maria reporta redução de 80% nas crises de ansiedade. Conseguiu reduzir a medicação (com acompanhamento médico) e dorme 7-8 horas por noite sem interrupções. Retomou actividades sociais e sente-se 'como uma nova pessoa'.",
    results: [
      "Redução de 80% nas crises de ansiedade",
      "Melhoria de 90% na qualidade do sono",
      "Redução de 50% na medicação ansiolítica (supervisionado)",
      "Aumento significativo na confiança social",
    ],
    quote:
      "O Reiki mudou completamente a minha vida. Hoje consigo respirar fundo e sentir paz. A Rafaella é uma terapeuta incrível que me ajudou a recuperar a minha vida.",
    image: "/case-studies/maria-ansiedade.jpg",
  },
  {
    id: "joao-dor-cronica",
    clientName: "(EXEMPLO) João P.",
    age: "55 anos",
    issue: "Dor Crónica nas Costas",
    before:
      "João trabalhava num escritório e sofria de dores lombares intensas há 8 anos. A dor irradiava para as pernas e limitava a sua mobilidade. Tinha tentado fisioterapia, medicação e acupunctura com resultados limitados.",
    treatment:
      "Combinação de Reiki Kundalini e Mesa Radiónica (6 sessões + 4 sessões à distância)",
    duration: "2 meses",
    sessions: 10,
    after:
      "João experimenta uma redução de 70% na intensidade da dor. Consegue estar sentado durante todo o dia de trabalho sem desconforto severo e retomou caminhadas aos fins-de-semana. A qualidade de vida melhorou drasticamente.",
    results: [
      "Redução de 70% na intensidade da dor lombar",
      "Melhoria de 60% na mobilidade e flexibilidade",
      "Eliminação total da medicação para a dor",
      "Retorno a actividades físicas (caminhada, jardinagem)",
    ],
    quote:
      "Passei anos a sofrer em silêncio. O Reiki deu-me a minha mobilidade de volta. Já não acordo com dores e posso brincar com os meus netos novamente.",
    image: "/case-studies/joao-dor.jpg",
  },
  {
    id: "ana-depressao",
    clientName: "(EXEMPLO) Ana C.",
    age: "38 anos",
    issue: "Depressão Pós-Parto e Fadiga Extrema",
    before:
      "Ana desenvolveu depressão pós-parto após o nascimento do segundo filho. Sentia-se constantemente exausta, sem energia para cuidar dos filhos, e tinha pensamentos negativos recorrentes. Chorava frequentemente e sentia-se desconectada da família.",
    treatment:
      "Programa intensivo de Terapia Multidimensional (12 sessões) com sessões quinzenais",
    duration: "6 meses",
    sessions: 12,
    after:
      "Ana recuperou a sua energia vital e alegria de viver. Os níveis de energia aumentaram drasticamente e consegue cuidar dos filhos com amor e paciência. A ligação emocional com a família foi restaurada e os pensamentos negativos praticamente desapareceram.",
    results: [
      "Aumento de 85% nos níveis de energia",
      "Eliminação de pensamentos negativos recorrentes",
      "Restauração da ligação emocional com os filhos",
      "Retorno a hobbies e actividades de auto-cuidado",
    ],
    quote:
      "A Rafaella salvou-me. Eu estava num buraco escuro e ela trouxe luz de volta à minha vida. Hoje sou a mãe que sempre quis ser.",
    image: "/case-studies/ana-depressao.jpg",
  },
  {
    id: "pedro-stress",
    clientName: "(EXEMPLO) Pedro M.",
    age: "47 anos",
    issue: "Stress Extremo e Burnout Profissional",
    before:
      "Pedro era CEO de uma empresa e estava em burnout completo. Trabalhava 14 horas por dia, tinha hipertensão, gastrite de stress e não conseguia desligar do trabalho. Os relacionamentos pessoais estavam deteriorados.",
    treatment:
      "Sessões de Reiki Kundalini semanais (8 sessões) + Aconselhamento Holístico",
    duration: "2 meses",
    sessions: 8,
    after:
      "Pedro aprendeu a estabelecer limites saudáveis no trabalho e implementou práticas de auto-cuidado diárias. A pressão arterial normalizou, a gastrite desapareceu e os relacionamentos melhoraram significativamente. Sente-se em controlo da sua vida.",
    results: [
      "Normalização da pressão arterial (sem medicação)",
      "Eliminação da gastrite de stress",
      "Redução de 60% nas horas de trabalho semanais",
      "Melhoria dramática nos relacionamentos familiares",
    ],
    quote:
      "Estava a matar-me lentamente com o trabalho. O Reiki ensinou-me que a minha saúde e família vêm primeiro. Hoje sou mais produtivo trabalhando menos horas.",
    image: "/case-studies/pedro-stress.jpg",
  },
];


export default function CasosSuccessPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="content-container">
          <Link
            href="/depoimentos"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition mb-8"
          >
            <ArrowLeft size={20} />
            <span>Voltar aos Depoimentos</span>
          </Link>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Casos de Sucesso
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Histórias reais de transformação através de Reiki Kundalini e
              terapias holísticas. Resultados comprovados, vidas mudadas.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16">
        <div className="content-container">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="content-container text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              A Tua História de Transformação Começa Aqui
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Se te identificaste com alguma destas histórias, sabes que a
              mudança é possível. Dá o primeiro passo hoje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/agendar"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Agendar Primeira Sessão
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-primary border-2 border-primary px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Fazer uma Pergunta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

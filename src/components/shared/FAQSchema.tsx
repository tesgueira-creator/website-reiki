/**
 * FAQ Schema Markup for SEO (Rich Snippets)
 * Displays FAQ content in Google Search Results
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Example usage in FAQ page:
export const defaultFAQs: FAQItem[] = [
  {
    question: "O que é Reiki Kundalini?",
    answer:
      "Reiki Kundalini é uma terapia energética que combina a técnica tradicional de Reiki com o despertar da energia Kundalini. Esta prática promove o equilíbrio dos chakras, alívio do stress, ansiedade e dores físicas, além de estimular o crescimento espiritual e a conexão interior.",
  },
  {
    question: "Quanto tempo dura uma sessão de Reiki?",
    answer:
      "Uma sessão típica de Reiki Kundalini dura entre 50 a 60 minutos. Este tempo permite um trabalho energético profundo e completo, incluindo a avaliação inicial, a sessão de cura e um momento de integração no final.",
  },
  {
    question: "Preciso acreditar em Reiki para funcionar?",
    answer:
      "Não é necessário acreditar em Reiki para beneficiar dos seus efeitos. O Reiki é uma energia universal que atua independentemente das crenças pessoais. Muitas pessoas céticas experimentaram resultados surpreendentes. A abertura e receptividade ajudam, mas não são essenciais.",
  },
  {
    question: "Quantas sessões são necessárias?",
    answer:
      "O número de sessões varia conforme as necessidades individuais. Para questões agudas como stress ou ansiedade, 3-5 sessões podem ser suficientes. Para transformações mais profundas ou condições crónicas, recomenda-se um programa de 8-12 sessões. Uma avaliação inicial ajudará a determinar o plano ideal para si.",
  },
  {
    question: "Reiki pode substituir tratamentos médicos?",
    answer:
      "Não, o Reiki é uma terapia complementar e não substitui diagnósticos ou tratamentos médicos convencionais. Funciona melhor em conjunto com os cuidados médicos tradicionais, potencializando os processos de cura natural do corpo. Sempre consulte o seu médico para questões de saúde.",
  },
  {
    question: "É possível fazer Reiki à distância?",
    answer:
      "Sim! O Reiki à distância (também chamado de Reiki Remoto) é igualmente eficaz. A energia não tem limites de espaço ou tempo. Oferecemos sessões online através de videochamada onde você pode receber os mesmos benefícios do conforto da sua casa.",
  },
  {
    question: "Qual é a diferença entre Reiki e Mesa Radiónica?",
    answer:
      "O Reiki Kundalini é uma técnica de canalização de energia universal para harmonização e cura. A Mesa Radiónica é uma ferramenta de diagnóstico energético que identifica bloqueios, magias ou influências negativas antes de fazer limpeza energética profunda. Ambas podem ser combinadas para resultados mais completos.",
  },
  {
    question: "O que devo esperar durante uma sessão?",
    answer:
      "Durante a sessão, você estará deitado confortavelmente enquanto a energia é canalizada. Pode sentir calor, formigueiro, ondas de relaxamento ou ver cores. Algumas pessoas adormecem. Cada experiência é única e válida. Após a sessão, é comum sentir-se profundamente relaxado, renovado ou emocionalmente mais leve.",
  },
];

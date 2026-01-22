import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export const metadata = {
  title: "Depoimentos | Rafaella Kally - Histórias de Transformação",
  description:
    "Leia os depoimentos de clientes que foram transformados pelas terapias de Rafaella Kally.",
};

const testimonials = [
  {
    name: "Maria Silva",
    text: "A Rafaella transformou completamente a minha vida. Sinto-me mais equilibrada, em paz comigo mesma e com uma conexão espiritual muito mais profunda. As sessões são sempre um espaço de segurança e amor.",
    rating: 5,
  },
  {
    name: "João Costa",
    text: "Depois de várias sessões de Reiki, percebi como estava desconectado da minha energia. Agora sinto-me revitalizado, focado e com uma clareza mental que há anos não tinha.",
    rating: 5,
  },
  {
    name: "Ana Mendes",
    text: "A leitura de aura foi reveladora. Compreendi finalmente os padrões que me estavam a bloquear. Recomendo vivamente! A Rafaella é uma verdadeira profissional.",
    rating: 5,
  },
  {
    name: "Paulo Ferreira",
    text: "Procurava orientação espiritual há muito tempo. A Rafaella é uma verdadeira guia e terapeuta de excelência. Cada sessão é uma bênção.",
    rating: 5,
  },
  {
    name: "Catarina Oliveira",
    text: "Cheguei à Rafaella em desespero. Após várias sessões de cura holística, sinto que renasci. O meu corpo, mente e espírito estão alinhados. Eternamente grata!",
    rating: 5,
  },
  {
    name: "Miguel Santos",
    text: "A sessão de meditação guiada da Rafaella mudou a forma como vejo a vida. Agora tenho ferramentas para lidar com o stress e encontrar paz no caos diário.",
    rating: 5,
  },
  {
    name: "Inês Rocha",
    text: "A limpeza energética foi exatamente o que eu precisava. Sinto a diferença imediatamente. A Rafaella tem um dom especial para trabalhar com energia.",
    rating: 5,
  },
  {
    name: "David Martins",
    text: "Cético no início, mas depois de uma sessão com a Rafaella, sou um crente. A transformação é real. Recomendo a todos os meus amigos.",
    rating: 5,
  },
];

export default function DepoimentosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container content-grid">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <SectionTitle
              label="Testemunhas de Transformação"
              title="O que Dizem os Clientes"
              subtitle="Histórias reais de pessoas que descobriram cura, paz e equilíbrio através das terapias"
            />
          </div>

          <div className="col-span-12 grid grid-cols-12 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="col-span-12 md:col-span-6">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="col-span-12 mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl grid grid-cols-12 gap-6 text-center">
            {[
              { num: "200+", label: "Clientes Transformados" },
              { num: "4.9★", label: "Avaliação Média" },
              { num: "10+", label: "Anos de Experiência" },
            ].map((stat, index) => (
              <div key={index} className="col-span-12 md:col-span-4">
                <p className="font-serif text-4xl font-bold text-primary mb-2">
                  {stat.num}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

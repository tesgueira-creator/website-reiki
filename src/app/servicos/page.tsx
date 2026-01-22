import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";

export const metadata = {
  title: "Serviços | Rafaella Kally - Terapias Holísticas",
  description:
    "Explore todos os serviços de terapia holística, Reiki Kundalini, leitura de aura e mais.",
};

const services = [
  {
    title: "Reiki Kundalini",
    description:
      "Desbloqueie a sua energia vital e desperte o seu potencial interior através da energia Kundalini.",
    duration: "60 minutos",
    price: 80,
    isPopular: true,
    slug: "reiki-kundalini",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Leitura de Aura",
    description:
      "Compreenda os padrões energéticos que influenciam a sua vida e bem-estar.",
    duration: "45 minutos",
    price: 60,
    slug: "leitura-aura",
    image: "https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Cura Holística",
    description:
      "Uma abordagem integrativa para o equilíbrio corpo-mente-espírito.",
    duration: "90 minutos",
    price: 120,
    slug: "cura-holistca",
    image: "https://images.unsplash.com/photo-1599598427862-5e9ebf9a4d10?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Consultoria Energética",
    description:
      "Sessões de orientação profunda para desbloquear padrões emocionais e espirituais.",
    duration: "75 minutos",
    price: 100,
    slug: "consultoria-energetica",
    image: "https://images.unsplash.com/photo-1610332049839-cd79d8b83e60?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Meditação Guiada",
    description:
      "Práticas de meditação personalizadas para equilibrar chakras e encontrar paz interior.",
    duration: "50 minutos",
    price: 50,
    slug: "meditacao-guiada",
    image: "https://images.unsplash.com/photo-1594432003349-6b0db3a68e6c?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Limpeza Energética",
    description:
      "Removiment de bloqueios energéticos e purificação do espaço sagrado pessoal.",
    duration: "60 minutos",
    price: 75,
    slug: "limpeza-energetica",
    image: "https://images.unsplash.com/photo-1578603320349-84efc63a2b98?w=600&q=80&auto=format&fit=crop",
  },
];

export default function ServicosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container content-grid">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <SectionTitle
              label="Catálogo Completo"
              title="Todos os Serviços & Terapias"
              subtitle="Explore a gama completa de terapias personalizadas para o seu bem-estar e transformação espiritual"
            />
          </div>

          <div className="col-span-12 grid grid-cols-12 gap-6">
            {services.map((service) => (
              <div key={service.slug} className="col-span-12 md:col-span-6 lg:col-span-4">
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="col-span-12 mt-12 bg-white p-8 rounded-xl border border-border">
            <h3 className="font-serif text-2xl font-bold text-text-main mb-6">
              Processo de Agendamento
            </h3>
            <div className="grid grid-cols-12 gap-6">
              {[
                {
                  num: "1",
                  title: "Contacte",
                  desc: "Envie uma mensagem ou ligue para agendar a sua consulta inicial.",
                },
                {
                  num: "2",
                  title: "Consulta",
                  desc: "Discutiremos as suas necessidades e qual serviço é mais adequado.",
                },
                {
                  num: "3",
                  title: "Sessão",
                  desc: "Vivencia a transformação em um ambiente seguro e sagrado.",
                },
              ].map((step, index) => (
                <div key={index} className="col-span-12 md:col-span-4 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold mb-4">
                    {step.num}
                  </div>
                  <h4 className="font-semibold text-text-main mb-2">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

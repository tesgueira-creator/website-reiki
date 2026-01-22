import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHeroSection } from "@/components/layout/AboutHeroSection";
import { ValuesSection } from "@/components/layout/ValuesSection";
import { CTASection } from "@/components/layout/CTASection";

export const metadata = {
  title: "Sobre Mim | Rafaella Kally - Terapeuta Holística",
  description:
    "Conheça a história, formação e especialidades de Rafaella Kally, terapeuta holística especializada em Reiki Kundalini.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <AboutHeroSection />

        {/* Bio Section */}
        <section className="bg-white section-padding">
          <div className="content-container content-grid">
            <div className="col-span-12 md:col-span-4">
              <div className="bg-background p-8 rounded-xl">
                <h3 className="font-serif text-2xl font-bold text-text-main mb-6">
                  Dados Profissionais
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-primary font-semibold text-3xl">10+</p>
                    <p className="text-muted-foreground text-sm">
                      Anos de Experiência
                    </p>
                  </div>
                  <div>
                    <p className="text-primary font-semibold text-3xl">
                      200+
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Clientes Transformados
                    </p>
                  </div>
                  <div>
                    <p className="text-primary font-semibold text-3xl">
                      4.9★
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Avaliação Média
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif text-3xl font-bold text-text-main mb-6">
                Minha Jornada de Transformação
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                A minha jornada começou há mais de 10 anos, quando passei por
                uma transformação pessoal profunda. Depois de experienciar a
                cura através de práticas energéticas e espirituais, compreendi
                o meu propósito: facilitar o mesmo tipo de transformação para
                outras pessoas.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                Completei várias certificações internacionais em Reiki
                Kundalini, terapias holísticas e coaching espiritual. Cada
                cliente é tratado como uma alma única, merecedora de uma
                abordagem personalizada e compassiva.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Acredito que a verdadeira cura é holística - envolve o corpo,
                a mente e o espírito. O meu trabalho é oferecer ferramentas,
                orientação e espaço seguro para que cada pessoa redescubra a
                sua força interior.
              </p>

              <h3 className="font-serif text-2xl font-bold text-text-main mt-10 mb-4">
                Formações & Certificações
              </h3>
              <ul className="space-y-3">
                {[
                  "Reiki Kundalini - Certificação Nível Master",
                  "Terapias Holísticas Integrativas - Instituto de Bem-estar",
                  "Leitura de Aura - Especialização Avançada",
                  "Coaching Espiritual e Orientação de Vida",
                  "Meditação e Chakra Balancing",
                ].map((cert, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span className="text-text-secondary">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ValuesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Termos e Condições | Rafaella Kally",
  description: "Termos e Condições de uso dos serviços de Rafaella Kally.",
};

export default function TermosCondicoesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container">
          <SectionTitle
            label="Legal"
            title="Termos e Condições"
            subtitle="Regras de utilização dos nossos serviços"
          />

          <div className="prose prose-lg max-w-4xl mx-auto mt-12 text-text-secondary bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h3>1. Termos</h3>
            <p>
              Ao aceder ao site Rafaella Kally, concorda em cumprir estes termos
              de serviço, todas as leis e regulamentos aplicáveis e concorda que
              é responsável pelo cumprimento de todas as leis locais aplicáveis.
              Se não concordar com algum destes termos, está proibido de usar ou
              aceder a este site.
            </p>

            <h3>2. Uso de Licença</h3>
            <p>
              É concedida permissão para baixar temporariamente uma cópia dos
              materiais (informações ou software) no site Rafaella Kally, apenas
              para visualização transitória pessoal e não comercial. Esta é a
              concessão de uma licença, não uma transferência de título.
            </p>

            <h3>3. Isenção de Responsabilidade</h3>
            <p>
              Os materiais no site da Rafaella Kally são fornecidos &quot;como
              estão&quot;. Rafaella Kally não oferece garantias, expressas ou
              implícitas, e, por este meio, isenta e nega todas as outras
              garantias, incluindo, sem limitação, garantias implícitas ou
              condições de comercialização, adequação a um fim específico ou não
              violação de propriedade intelectual.
            </p>
            <p>
              As terapias oferecidas não substituem tratamento médico ou
              psicológico convencional. São terapias complementares destinadas
              ao bem-estar e equilíbrio energético.
            </p>

            <h3>4. Limitações</h3>
            <p>
              Em nenhum caso a Rafaella Kally ou os seus fornecedores serão
              responsáveis por quaisquer danos (incluindo, sem limitação, danos
              por perda de dados ou lucro ou devido a interrupção dos negócios)
              decorrentes do uso ou da incapacidade de usar os materiais em
              Rafaella Kally.
            </p>

            <h3>5. Agendamentos e Cancelamentos</h3>
            <p>
              Os agendamentos estão sujeitos a disponibilidade. Cancelamentos
              devem ser feitos com pelo menos 24 horas de antecedência para
              reembolso total ou reagendamento sem custos. Cancelamentos com
              menos de 24 horas podem não ser reembolsáveis.
            </p>

            <h3>6. Lei Aplicável</h3>
            <p>
              Estes termos e condições são regidos e interpretados de acordo com
              as leis de Portugal e o utilizador submete-se irrevogavelmente à
              jurisdição exclusiva dos tribunais naquele estado ou localidade.
            </p>

            <p className="border-t pt-8 mt-8 text-sm text-gray-500">
              Última atualização: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Política de Privacidade | Rafaella Kally",
  description:
    "Política de Privacidade e Proteção de Dados do website Rafaella Kally.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container">
          <SectionTitle
            label="Legal"
            title="Política de Privacidade"
            subtitle="O nosso compromisso com a proteção dos seus dados"
          />

          <div className="prose prose-lg max-w-4xl mx-auto mt-12 text-text-secondary bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h3>1. Introdução</h3>
            <p>
              A sua privacidade é importante para nós. É política do website
              Rafaella Kally respeitar a sua privacidade em relação a qualquer
              informação sua que possamos recolher no site Rafaella Kally, e
              outros sites que possuímos e operamos.
            </p>

            <h3>2. Recolha de Dados</h3>
            <p>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço (como agendamento de
              consultas ou envio de newsletters). Fazemo-lo por meios justos e
              legais, com o seu conhecimento e consentimento. Também informamos
              por que estamos a recolher e como será usado.
            </p>

            <h3>3. Uso de Dados</h3>
            <p>
              Apenas retemos as informações recolhidas pelo tempo necessário
              para fornecer o serviço solicitado. Quando armazenamos dados,
              protegemo-los dentro de meios comercialmente aceitáveis para
              evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </p>

            <h3>4. Partilha de Dados</h3>
            <p>
              Não partilhamos informações de identificação pessoal publicamente
              ou com terceiros, exceto quando exigido por lei.
            </p>

            <h3 id="cookies">5. Cookies</h3>
            <p>
              O nosso site usa cookies essenciais para funcionar e cookies
              analíticos (opcionais) para medir performance. Pode gerir o seu
              consentimento no banner de cookies a qualquer momento.
            </p>

            <h3>6. Direitos do Utilizador</h3>
            <p>
              O utilizador é livre para recusar a nossa solicitação de
              informações pessoais, entendendo que talvez não possamos fornecer
              alguns dos serviços desejados. Tem o direito de aceder, retificar
              ou apagar os seus dados pessoais.
            </p>

            <h3>7. Contacto</h3>
            <p>
              Para qualquer questão sobre esta política de privacidade, por
              favor contacte-nos através do email de suporte listado na página
              de contacto.
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

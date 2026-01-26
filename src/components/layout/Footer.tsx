"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-black text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="content-container pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-3xl font-bold text-primary mb-4">
              Rafaella Kally
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm mb-6 max-w-xs">
              Cura emocional e conexão espiritual através de Reiki Kundalini e
              terapias holísticas.
            </p>

            {/* CTA Principal no Footer */}
            <Link
              href="/agendar"
              className="mb-6 inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Agendar agora
            </Link>

            <div className="flex gap-4">
              {/* Social Icons Placeholders */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/30 flex items-center justify-center transition cursor-pointer text-primary hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/30 flex items-center justify-center transition cursor-pointer text-primary hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-6 text-lg tracking-wide text-white">
              Navegação
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition inline-block"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="hover:text-primary transition inline-block"
                >
                  Serviços & Terapias
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-primary transition inline-block"
                >
                  Sobre Mim
                </Link>
              </li>
              <li>
                <Link
                  href="/depoimentos"
                  className="hover:text-primary transition inline-block"
                >
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-primary transition inline-block"
                >
                  Agendar Consulta
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-6 text-lg tracking-wide text-white">
              Recursos
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/loja"
                  className="hover:text-primary transition inline-block"
                >
                  Loja Online
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition inline-block"
                >
                  Blog & Artigos
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition inline-block"
                >
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link
                  href="/questionario"
                  className="hover:text-primary transition inline-block"
                >
                  Questionário Holístico
                </Link>
              </li>
              <li>
                <Link
                  href="/cliente"
                  className="hover:text-primary transition inline-block"
                >
                  Área de Cliente
                </Link>
              </li>
              <li>
                <Link
                  href="/recursos"
                  className="hover:text-primary transition inline-block"
                >
                  Recursos Gratuitos
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="hover:text-primary transition inline-block"
                >
                  Eventos & Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="hover:text-primary transition inline-block"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-6 text-lg tracking-wide text-white">
              Terapias Populares
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/servicos/reiki-kundalini"
                  className="hover:text-primary transition inline-block"
                >
                  Reiki Kundalini
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/leitura-aura"
                  className="hover:text-primary transition inline-block"
                >
                  Leitura de Aura
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/cura-holistica"
                  className="hover:text-primary transition inline-block"
                >
                  Cura Holística
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/limpeza-energetica"
                  className="hover:text-primary transition inline-block"
                >
                  Limpeza Energética
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-6 text-lg tracking-wide text-white">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3 justify-center md:justify-start items-start">
                <span className="mt-0.5 text-primary">📍</span>
                <span>
                  Atendimento Online
                  <br />
                  (Zoom / WhatsApp)
                </span>
              </li>
              <li className="flex gap-3 justify-center md:justify-start items-center">
                <span className="text-primary">📧</span>
                <a
                  href="mailto:contato@rafaellakally.com"
                  className="hover:text-primary transition"
                >
                  contato@rafaellakally.com
                </a>
              </li>
              <li className="flex gap-3 justify-center md:justify-start items-center">
                <span className="text-primary">🕒</span>
                <span>Seg - Sex: 09:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; {currentYear} Rafaella Kally. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/politica-privacidade"
              className="hover:text-white transition"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos-condicoes"
              className="hover:text-white transition"
            >
              Termos de Uso
            </Link>
            <Link
              href="/politica-privacidade#cookies"
              className="hover:text-white transition"
            >
              Cookies & Consentimento
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

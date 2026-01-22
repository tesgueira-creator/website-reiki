"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  trackFormStart,
  trackFormSubmit,
  trackWhatsAppClick,
  trackPhoneClick,
} from "@/components/shared/Analytics";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formStartTracked = useRef(false);

  useEffect(() => {
    const hasInput = Object.values(formData).some(
      (v) => v !== "" && v !== formData.honeypot,
    );
    if (hasInput && !formStartTracked.current) {
      trackFormStart("contact_form");
      formStartTracked.current = true;
    }
  }, [formData]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Nome é obrigatório";
        if (value.trim().length < 2)
          return "Nome deve ter pelo menos 2 caracteres";
        return "";
      case "email":
        if (!value.trim()) return "Email é obrigatório";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) return "Email inválido";
        return "";
      case "phone":
        if (!value.trim()) return "";
        const phoneRegex = /^(\+351)?[9][0-9]{8}$/;
        if (!phoneRegex.test(value.replace(/\s/g, "")))
          return "Formato: +351 9XX XXX XXX";
        return "";
      case "subject":
        if (!value) return "Selecione um assunto";
        return "";
      case "message":
        if (!value.trim()) return "Mensagem é obrigatória";
        if (value.trim().length < 10)
          return "Mensagem deve ter pelo menos 10 caracteres";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    (["name", "email", "phone", "subject", "message"] as const).forEach(
      (field) => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      },
    );
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        trackFormSubmit("contact_form", true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          honeypot: "",
        });
        setTouched({});
        formStartTracked.current = false;
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Erro ao enviar mensagem");
        trackFormSubmit("contact_form", false);
        if (data.errors) setErrors(data.errors);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
      trackFormSubmit("contact_form", false);
    }
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Telefone",
      info: "+351 91 234 5678",
      description: "Atendo chamadas de segunda a sexta-feira",
      href: "tel:+351912345678",
      onClick: trackPhoneClick,
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      accentColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Mail,
      title: "Email",
      info: "contato@rafaellakally.com",
      description: "Respondo em até 24 horas",
      href: "mailto:contato@rafaellakally.com",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      accentColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "+351 91 234 5678",
      description: "Disponível para mensagens rápidas",
      href: "https://wa.me/351912345678",
      onClick: trackWhatsAppClick,
      external: true,
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      accentColor: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-32 pb-24 bg-background"
        id="main-content"
      >
        <div className="content-container content-grid">
          {/* Hero */}
          <motion.div
            className="col-span-12 md:col-span-10 md:col-start-2 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">
              Entre em Contacto
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-main mb-6">
              Vou Adorar Ouvir de Si
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Tem dúvidas ou gostaria de agendar uma sessão? Contacte-me através
              de qualquer dos canais abaixo.
            </p>
          </motion.div>

          {/* Contact Cards - Enhanced Design */}
          <div className="col-span-12 grid grid-cols-12 gap-6 mb-16">
            {contactCards.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={index}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  onClick={contact.onClick}
                  className={`col-span-12 md:col-span-6 lg:col-span-4 bg-gradient-to-br ${contact.bgGradient} p-8 rounded-2xl border-2 ${contact.borderColor} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer overflow-hidden relative`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={`Contactar via ${contact.title}: ${contact.info}`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity">
                    <div className={`w-full h-full rounded-full blur-3xl ${contact.bgColor}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with background */}
                    <div className={`${contact.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon
                        className={`${contact.accentColor}`}
                        size={32}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">
                      {contact.title}
                    </h3>

                    {/* Info - Main */}
                    <p className={`${contact.accentColor} font-semibold text-lg mb-2 group-hover:underline break-all`}>
                      {contact.info}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {contact.description}
                    </p>

                    {/* Action Button */}
                    <div className={`inline-flex items-center gap-2 ${contact.accentColor} font-medium text-sm group-hover:translate-x-1 transition-transform`}>
                      <span>Contactar Agora</span>
                      <span>→</span>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl border-2 ${contact.borderColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.a>
              );
            })}
          </div>

          {/* Form & Info Grid */}
          <div className="col-span-12 grid grid-cols-12 gap-6">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-7"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/5 to-purple-50 p-8 rounded-2xl border border-primary/10 mb-8"
              >
                <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary via-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  Envie-nos uma mensagem
                </h2>
                <p className="text-gray-600 text-lg">
                  Responderemos no prazo mais breve possível com propostas personalizadas.
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 p-6 rounded-xl mb-6 border-2 border-green-300 flex items-center gap-4 shadow-lg"
                  >
                    <div className="bg-green-200 p-3 rounded-full flex-shrink-0">
                      <CheckCircle className="text-green-700" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-green-900">Sucesso!</p>
                      <span className="text-green-700 text-sm">
                        Mensagem enviada com sucesso! Entrarei em contacto em breve.
                      </span>
                    </div>
                  </motion.div>
                )}
                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gradient-to-r from-red-50 to-pink-50 text-red-800 p-6 rounded-xl mb-6 border-2 border-red-300 flex items-center gap-4 shadow-lg"
                  >
                    <div className="bg-red-200 p-3 rounded-full flex-shrink-0">
                      <AlertCircle className="text-red-700" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-red-900">Erro</p>
                      <span className="text-red-700 text-sm">{errorMessage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6" noValidate>
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-800 mb-3"
                  >
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition focus:ring-2 ${
                      errors.name 
                        ? "border-red-300 bg-red-50 focus:ring-red-100" 
                        : "border-gray-200 focus:ring-primary/20 focus:border-primary bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="O seu nome"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800 mb-3"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition focus:ring-2 ${
                      errors.email 
                        ? "border-red-300 bg-red-50 focus:ring-red-100" 
                        : "border-gray-200 focus:ring-primary/20 focus:border-primary bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="o.seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-800 mb-3"
                  >
                    Telefone{" "}
                    <span className="text-gray-500 font-normal">(opcional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition focus:ring-2 ${
                      errors.phone 
                        ? "border-red-300 bg-red-50 focus:ring-red-100" 
                        : "border-gray-200 focus:ring-primary/20 focus:border-primary bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="+351 912 345 678"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-800 mb-3"
                  >
                    Assunto <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition focus:ring-2 ${
                      errors.subject 
                        ? "border-red-300 bg-red-50 focus:ring-red-100" 
                        : "border-gray-200 focus:ring-primary/20 focus:border-primary bg-gray-50 hover:bg-white"
                    }`}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="agendamento">Agendamento de Sessão</option>
                    <option value="reiki">Sessão de Reiki Kundalini</option>
                    <option value="mesa-radionica">Mesa Radiónica</option>
                    <option value="multidimensional">
                      Terapia Multidimensional
                    </option>
                    <option value="pack">Pack de Sessões</option>
                    <option value="duvidas">Dúvidas sobre Serviços</option>
                    <option value="outro">Outro</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-800 mb-3"
                  >
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition focus:ring-2 resize-none ${
                      errors.message 
                        ? "border-red-300 bg-red-50 focus:ring-red-100" 
                        : "border-gray-200 focus:ring-primary/20 focus:border-primary bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="Descreva como posso ajudá-lo(a)..."
                  />
                  {errors.message ? (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.message}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-xs mt-2">
                      {formData.message.length}/1000 caracteres
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 disabled:from-primary/50 disabled:to-purple-600/50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-2xl hover:shadow-3xl text-lg"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin" size={22} /> A enviar...
                    </>
                  ) : (
                    <>
                      <Send size={22} /> Enviar Mensagem
                    </>
                  )}
                </motion.button>
                <p className="text-xs text-center text-gray-500 font-medium">
                  ✨ Respondo a todas as mensagens em até 24 horas
                </p>
              </form>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-5 space-y-6"
            >
              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl border-2 border-orange-200 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-orange-200 p-3 rounded-xl group-hover:bg-orange-300 transition-colors">
                    <Clock className="text-orange-600" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800">
                    Horário
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Segunda a Sexta", time: "09:00 - 18:00", icon: "📅" },
                    { day: "Sábado", time: "10:00 - 14:00", icon: "🌟" },
                    { day: "Domingo", time: "Fechado", icon: "🌙" },
                  ].map((schedule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center p-3 bg-white/60 rounded-lg hover:bg-white transition-colors"
                    >
                      <span className="text-gray-700 font-medium flex items-center gap-2">
                        <span>{schedule.icon}</span>
                        {schedule.day}
                      </span>
                      <span className="text-orange-600 font-bold text-sm">
                        {schedule.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-200 p-3 rounded-xl group-hover:bg-blue-300 transition-colors">
                    <MapPin className="text-blue-600" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800">
                    Localização
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="text-lg">📍</span> Sessões presenciais, remotas por videochamada ou híbridas conforme sua preferência.
                  </p>
                  <div className="bg-white/60 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-bold text-blue-600">Endereço:</span><br/>
                      Rua das Terapias, Lisboa<br/>
                      Portugal
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-purple-200 p-3 rounded-xl">
                    <span className="text-2xl">❓</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800">
                    Perguntas Frequentes
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      icon: "🎯",
                      title: "Primeira sessão",
                      desc: "15 min de consulta gratuitamente",
                    },
                    {
                      icon: "⏰",
                      title: "Cancelamentos",
                      desc: "Com 24h de antecedência",
                    },
                    {
                      icon: "📦",
                      title: "Pacotes",
                      desc: "Descontos em pacotes mensais",
                    },
                    {
                      icon: "💻",
                      title: "Online",
                      desc: "Sessões por videochamada",
                    },
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-white/60 p-3 rounded-lg hover:bg-white transition-colors border border-purple-100"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0">{faq.icon}</span>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">
                            {faq.title}
                          </p>
                          <p className="text-gray-600 text-xs">{faq.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

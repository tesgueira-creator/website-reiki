"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Calendar,
  CreditCard,
  Settings,
  Bell,
  Heart,
  Clock,
  ChevronRight,
  LogOut,
  Package,
  FileText,
  Star,
  Gift,
  Shield,
} from "lucide-react";

// Simulação de dados do cliente (em produção viria de uma API/autenticação)
const clientData = {
  name: "Maria Silva",
  email: "maria.silva@email.com",
  phone: "+351 912 345 678",
  memberSince: "Janeiro 2025",
  totalSessions: 8,
  nextSession: {
    date: "28 Janeiro 2026",
    time: "15:00",
    therapy: "Reiki Kundalini",
    isOnline: false,
  },
  loyaltyPoints: 240,
  upcomingAppointments: [
    {
      id: 1,
      date: "28 Jan",
      time: "15:00",
      therapy: "Reiki Kundalini",
      status: "confirmado",
    },
    {
      id: 2,
      date: "10 Fev",
      time: "11:00",
      therapy: "Mesa Radiónica",
      status: "pendente",
    },
  ],
  pastSessions: [
    {
      id: 1,
      date: "15 Jan 2026",
      therapy: "Terapia Multidimensional",
      rating: 5,
    },
    { id: 2, date: "02 Jan 2026", therapy: "Reiki Kundalini", rating: 5 },
    { id: 3, date: "18 Dez 2025", therapy: "Leitura de Aura", rating: 4 },
  ],
  orders: [
    { id: "ORD-001", date: "10 Jan 2026", total: 65, status: "Entregue" },
    { id: "ORD-002", date: "05 Jan 2026", total: 28, status: "Entregue" },
  ],
};

type TabId = "dashboard" | "appointments" | "history" | "orders" | "settings";

export default function ClienteAreaPage() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Login simulado - Credenciais de teste
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar credenciais de teste
    const validEmail = "tomas.esgueira@reiki.com";
    const validPassword = "Reiki@2026";

    if (
      loginForm.email === validEmail &&
      loginForm.password === validPassword
    ) {
      setIsLoggedIn(true);
    } else {
      alert(
        "Credenciais inválidas. Use:\nEmail: tomas.esgueira@reiki.com\nPassword: Reiki@2026",
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
          <div className="content-container max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                  Área de Cliente
                </h1>
                <p className="text-gray-500">
                  Faça login para aceder à sua conta
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Palavra-passe
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-600">Lembrar-me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg"
                >
                  Entrar
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Ainda não tem conta?{" "}
                  <Link
                    href="/contacto"
                    className="text-primary font-semibold hover:underline"
                  >
                    Agende a sua primeira sessão
                  </Link>
                </p>
              </div>

              {/* Credenciais de Teste */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <span>🔑</span> Credenciais de Teste
                  </p>
                  <div className="space-y-1 text-xs text-blue-800">
                    <p>
                      <strong>Email:</strong> tomas.esgueira@reiki.com
                    </p>
                    <p>
                      <strong>Password:</strong> Reiki@2026
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  🔒 Os seus dados estão protegidos por encriptação SSL
                </p>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tabs = [
    {
      id: "dashboard" as TabId,
      label: "Painel",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "appointments" as TabId,
      label: "Agendamentos",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "history" as TabId,
      label: "Histórico",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "orders" as TabId,
      label: "Encomendas",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: "settings" as TabId,
      label: "Definições",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold text-gray-900 mb-1">
                Olá, {clientData.name.split(" ")[0]}! ✨
              </h1>
              <p className="text-gray-500">Bem-vinda à sua área pessoal</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <Link
                href="/servicos"
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all"
              >
                Nova Marcação
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="bg-white rounded-2xl p-6 h-fit shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {clientData.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {clientData.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Membro desde {clientData.memberSince}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Loyalty Points */}
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 text-amber-700 mb-2">
                  <Gift className="w-5 h-5" />
                  <span className="font-semibold">Pontos de Fidelidade</span>
                </div>
                <p className="text-2xl font-bold text-amber-800">
                  {clientData.loyaltyPoints} pts
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  60 pts para desconto de 10€
                </p>
              </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-6">
              {activeTab === "dashboard" && (
                <>
                  {/* Next Session Card */}
                  {clientData.nextSession && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-primary to-primary-dark p-6 md:p-8 rounded-2xl text-white"
                    >
                      <div className="flex items-center gap-2 text-white/80 mb-2">
                        <Bell className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Próxima Sessão
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold mb-1">
                        {clientData.nextSession.therapy}
                      </h3>
                      <p className="text-white/90">
                        {clientData.nextSession.date} às{" "}
                        {clientData.nextSession.time}
                        {clientData.nextSession.isOnline
                          ? " (Online)"
                          : " (Presencial)"}
                      </p>
                      <div className="mt-4 flex gap-3">
                        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                          Reagendar
                        </button>
                        <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-gray-100">
                          Ver Detalhes
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      {
                        icon: <Calendar className="w-6 h-6" />,
                        value: clientData.totalSessions,
                        label: "Sessões Realizadas",
                      },
                      {
                        icon: <Heart className="w-6 h-6" />,
                        value: "4.9 ★",
                        label: "Avaliação Média",
                      },
                      {
                        icon: <Shield className="w-6 h-6" />,
                        value: "Premium",
                        label: "Nível de Membro",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-white p-6 rounded-xl border border-gray-100 text-center"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                          {stat.icon}
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Ações Rápidas
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        {
                          label: "Agendar Nova Sessão",
                          href: "/servicos",
                          icon: <Calendar className="w-5 h-5" />,
                        },
                        {
                          label: "Ver Loja",
                          href: "/loja",
                          icon: <Package className="w-5 h-5" />,
                        },
                        {
                          label: "Fazer Questionário",
                          href: "/questionario",
                          icon: <FileText className="w-5 h-5" />,
                        },
                        {
                          label: "Ler Blog",
                          href: "/blog",
                          icon: <Star className="w-5 h-5" />,
                        },
                      ].map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                          <span className="text-gray-400 group-hover:text-primary">
                            {link.icon}
                          </span>
                          <span className="font-medium text-gray-700 group-hover:text-primary">
                            {link.label}
                          </span>
                          <ChevronRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "appointments" && (
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6">
                    Agendamentos Futuros
                  </h3>
                  <div className="space-y-4">
                    {clientData.upcomingAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">
                              {apt.date.split(" ")[0]}
                            </p>
                            <p className="text-xs text-gray-500">
                              {apt.date.split(" ")[1]}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {apt.therapy}
                            </p>
                            <p className="text-sm text-gray-500">{apt.time}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            apt.status === "confirmado"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6">
                    Histórico de Sessões
                  </h3>
                  <div className="space-y-4">
                    {clientData.pastSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {session.therapy}
                          </p>
                          <p className="text-sm text-gray-500">
                            {session.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(session.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6">
                    As Minhas Encomendas
                  </h3>
                  <div className="space-y-4">
                    {clientData.orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.id}
                          </p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            {order.total}€
                          </p>
                          <span className="text-xs text-green-600 font-medium">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/loja"
                    className="block text-center text-primary font-medium mt-6 hover:underline"
                  >
                    Visitar Loja →
                  </Link>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-6">
                      Dados Pessoais
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome
                        </label>
                        <input
                          type="text"
                          defaultValue={clientData.name}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={clientData.email}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          defaultValue={clientData.phone}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    <button className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all">
                      Guardar Alterações
                    </button>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Notificações
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          label: "Lembretes de sessão por email",
                          checked: true,
                        },
                        {
                          label: "Lembretes de sessão por SMS",
                          checked: false,
                        },
                        { label: "Newsletter com novidades", checked: true },
                        {
                          label: "Promoções e ofertas especiais",
                          checked: true,
                        },
                      ].map((pref, i) => (
                        <label
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700">{pref.label}</span>
                          <input
                            type="checkbox"
                            defaultChecked={pref.checked}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

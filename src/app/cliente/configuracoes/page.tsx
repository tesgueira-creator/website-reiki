"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Trash2,
  Download,
} from "lucide-react";

type TabId = "profile" | "notifications" | "payment" | "privacy" | "security";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  sms: boolean;
}

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "+351 912 345 678",
    birthDate: "1985-06-15",
    address: "Lisboa, Portugal",
    bio: "Interessada em desenvolvimento espiritual e bem-estar holístico.",
  });

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "appointments",
      label: "Lembretes de Agendamentos",
      description: "Receba lembretes antes das suas sessões",
      email: true,
      sms: true,
    },
    {
      id: "promotions",
      label: "Promoções e Ofertas",
      description: "Descontos exclusivos e novidades",
      email: true,
      sms: false,
    },
    {
      id: "newsletter",
      label: "Newsletter Mensal",
      description: "Dicas de bem-estar e conteúdo exclusivo",
      email: true,
      sms: false,
    },
    {
      id: "orders",
      label: "Atualizações de Encomendas",
      description: "Estado das suas encomendas da loja",
      email: true,
      sms: true,
    },
  ]);

  const [paymentMethods] = useState([
    { id: "1", type: "visa", last4: "4242", expiry: "12/27", isDefault: true },
    {
      id: "2",
      type: "mastercard",
      last4: "8888",
      expiry: "03/26",
      isDefault: false,
    },
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardar
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: "profile" as TabId, label: "Perfil", icon: User },
    { id: "notifications" as TabId, label: "Notificações", icon: Bell },
    { id: "payment" as TabId, label: "Pagamentos", icon: CreditCard },
    { id: "privacy" as TabId, label: "Privacidade", icon: Shield },
    { id: "security" as TabId, label: "Segurança", icon: Shield },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
        <div className="content-container">
          {/* Back Button */}
          <Link
            href="/cliente"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar à Área de Cliente
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-28">
                <h2 className="font-semibold text-gray-900 mb-4 px-2">
                  Configurações
                </h2>
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
              >
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                      Informações do Perfil
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) =>
                              setProfile({ ...profile, name: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile({ ...profile, phone: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Nascimento
                        </label>
                        <input
                          type="date"
                          value={profile.birthDate}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              birthDate: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Localização
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={profile.address}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                address: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sobre Mim (opcional)
                        </label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) =>
                            setProfile({ ...profile, bio: e.target.value })
                          }
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                          placeholder="Conte-nos um pouco sobre si e os seus interesses..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                      Preferências de Notificação
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Escolha como e quando deseja receber comunicações
                    </p>

                    <div className="space-y-4">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary/20 transition"
                        >
                          <div className="mb-3 sm:mb-0">
                            <h3 className="font-medium text-gray-900">
                              {notif.label}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {notif.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notif.email}
                                onChange={() => {
                                  setNotifications((prev) =>
                                    prev.map((n) =>
                                      n.id === notif.id
                                        ? { ...n, email: !n.email }
                                        : n,
                                    ),
                                  );
                                }}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                              />
                              <span className="text-sm text-gray-600">
                                Email
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notif.sms}
                                onChange={() => {
                                  setNotifications((prev) =>
                                    prev.map((n) =>
                                      n.id === notif.id
                                        ? { ...n, sms: !n.sms }
                                        : n,
                                    ),
                                  );
                                }}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                              />
                              <span className="text-sm text-gray-600">SMS</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Tab */}
                {activeTab === "payment" && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                      Métodos de Pagamento
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Gerencie os seus cartões e métodos de pagamento
                    </p>

                    <div className="space-y-4 mb-6">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center justify-between p-4 border rounded-xl transition ${
                            method.isDefault
                              ? "border-primary/30 bg-primary/5"
                              : "border-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600 uppercase">
                              {method.type}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                •••• •••• •••• {method.last4}
                              </p>
                              <p className="text-sm text-gray-500">
                                Expira {method.expiry}
                              </p>
                            </div>
                            {method.isDefault && (
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                Padrão
                              </span>
                            )}
                          </div>
                          <button className="text-gray-400 hover:text-red-500 transition">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition">
                      <CreditCard className="w-5 h-5" />
                      Adicionar Novo Cartão
                    </button>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === "privacy" && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                      Privacidade e Dados
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Controle como os seus dados são utilizados
                    </p>

                    <div className="space-y-6">
                      <div className="p-4 border border-gray-100 rounded-xl">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              Exportar os Meus Dados
                            </h3>
                            <p className="text-sm text-gray-500">
                              Faça download de todos os seus dados pessoais
                            </p>
                          </div>
                          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            <Download className="w-4 h-4" />
                            Exportar
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-red-100 rounded-xl bg-red-50/50">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-red-900 mb-1">
                              Eliminar Conta
                            </h3>
                            <p className="text-sm text-red-700">
                              Esta ação é irreversível e eliminará todos os seus
                              dados
                            </p>
                          </div>
                          <button className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-100 transition">
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                      Segurança da Conta
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-4">
                          Alterar Password
                        </h3>
                        <div className="space-y-4 max-w-md">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Password Atual
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nova Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirmar Nova Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-medium text-gray-900 mb-4">
                          Sessões Ativas
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Este dispositivo
                                </p>
                                <p className="text-xs text-gray-500">
                                  Lisboa, Portugal • Agora
                                </p>
                              </div>
                            </div>
                            <span className="text-xs text-green-600 font-medium">
                              Ativo
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-green-600"
                    >
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Alterações guardadas!
                      </span>
                    </motion.div>
                  )}
                  <div className="ml-auto">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          A guardar...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Guardar Alterações
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

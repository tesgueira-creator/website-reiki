"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/loja", label: "Loja" },
  { href: "/questionario", label: "Questionário" },
  { href: "/sobre", label: "Sobre" },
  { href: "/blog", label: "Blog" },
  { href: "/cliente", label: "Área Cliente" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    // Close mobile menu on route change — avoid sync setState in effect to prevent cascading renders
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Scroll handler with throttle
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-md" : "bg-background/50 backdrop-blur"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="banner"
    >
      <nav
        className="content-container py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4"
        role="navigation"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="font-serif text-2xl font-bold text-primary hover:text-primary-dark transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-2 py-1 -ml-2"
            aria-label="Rafaella Kally - Página inicial"
          >
            Rafaella Kally
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center justify-center">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 ${
                  isActive
                    ? "text-primary"
                    : "text-text-main hover:text-primary"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex justify-end gap-3">
          <a
            href="tel:+351912345678"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-primary border-2 border-primary px-4 py-2 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Ligar agora"
          >
            <Phone size={16} />
            Ligar
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Agendar
          </Link>
        </div>

        {/* Mobile: Tap to Call Button (always visible on small screens) */}
        <div className="flex md:hidden justify-end col-start-3 gap-2">
          <a
            href="tel:+351912345678"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white w-10 h-10 rounded-full transition-all shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Ligar agora"
          >
            <Phone size={18} />
          </a>
          <button
            className="text-primary hover:text-primary-dark transition-colors p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu */}
            <motion.div
              id="mobile-menu"
              className="md:hidden bg-background border-t border-border fixed top-[72px] left-0 right-0 z-50 shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              role="menu"
            >
              <div className="flex flex-col px-6 py-6 gap-1">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-3 px-4 rounded-lg transition-colors text-lg font-medium ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-text-main hover:bg-gray-100 hover:text-primary"
                        }`}
                        onClick={() => setIsOpen(false)}
                        role="menuitem"
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <Link
                    href="/contacto"
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-full font-semibold transition-all w-full shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone size={20} />
                    Agendar Consulta
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

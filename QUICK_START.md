# ⚡ QUICK START - Guia Rápido

## 🚀 Começar em 5 Minutos

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Ambiente
```bash
cp .env.local.example .env.local
# Editar .env.local com Sanity Project ID
```

### 3. Rodar Localmente
```bash
npm run dev
# Abrir http://localhost:3000
```

### 4. Build & Deploy
```bash
npm run build
npm run start

# Ou fazer push para GitHub > Vercel
```

---

## 📁 Arquivos Principais

| Ficheiro                 | Descrição                         |
| ------------------------ | --------------------------------- |
| `src/app/page.tsx`       | Home page                         |
| `src/app/globals.css`    | Estilos globais + variáveis cores |
| `tailwind.config.ts`     | Configuração Tailwind             |
| `src/components/layout/` | Componentes principais            |
| `src/sanity/schemas/`    | Schemas do CMS                    |

---

## 🎨 Alterar Cores

Edite `src/app/globals.css`:

```css
:root {
  --primary: #C5A059;      /* Dourado */
  --secondary: #8A9A5B;    /* Verde */
  --background: #F9F9F9;   /* Creme */
  --text-main: #333333;    /* Texto */
}
```

---

## 📝 Adicionar Página Nova

1. Criar pasta: `src/app/nova-pagina/`
2. Criar arquivo: `page.tsx`
3. Adicionar conteúdo:

```typescript
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NovaPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16">
        <h1 className="font-serif text-5xl">Minha Página</h1>
      </main>
      <Footer />
    </>
  );
}
```

4. Link aparece automaticamente no menu

---

## 🎯 Estrutura de Componentes

```
Header
├── Navbar (responsive)
└── Mobile Menu

Footer
├── Links
├── Contacto
└── Copyright

Page
├── Hero (animado)
├── Services Grid
├── Testimonials Grid
├── Values Section
└── CTA Section
```

---

## 🔧 Tarefas Comuns

### Alterar Texto do Hero
Edite `src/components/layout/Hero.tsx`

### Adicionar Novo Serviço
1. Vá a Sanity Studio
2. Crie novo "Service"
3. Apareça automaticamente na página

### Alterar Depoimento
1. Edite em Sanity Studio
2. Salve e publish
3. Atualiza automaticamente

### Mudar Fonte
Edite `src/app/globals.css`:
```css
@import url("https://fonts.googleapis.com/css2?family=...");

--font-serif: "...", serif;
--font-sans: "...", sans-serif;
```

---

## 🚨 Troubleshooting Rápido

**"npm install falha"**
```bash
rm package-lock.json
npm cache clean --force
npm install
```

**"Build com erro"**
```bash
npm run build -- --verbose
# Copie erro completo para Debug
```

**"Imagens não carregam"**
```bash
# Verifique Sanity Project ID em .env.local
# Certifique-se que imagens foram publicadas em Sanity
```

**"Cores não aparecem"**
```bash
# Limpe cache Tailwind
rm -rf .next
npm run dev
```

---

## 📚 Documentação Completa

- **README.md** - Visão geral e setup
- **TECHNICAL_GUIDE.md** - Guia técnico detalhado
- **SANITY_CMS_GUIDE.md** - Gestão de conteúdo
- **DEPLOYMENT_CHECKLIST.md** - Lançamento passo a passo

---

## ⌚ Tempos de Build

```
npm run build  ~30s (Turbopack)
npm run dev    ~5s (Startup)
```

---

## 💡 Pro Tips

✨ Usar **React DevTools** para inspecionar componentes
🎨 **Tailwind Intellisense** extension no VS Code
📱 Testar mobile com **DevTools F12 > Device Toggle**
🔍 **Lighthouse** em DevTools para performance
📊 **Next.js Analytics** automático em Vercel

---

## 🔗 Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Sanity Docs](https://www.sanity.io/docs)
- [Shadcn/ui](https://ui.shadcn.com/)

---

## 📞 Precisa de Ajuda?

1. **Erros locais**: Verifique console (`npm run dev`)
2. **Deploy fails**: Verificar Vercel build logs
3. **CMS issues**: Verifique Sanity Studio
4. **Styling**: Inspecionar classes Tailwind

---

**Happy coding! 🚀✨**

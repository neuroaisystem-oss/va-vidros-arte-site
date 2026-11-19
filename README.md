# VA Vidros Arte | site comercial

Site da vidraçaria VA Vidros Arte (Marília-SP). React 18 + TypeScript + Vite + Tailwind CSS 4 + Lucide.
Os pedidos de orçamento vão exclusivamente para o WhatsApp. Não há back-end nem variáveis de ambiente.

## Publicar com GitHub + Vercel

1. Crie um repositório novo no GitHub (sem README, sem .gitignore).
2. Extraia este ZIP e envie **o conteúdo da pasta** para o repositório, de modo que `package.json` fique na raiz:
   ```bash
   git init
   git add .
   git commit -m "Site VA Vidros Arte"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
   Pelo navegador também funciona: no repositório vazio, use "uploading an existing file" e arraste os arquivos extraídos (as pastas `src` e `public` incluídas).
3. Na Vercel: **Add New → Project**, escolha o repositório e clique em **Deploy**.
   O `vercel.json` já define Framework Vite, comando `npm run build` e saída `dist`. Nada para configurar.

A cada `git push` na branch `main`, a Vercel publica uma nova versão.

## Rodar no computador

Precisa de Node 20.19 ou mais novo.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # confere os tipos e gera a pasta dist
npm run preview    # abre a versão de produção localmente
```

O primeiro `npm install` cria o `package-lock.json`. Envie esse arquivo ao GitHub também, para as próximas instalações usarem as mesmas versões.

## Onde editar

| O que mudar | Arquivo |
|---|---|
| Telefone, endereço, WhatsApp, horários | `src/config/site.ts` |
| Fotos, títulos e categorias do catálogo | `src/data/catalog.ts` |
| Cores e animações | `src/index.css` |
| Título e descrição para o Google | `index.html` |
| Mensagem enviada ao WhatsApp | `src/lib/whatsapp.ts` |
| Regras de validação do formulário | `src/lib/validation.ts` |

## Trocar ou adicionar fotos

As fotos ficam em `public/img/`. O caminho no código é `/img/nome-do-arquivo.jpg`, e o nome precisa ser idêntico, com as mesmas maiúsculas e minúsculas, porque a Vercel diferencia. Para adicionar um projeto, coloque a foto em `public/img/` e inclua uma linha em `src/data/catalog.ts`.

## Estrutura

```
index.html            página base (título, descrição, fonte)
vite.config.ts        Vite + React + Tailwind
vercel.json           configuração da Vercel
public/               favicon e fotos (img/)
src/
  main.tsx, App.tsx
  index.css           tema Tailwind (cores, fonte, animações)
  config/site.ts      dados da empresa
  data/catalog.ts     categorias e projetos
  lib/                WhatsApp, telefone, validação, horário de atendimento
  hooks/useCarousel.ts
  components/         Header, Hero, Catalog, ProjectCard, About, Location, QuoteForm, Footer, FloatingWhatsApp
```

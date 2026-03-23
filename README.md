# Portfólio João Pedro

Projeto React + Vite + TailwindCSS preparado para publicação no GitHub Pages.

## Estrutura

- `src/components/PortfolioJoaoPedro.jsx`: componente principal do portfólio.
- `public/images/`: coloque aqui sua foto profissional.
- `.github/workflows/deploy.yml`: deploy automático no GitHub Pages ao fazer push para `main`.

## Personalização rápida

1. Troque a foto em `public/images/foto-perfil.jpg`.
2. Se quiser usar seus próprios arquivos de ícone, coloque-os em `public/images/social/instagram.png`, `public/images/social/linkedin.png`, `public/images/social/github.png` e `public/images/social/whatsapp.png`.
3. Atualize os links em `src/components/PortfolioJoaoPedro.jsx`.
4. Ajuste email, WhatsApp e demais textos se quiser.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Publicação no GitHub Pages

1. Crie um repositório no GitHub e envie este projeto.
2. Faça o push para a branch `main`.
3. No GitHub, abra `Settings > Pages`.
4. Em `Build and deployment`, selecione `GitHub Actions`.
5. O workflow `.github/workflows/deploy.yml` fará o build e a publicação automaticamente.

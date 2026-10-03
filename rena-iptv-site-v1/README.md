# RENA IPTV — V1 sem banco de dados

Site estático, responsivo e sem dependências externas. Feito para subir no GitHub e publicar no Vercel.

## Rodar no PC

```bash
npm run dev
```

Abra: `http://localhost:5173`

## Gerar a pasta final

```bash
npm run build
```

Isso gera a pasta `dist/`.

## Vercel

Você pode publicar o repositório diretamente. Se preferir build:
- Build Command: `npm run build`
- Output Directory: `dist`

## Onde alterar

- WhatsApp: `src/app.js`
- Planos: `index.html` e `src/app.js`
- Logo/mascote do topo: `public/rena-brand.jpg`
- Visual: `src/styles.css`

## Banco de dados

Nenhum banco é usado. A última seleção de plano fica apenas no `localStorage` do navegador.

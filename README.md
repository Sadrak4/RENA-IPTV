# RENA IPTV — V2.1

Atualização visual mais limpa para GitHub + Vercel.

## Alterações principais

- removido o banner promocional grande do topo;
- topo agora usa apenas a área da logo + mascote;
- removida a seção repetitiva “Por que escolher”;
- removidos os botões WhatsApp/Teste do cabeçalho;
- navegação superior ficou mais limpa;
- planos aparecem mais cedo na página;
- mantido o teste de 12 horas em uma seção própria;
- FAQ sem textos técnicos para clientes;
- WhatsApp, renovação e suporte continuam disponíveis sem repetir demais.

## Rodar localmente

```bash
npm run dev
```

Abra `http://localhost:5173`.

## Build

```bash
npm run build
```

A pasta final será `dist/`.


## V2.3

- Carrossel automático de entretenimento com: Netflix, Disney+, HBO Max, Prime Video, Globoplay, Paramount+ e Apple TV+.
- Carrossel automático de esportes com: CazéTV, Premiere, BandSports, TNT Sports, ESPN e SporTV.
- Carrosséis pausam ao passar o mouse e respeitam `prefers-reduced-motion`.
- Botão para consultar programação pelo WhatsApp.
- Os cards usam wordmarks em texto e estilos próprios, sem depender de imagens externas.


## V2.4

- Removido o bloco informativo abaixo dos carrosséis.
- “Rolagem automática” trocado por “STREAMINGS”.
- Botões com salto suave, clique com ripple e pulso discreto.
- Cards com elevação no hover.
- Logo/mascote com entrada suave.
- Seções aparecem suavemente conforme a rolagem.
- Efeitos respeitam a preferência de movimento reduzido do dispositivo.

## V2.5 — telas adicionais

- Cada plano inclui 1 tela.
- O cliente pode escolher de 1 a 5 telas no total.
- Cada tela adicional custa R$ 5 por mês.
- No plano mensal, cada tela extra soma R$ 5 ao total.
- No plano trimestral, cada tela extra soma R$ 15 ao total (R$ 5 × 3 meses).
- O valor é atualizado automaticamente no card.
- A mensagem do WhatsApp informa o plano, a quantidade de telas e o valor total.

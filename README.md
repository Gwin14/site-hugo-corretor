# Hugo Henrique — Corretor de imóveis

Site em Next.js App Router, React e TypeScript. Layout responsivo, filtros de compra/locação por cidade, tipo e valor, ordenação, favoritos locais, páginas de imóveis, formulário com encaminhamento para WhatsApp/e-mail e política de privacidade.

## Executar

```sh
npm install
npm run dev
```

Abra http://localhost:3000. Para produção: `npm run build` e `npm start`. Verificação de tipos: `npm run typecheck`.

## Conteúdo comercial

- Edite o catálogo em `lib/properties.ts`. Todos os imóveis, valores e características atuais são demonstrativos. Fotos do Unsplash são ilustrativas, inclusive as imagens das regiões.
- Copie `.env.example` para `.env.local` e informe `NEXT_PUBLIC_WHATSAPP` (somente dígitos, país + DDD + telefone) ou `NEXT_PUBLIC_CONTACT_EMAIL`. Reinicie/recompile após mudar variáveis públicas. Sem contato configurado o formulário informa que nada foi enviado.
- O formulário prepara uma mensagem; o visitante conclui seu envio no WhatsApp/e-mail. Não há backend de leads, autenticação ou painel administrativo.
- Favoritos são persistidos somente no navegador do visitante, não sincronizados entre dispositivos.
- A imagem original do usuário está em `public/images/logo-hugo.jpg`. A marca no cabeçalho usa o símbolo dessa imagem. O registro CRECI da imagem é um placeholder e não foi reproduzido como credencial comercial.
- Antes de publicar comercialmente: substituir catálogo, confirmar região de atuação, informar contatos e registro CRECI válido, revisar política de privacidade e texto de apresentação.
- As fontes são carregadas do Google Fonts com fallback local. Fotos são servidas pelo Unsplash. Para independência dessas redes, substitua por arquivos próprios em `public/`.

## Estrutura

- `components/home.tsx`: página principal e filtros
- `components/site.tsx`: navegação, marca, contato e rodapé
- `app/imoveis/[slug]/page.tsx`: páginas individuais e metadados
- `app/globals.css`: identidade visual e responsividade

Referência estrutural: https://imobiliariabelaspraias.com.br. Identidade e implementação próprias, sem reutilizar anúncios ou contatos da referência.

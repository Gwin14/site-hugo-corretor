import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Hugo Henrique | Compra e aluguel de imóveis em SC",
    template: "%s | Hugo Henrique",
  },
  description:
    "Consulte imóveis para comprar ou alugar em Florianópolis, Balneário Camboriú e Itapema. Filtre por cidade, tipo e valor e fale com Hugo Henrique.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

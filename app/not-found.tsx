import Link from "next/link";
import { Header, Footer } from "@/components/site";
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container legal">
        <h1>Página não encontrada</h1>
        <p>
          Este endereço não está disponível. Consulte o catálogo de imóveis.
        </p>
        <Link className="button" href="/#imoveis">
          Voltar aos imóveis
        </Link>
      </main>
      <Footer />
    </>
  );
}

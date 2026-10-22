import { notFound } from "next/navigation";
import Link from "next/link";
import { BedDouble, CarFront, Scan, Bath, ArrowRight } from "lucide-react";
import { properties, money } from "@/lib/properties";
import { Header, Footer, Contact } from "@/components/site";
export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = properties.find((p) => p.slug === slug);
  return {
    title: p ? `${p.title} em ${p.city}` : "Imóvel não encontrado",
    description: p?.description,
  };
}
export default async function Property({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = properties.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Header />
      <main>
        <div className="container detail-main">
          <nav className="breadcrumbs" aria-label="Caminho de navegação">
            <Link href="/">Início</Link>
            <span>/</span>
            <Link href="/#imoveis">Imóveis</Link>
            <span>/</span>
            <span>{p.title}</span>
          </nav>
          <div className="detail-title">
            <div>
              <h1>{p.title}</h1>
              <p>
                {p.neighborhood} · {p.city}, SC
              </p>
            </div>
            <a className="text-link" href="#contato">
              Pedir informações <ArrowRight size={16} />
            </a>
          </div>
          <img
            className="detail-hero"
            src={p.image}
            alt={`${p.type} — ${p.title}`}
            fetchPriority="high"
          />
          <div className="detail-grid">
            <div>
              <div className="detail-facts">
                <span>
                  <Scan size={18} />
                  {p.area} m²
                </span>
                <span>
                  <BedDouble size={18} />
                  {p.beds} quartos
                </span>
                <span>
                  <Bath size={18} />
                  {p.baths} banheiros
                </span>
                <span>
                  <CarFront size={18} />
                  {p.parking} vagas
                </span>
              </div>
              <h2>Descrição do imóvel</h2>
              <p className="detail-description">{p.description}</p>
              <p className="demo-notice">
                Imóvel demonstrativo. Fotos ilustrativas, características e
                valores fictícios usados para apresentar o site. Este anúncio
                não representa uma oferta real.
              </p>
            </div>
            <aside className="price-panel">
              <small>
                {p.purpose === "Comprar" ? "Valor de venda" : "Aluguel mensal"}
              </small>
              <strong>
                {money(p.price)}
                {p.purpose === "Alugar" ? " por mês" : ""}
              </strong>
              <a href="#contato" className="button">
                Pedir informações
              </a>
              <p className="demo-notice">
                Código do imóvel: HH{String(p.id).padStart(3, "0")}. Coloque ele
                na mensagem para eu saber de qual anúncio se trata.
              </p>
            </aside>
          </div>
        </div>
        <Contact
          subject={`Olá, tenho interesse no imóvel HH${String(p.id).padStart(3, "0")} — ${p.title}. Gostaria de mais informações.`}
        />
      </main>
      <Footer />
    </>
  );
}

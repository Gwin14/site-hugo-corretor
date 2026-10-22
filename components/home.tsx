"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  MapPin,
  BedDouble,
  CarFront,
  Scan,
  Heart,
  SlidersHorizontal,
  MessageCircle,
} from "lucide-react";
import { Header, Footer, Contact } from "./site";
import { properties, money, business } from "@/lib/properties";
const cities = ["Florianópolis", "Balneário Camboriú", "Itapema"];
// Imóvel de aluguel no hero para não repetir a primeira foto da grade (que abre em "Comprar").
const featured = properties[3];
export default function Home() {
  const [purpose, setPurpose] = useState("Comprar");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [filters, setFilters] = useState({
    purpose: "Comprar",
    city: "",
    type: "",
    price: "",
  });
  const [favorites, setFavorites] = useState<number[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sort, setSort] = useState("featured");
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("hh-favorites") || "[]");
      if (Array.isArray(saved))
        setFavorites(saved.filter((id: unknown) => typeof id === "number"));
    } catch {}
    setOnlyFavorites(
      new URLSearchParams(window.location.search).get("favoritos") === "1",
    );
  }, []);
  function toggleFavorite(id: number) {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem("hh-favorites", JSON.stringify(next));
    } catch {}
  }
  const results = properties
    .filter(
      (p) =>
        (onlyFavorites
          ? favorites.includes(p.id)
          : p.purpose === filters.purpose) &&
        (!filters.city || p.city === filters.city) &&
        (!filters.type || p.type === filters.type) &&
        (!filters.price || p.price <= Number(filters.price)),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : a.id - b.id,
    );
  function search(e: React.FormEvent) {
    e.preventDefault();
    setFilters({ purpose, city, type, price });
    setOnlyFavorites(false);
    document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <p className="hero-hello">
                Oi, eu sou o Hugo, corretor de imóveis.
              </p>
              <h1>
                Te ajudo a encontrar um imóvel no litoral de Santa Catarina.
              </h1>
              <p className="hero-lead">
                Trabalho com venda e aluguel em Florianópolis, Balneário
                Camboriú e Itapema. Me conta a cidade, o tipo de imóvel e quanto
                você quer investir, e eu separo as opções pra você.
              </p>
              <div className="hero-actions">
                <a className="button" href="#imoveis">
                  Ver imóveis
                </a>
                <a
                  className="button button-ghost"
                  href={
                    business.whatsapp
                      ? `https://wa.me/${business.whatsapp}`
                      : "#contato"
                  }
                >
                  <MessageCircle size={18} /> Falar com o Hugo
                </a>
              </div>
            </div>
            <figure className="hero-photo">
              <img
                src={featured.image}
                alt={`${featured.type} em ${featured.neighborhood}`}
                fetchPriority="high"
              />
              <figcaption>
                <Link href={`/imoveis/${featured.slug}`}>
                  <span>{featured.title}</span>
                  <strong>
                    {money(featured.price)}
                    {featured.purpose === "Alugar" && " por mês"}
                  </strong>
                </Link>
              </figcaption>
            </figure>
          </div>
          <div className="container">
            <form className="search-panel" onSubmit={search}>
              <div className="search-tabs" role="group" aria-label="Finalidade">
                {["Comprar", "Alugar"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={purpose === item}
                    className={purpose === item ? "active" : ""}
                    onClick={() => {
                      setPurpose(item);
                      setPrice("");
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label>
                <span>Cidade</span>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Todas</option>
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Tipo</span>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Todos</option>
                  {["Apartamento", "Casa", "Cobertura"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Até quanto</span>
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <option value="">Qualquer valor</option>
                  {(purpose === "Comprar"
                    ? [2000000, 3500000, 5000000, 10000000]
                    : [5000, 10000, 20000]
                  ).map((v) => (
                    <option key={v} value={v}>
                      {money(v)}
                    </option>
                  ))}
                </select>
              </label>
              <button className="button search-button">
                <Search size={18} /> Buscar
              </button>
            </form>
          </div>
        </section>
        <section id="imoveis" className="section container properties-section">
          <div className="section-heading">
            <h2>Imóveis no catálogo</h2>
            <label className="sort">
              <SlidersHorizontal size={16} />
              <select
                aria-label="Ordenar imóveis"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Ordem do catálogo</option>
                <option value="low">Menor valor</option>
                <option value="high">Maior valor</option>
              </select>
            </label>
          </div>
          <div className="filter-chips">
            <button
              className={!onlyFavorites ? "selected" : ""}
              onClick={() => setOnlyFavorites(false)}
            >
              Todos
            </button>
            <button
              className={onlyFavorites ? "selected" : ""}
              onClick={() => setOnlyFavorites(true)}
            >
              <Heart size={15} /> Favoritos
              {favorites.length > 0 && ` (${favorites.length})`}
            </button>
            <span className="result-count">
              {results.length}{" "}
              {results.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
            </span>
          </div>
          <div className="property-grid">
            {results.slice(0, expanded ? results.length : 3).map((p) => (
              <article className="property-card" key={p.id}>
                <div className="property-photo">
                  <Link
                    href={`/imoveis/${p.slug}`}
                    aria-label={`Ver ${p.title}`}
                  >
                    <img
                      src={p.image}
                      alt={`${p.type} em ${p.neighborhood}`}
                      loading="lazy"
                    />
                  </Link>
                  <button
                    className={`favorite ${favorites.includes(p.id) ? "is-favorite" : ""}`}
                    onClick={() => toggleFavorite(p.id)}
                    aria-label={`${favorites.includes(p.id) ? "Remover dos" : "Adicionar aos"} favoritos: ${p.title}`}
                    aria-pressed={favorites.includes(p.id)}
                  >
                    <Heart
                      size={18}
                      fill={favorites.includes(p.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <div className="property-info">
                  <p className="property-location">
                    {p.type} {p.purpose === "Comprar" ? "à venda" : "para alugar"}{" "}
                    · {p.neighborhood}, {p.city}
                  </p>
                  <h3>
                    <Link href={`/imoveis/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <div className="property-features">
                    <span>
                      <Scan size={16} />
                      {p.area} m²
                    </span>
                    <span>
                      <BedDouble size={16} />
                      {p.beds} quartos
                    </span>
                    <span>
                      <CarFront size={16} />
                      {p.parking} {p.parking === 1 ? "vaga" : "vagas"}
                    </span>
                  </div>
                  <p className="property-price">
                    {money(p.price)}
                    {p.purpose === "Alugar" && <small> por mês</small>}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {results.length === 0 && (
            <div className="empty-state">
              <h3>
                {onlyFavorites
                  ? "Você ainda não salvou nenhum imóvel."
                  : "Não achei nada com esses filtros."}
              </h3>
              <p>
                {onlyFavorites
                  ? "Toque no coração de um imóvel para guardar ele aqui."
                  : "Tente outra cidade ou um valor maior. Se preferir, me fala o que procura que eu verifico o que tenho fora do site."}
              </p>
              <button
                className="button"
                onClick={() => {
                  setOnlyFavorites(false);
                  setFilters({
                    purpose: "Comprar",
                    city: "",
                    type: "",
                    price: "",
                  });
                  setCity("");
                  setType("");
                  setPrice("");
                  setPurpose("Comprar");
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
          <div className="catalog-bottom">
            {results.length > 3 && (
              <button
                className="text-link"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Mostrar menos" : `Ver todos os ${results.length}`}{" "}
                <ArrowRight size={16} />
              </button>
            )}
            <span>Catálogo de demonstração, fotos ilustrativas.</span>
          </div>
        </section>
        <section id="sobre" className="about-section">
          <div className="container about-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
                alt="Sala de estar com luz natural"
                loading="lazy"
              />
            </div>
            <div className="about-content">
              <h2>Sobre mim</h2>
              <p>
                Sou o Hugo Henrique, corretor de imóveis no litoral catarinense.
                Atendo quem quer comprar, alugar ou colocar o próprio imóvel à
                venda.
              </p>
              <p>
                Antes de marcar uma visita, eu passo valor, metragem e
                condomínio por mensagem. Assim você só sai de casa para ver o
                que realmente te interessa.
              </p>
              <p>
                Viu um imóvel aqui no site? Me manda o código dele (aparece na
                página do anúncio) que eu respondo com os detalhes.
              </p>
              <a href="#contato" className="text-link">
                Mandar uma mensagem <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <section id="regioes" className="section container regions-section">
          <div className="section-heading">
            <h2>Onde eu atendo</h2>
          </div>
          <div className="regions-grid">
            {[
              {
                city: "Florianópolis",
                image: "photo-1596394516093-501ba68a0ba6",
              },
              {
                city: "Balneário Camboriú",
                image: "photo-1510414842594-a61c69b5ae57",
              },
              {
                city: "Itapema",
                image: "photo-1473116763249-2faaef81ccda",
              },
            ].map((r) => {
              const count = properties.filter((p) => p.city === r.city).length;
              return (
                <button
                  key={r.city}
                  className="region"
                  onClick={() => {
                    setCity(r.city);
                    setFilters({
                      purpose: "Comprar",
                      city: r.city,
                      type: "",
                      price: "",
                    });
                    setPurpose("Comprar");
                    setType("");
                    setPrice("");
                    setOnlyFavorites(false);
                    document
                      .getElementById("imoveis")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <img
                    src={`https://images.unsplash.com/${r.image}?auto=format&fit=crop&w=1000&q=85`}
                    alt=""
                    loading="lazy"
                  />
                  <span className="region-content">
                    <strong>{r.city}</strong>
                    <small>
                      {count} {count === 1 ? "imóvel" : "imóveis"} no catálogo
                    </small>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
        <section className="seller-section">
          <div className="container seller-inner">
            <div>
              <h2>Quer vender ou alugar o seu imóvel?</h2>
              <p>
                Me passa o endereço, a metragem e o valor que você tem em mente.
                Eu te explico como funciona o anúncio e a comissão.
              </p>
            </div>
            <a href="#contato" className="button button-light">
              Anunciar meu imóvel
            </a>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

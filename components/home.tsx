"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  MapPin,
  BedDouble,
  CarFront,
  Scan,
  Heart,
  SlidersHorizontal,
  ShieldCheck,
  KeyRound,
  Handshake,
} from "lucide-react";
import { Header, Footer, Contact } from "./site";
import { properties, money } from "@/lib/properties";
const cities = ["Florianópolis", "Balneário Camboriú", "Itapema"];
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
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2400&q=90"
            alt="Casa contemporânea com piscina e jardim ao entardecer"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <h1>
              Imóveis para comprar
              <br />
              ou alugar em <em>Santa Catarina.</em>
            </h1>
            <p>
              Consulte preços, metragem e localização.
              <br />
              Busque em Florianópolis, Balneário Camboriú e Itapema.
            </p>
            <a className="hero-link" href="#imoveis">
              Ver imóveis <ArrowUpRight size={20} />
            </a>
            <div className="hero-bottom">
              <span>
                <MapPin size={15} /> Litoral de Santa Catarina
              </span>
              <span>VENDA E LOCAÇÃO </span>
            </div>
          </div>
        </section>
        <div className="container search-wrapper">
          <form className="search-panel" onSubmit={search}>
            <div className="search-tabs">
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
                  {item === "Comprar" ? "Quero comprar" : "Quero alugar"}
                </button>
              ))}
              <span>Filtre por cidade, tipo e valor.</span>
            </div>
            <div className="search-fields">
              <label>
                <span>LOCALIZAÇÃO</span>
                <div>
                  <MapPin size={18} />
                  <select
                    aria-label="Localização"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Todas as cidades</option>
                    {cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </label>
              <label>
                <span>TIPO DE IMÓVEL</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  aria-label="Tipo de imóvel"
                >
                  <option value="">Todos os tipos</option>
                  {["Apartamento", "Casa", "Cobertura"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>VALOR MÁXIMO</span>
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  aria-label="Valor máximo"
                >
                  <option value="">Sem limite de valor</option>
                  {(purpose === "Comprar"
                    ? [2000000, 3500000, 5000000, 10000000]
                    : [5000, 10000, 20000]
                  ).map((v) => (
                    <option key={v} value={v}>
                      Até {money(v)}
                    </option>
                  ))}
                </select>
              </label>
              <button className="button search-button">
                <Search size={18} /> Buscar imóveis
              </button>
            </div>
          </form>
        </div>
        <section id="imoveis" className="section container properties-section">
          <div className="section-heading">
            <div>
              <h2>
                Imóveis <em>disponíveis</em>
              </h2>
            </div>
            <a href="#regioes" className="text-link">
              Buscar por cidade <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="catalog-toolbar">
            <div className="filter-chips">
              <button
                className={!onlyFavorites ? "selected" : ""}
                onClick={() => setOnlyFavorites(false)}
              >
                Ver catálogo
              </button>
              <button
                className={onlyFavorites ? "selected" : ""}
                onClick={() => setOnlyFavorites(true)}
              >
                <Heart size={14} /> Meus favoritos{" "}
                {favorites.length > 0 && `(${favorites.length})`}
              </button>
            </div>
            <label className="sort">
              <SlidersHorizontal size={15} />
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
          <div className="property-grid">
            {results.slice(0, expanded ? results.length : 3).map((p) => (
              <article className="property-card" key={p.id}>
                <div className="property-photo">
                  <Link
                    href={`/imoveis/${p.slug}`}
                    aria-label={`Conhecer ${p.title}`}
                  >
                    <img
                      src={p.image}
                      alt={`${p.type} em ${p.neighborhood}`}
                      loading="lazy"
                    />
                  </Link>
                  <span className="property-tag">{p.tag}</span>
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
                  <span className="photo-type">
                    {p.type} · {p.purpose === "Comprar" ? "Venda" : "Locação"}
                  </span>
                </div>
                <div className="property-info">
                  <p className="property-location">
                    <MapPin size={13} />
                    {p.neighborhood}, {p.city}
                  </p>
                  <Link href={`/imoveis/${p.slug}`}>
                    <h3>{p.title}</h3>
                  </Link>
                  <div className="property-features">
                    <span>
                      <Scan size={16} />
                      {p.area} m²
                    </span>
                    <span>
                      <BedDouble size={17} />
                      {p.beds} quartos
                    </span>
                    <span>
                      <CarFront size={17} />
                      {p.parking} {p.parking === 1 ? "vaga" : "vagas"}
                    </span>
                  </div>
                  <div className="property-bottom">
                    <div>
                      <small>
                        {p.purpose === "Comprar"
                          ? "VALOR DE VENDA"
                          : "ALUGUEL MENSAL"}
                      </small>
                      <strong>
                        {money(p.price)}
                        {p.purpose === "Alugar" && <small> /mês</small>}
                      </strong>
                    </div>
                    <Link
                      className="round-link"
                      aria-label={`Ver detalhes: ${p.title}`}
                      href={`/imoveis/${p.slug}`}
                    >
                      <ArrowUpRight size={21} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {results.length === 0 && (
            <div className="empty-state">
              <Search />
              <h3>
                {onlyFavorites
                  ? "Você ainda não salvou imóveis."
                  : "Nenhum imóvel encontrado."}
              </h3>
              <p>
                {onlyFavorites
                  ? "Toque no coração de um imóvel para salvá-lo neste dispositivo."
                  : "Nenhum imóvel corresponde aos filtros selecionados."}
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
                Ver imóveis para comprar
              </button>
            </div>
          )}
          <div className="catalog-bottom">
            <span>Catálogo demonstrativo · Fotos ilustrativas</span>
            {results.length > 3 && (
              <button
                className="text-link"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Mostrar menos" : "Ver todos os imóveis"}{" "}
                <ArrowRight size={17} />
              </button>
            )}
            <span>{results.length} imóveis encontrados</span>
          </div>
        </section>
        <section id="sobre" className="about-section">
          <div className="container about-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
                alt="Interior acolhedor com materiais naturais e luz do sol"
                loading="lazy"
              />
              <div className="about-image-label">
                <span>HUGO HENRIQUE</span>Corretor de imóveis
              </div>
            </div>
            <div className="about-content">
              <h2>
                Ajuda para comprar,
                <br />
                alugar ou <em>vender.</em>
              </h2>
              <p>
                Sou Hugo Henrique, corretor de imóveis. Informe a cidade, o tipo
                de imóvel e o valor que pretende gastar para orientar sua busca.
              </p>
              <p>
                Use o formulário para pedir informações sobre um anúncio ou
                consultar como anunciar seu imóvel.
              </p>
              <div className="about-values">
                <span>
                  <ShieldCheck /> Informações sobre os imóveis
                </span>
                <span>
                  <Handshake /> Contato com o corretor
                </span>
                <span>
                  <KeyRound /> Compra, venda e locação
                </span>
              </div>
              <a href="#contato" className="text-link">
                Falar com Hugo <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section id="regioes" className="section container regions-section">
          <div className="section-heading">
            <div>
              <h2>
                Busque por <em>cidade</em>
              </h2>
            </div>
            <p>
              Selecione uma cidade para ver
              <br />
              os imóveis à venda no catálogo.
            </p>
          </div>
          <div className="regions-grid">
            {[
              {
                city: "Florianópolis",
                label: "Ver imóveis à venda",
                image: "photo-1596394516093-501ba68a0ba6",
              },
              {
                city: "Balneário Camboriú",
                label: "Ver imóveis à venda",
                image: "photo-1510414842594-a61c69b5ae57",
              },
              {
                city: "Itapema",
                label: "Ver imóveis à venda",
                image: "photo-1473116763249-2faaef81ccda",
              },
            ].map((r, i) => (
              <button
                key={r.city}
                className={`region region-${i}`}
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
                  alt="Paisagem litorânea ilustrativa"
                  loading="lazy"
                />
                <span className="region-content">
                  <small>{r.label}</small>
                  <strong>{r.city}</strong>
                </span>
                <span className="region-arrow">
                  <ArrowUpRight />
                </span>
              </button>
            ))}
          </div>
          <p className="region-note">Fotos ilustrativas das regiões.</p>
        </section>
        <section className="seller-section">
          <div className="container seller-inner">
            <div>
              <h2>
                Quer vender ou
                <br />
                alugar seu imóvel?
              </h2>
              <p>
                Informe a localização, a metragem e o valor pretendido para
                consultar como anunciar.
              </p>
            </div>
            <a href="#contato" className="button button-outline">
              Quero anunciar meu imóvel <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

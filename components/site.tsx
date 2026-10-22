"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart, MessageCircle } from "lucide-react";
import { business } from "@/lib/properties";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Hugo Henrique, início">
      <span className="brand-symbol">
        <img src="/images/logo-hugo.jpg" alt="" />
      </span>
      <span>
        Hugo Henrique<small>Corretor de imóveis</small>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Brand />
        <nav
          className={open ? "nav open" : "nav"}
          aria-label="Navegação principal"
        >
          <Link onClick={() => setOpen(false)} href="/#imoveis">
            Imóveis
          </Link>
          <Link onClick={() => setOpen(false)} href="/#sobre">
            Sobre mim
          </Link>
          <Link onClick={() => setOpen(false)} href="/#regioes">
            Cidades
          </Link>
          <Link onClick={() => setOpen(false)} href="/#contato">
            Contato
          </Link>
        </nav>
        <a
          className="header-favorite"
          href="/?favoritos=1#imoveis"
          aria-label="Meus imóveis favoritos"
        >
          <Heart size={20} />
        </a>
        <Link className="button button-small header-cta" href="/#contato">
          Falar com o Hugo
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <>
      <footer>
        <div className="container footer-top">
          <Brand />
          <p>Venda e aluguel em Florianópolis, Balneário Camboriú e Itapema.</p>
          <div>
            <a href="/#imoveis">Imóveis</a>
            <a href="/#sobre">Sobre mim</a>
            <a href="/#contato">Contato</a>
            <Link href="/privacidade">Privacidade</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Hugo Henrique</span>
        </div>
      </footer>
      <a
        className="floating-contact"
        href={
          business.whatsapp ? `https://wa.me/${business.whatsapp}` : "/#contato"
        }
        aria-label="Conversar com Hugo"
      >
        <MessageCircle size={24} />
      </a>
    </>
  );
}
export function Contact({
  subject = "Procuro um imóvel para comprar ou alugar. Cidade: . Tipo: . Valor máximo: .",
}: {
  subject?: string;
}) {
  const [status, setStatus] = useState("");
  return (
    <section id="contato" className="contact-section">
      <div className="container contact-grid">
        <div>
          <h2>Vamos conversar</h2>
          <p>
            Escreve aqui o que você procura: cidade, tipo de imóvel e mais ou
            menos quanto quer gastar. Se for sobre um anúncio do site, coloca o
            código dele.
          </p>
          <p>
            A mensagem abre no seu WhatsApp ou e-mail já preenchida. Você
            confere e envia.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const message = `Olá, Hugo! Sou ${data.get("name")}. Meu contato: ${data.get("contact")}. ${data.get("message")}`;
            if (business.whatsapp) {
              window.open(
                `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`,
                "_blank",
                "noopener,noreferrer",
              );
              setStatus(
                "Sua mensagem foi preparada. Conclua o envio no WhatsApp.",
              );
            } else if (business.email) {
              window.location.href = `mailto:${business.email}?subject=${encodeURIComponent("Contato pelo site")}&body=${encodeURIComponent(message)}`;
              setStatus("Conclua o envio no seu aplicativo de e-mail.");
            } else
              setStatus(
                "O contato do corretor ainda não foi configurado nesta demonstração. Nenhum dado foi enviado.",
              );
          }}
        >
          <label>
            Seu nome
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label>
            E-mail ou WhatsApp
            <input
              name="contact"
              placeholder="Telefone com DDD ou e-mail"
              required
              maxLength={150}
            />
          </label>
          <label>
            Mensagem
            <textarea
              name="message"
              defaultValue={subject}
              required
              maxLength={2000}
            />
          </label>
          <label className="consent">
            <input type="checkbox" required />{" "}
            <span>
              Li a <Link href="/privacidade">política de privacidade</Link> e
              concordo em ser contatado.
            </span>
          </label>
          <button className="button" type="submit">
            Preparar mensagem
          </button>
          <p className="form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}

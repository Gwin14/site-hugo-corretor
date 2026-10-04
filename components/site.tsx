"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Heart, MessageCircle } from "lucide-react";
import { business } from "@/lib/properties";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Hugo Henrique, início">
      <span className="brand-symbol">
        <img src="/images/logo-hugo.jpg" alt="" />
      </span>
      <span>
        HUGO HENRIQUE<small>CORRETOR DE IMÓVEIS</small>
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
            Sobre o Hugo
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
          <Heart size={19} />
        </a>
        <Link className="button button-small header-cta" href="/#contato">
          Falar com Hugo <ArrowUpRight size={16} />
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
          <p>
            Compra, venda e locação
            <br />
            no litoral de Santa Catarina.
          </p>
          <div>
            <a href="/#imoveis">Imóveis</a>
            <a href="/#sobre">Sobre o Hugo</a>
            <a href="/#contato">Entre em contato</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Hugo Henrique. Todos os direitos
            reservados.
          </span>
          <Link href="/privacidade">Privacidade</Link>
          <span>Florianópolis · Balneário Camboriú · Itapema</span>
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
          <h2>
            Fale com <em>Hugo</em>
          </h2>
          <p>
            Informe a cidade, o tipo de imóvel e seu orçamento.
            <br className="desktop-break" /> Para um anúncio específico, inclua
            o código do imóvel.
          </p>
          <div className="contact-signature">
            Hugo Henrique<span>Corretor de imóveis</span>
          </div>
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
              placeholder="Nome completo"
              required
              maxLength={100}
            />
          </label>
          <label>
            E-mail ou WhatsApp
            <input
              name="contact"
              placeholder="Seu e-mail ou telefone com DDD"
              required
              maxLength={150}
            />
          </label>
          <label>
            Como posso ajudar?
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
              concordo com o contato.
            </span>
          </label>
          <button className="button" type="submit">
            Preparar mensagem <ArrowUpRight size={18} />
          </button>
          <p className="form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}

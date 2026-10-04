export const properties = [
  {
    id: 1,
    slug: "refugio-contemporaneo",
    title: "Casa de 380 m² em Jurerê Internacional",
    city: "Florianópolis",
    neighborhood: "Jurerê Internacional",
    type: "Casa",
    purpose: "Comprar",
    price: 4850000,
    area: 380,
    beds: 4,
    baths: 5,
    parking: 3,
    tag: "4 QUARTOS",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    description:
      "Casa à venda em Jurerê Internacional, Florianópolis. São 380 m², 4 quartos, 5 banheiros e 3 vagas de garagem. Valor de venda: R$ 4.850.000.",
  },
  {
    id: 2,
    slug: "horizonte-atlantico",
    title: "Apartamento de 186 m² na Barra Sul",
    city: "Balneário Camboriú",
    neighborhood: "Barra Sul",
    type: "Apartamento",
    purpose: "Comprar",
    price: 3200000,
    area: 186,
    beds: 3,
    baths: 4,
    parking: 2,
    tag: "3 QUARTOS",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    description:
      "Apartamento à venda na Barra Sul, Balneário Camboriú. São 186 m², 3 quartos, 4 banheiros e 2 vagas de garagem. Valor de venda: R$ 3.200.000.",
  },
  {
    id: 3,
    slug: "essencia-do-bem-viver",
    title: "Apartamento de 142 m² em Meia Praia",
    city: "Itapema",
    neighborhood: "Meia Praia",
    type: "Apartamento",
    purpose: "Comprar",
    price: 1890000,
    area: 142,
    beds: 3,
    baths: 3,
    parking: 2,
    tag: "142 M²",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    description:
      "Apartamento à venda em Meia Praia, Itapema. São 142 m², 3 quartos, 3 banheiros e 2 vagas de garagem. Valor de venda: R$ 1.890.000.",
  },
  {
    id: 4,
    slug: "casa-jardim",
    title: "Casa de 210 m² no Campeche",
    city: "Florianópolis",
    neighborhood: "Campeche",
    type: "Casa",
    purpose: "Alugar",
    price: 8500,
    area: 210,
    beds: 3,
    baths: 3,
    parking: 2,
    tag: "3 QUARTOS",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85",
    description:
      "Casa para alugar no Campeche, Florianópolis. São 210 m², 3 quartos, 3 banheiros e 2 vagas de garagem. Aluguel mensal: R$ 8.500.",
  },
  {
    id: 5,
    slug: "cobertura-luz",
    title: "Cobertura de 320 m² no Centro",
    city: "Balneário Camboriú",
    neighborhood: "Centro",
    type: "Cobertura",
    purpose: "Comprar",
    price: 5600000,
    area: 320,
    beds: 4,
    baths: 5,
    parking: 3,
    tag: "COBERTURA",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    description:
      "Cobertura à venda no Centro de Balneário Camboriú. São 320 m², 4 quartos, 5 banheiros e 3 vagas de garagem. Valor de venda: R$ 5.600.000.",
  },
  {
    id: 6,
    slug: "studio-litoral",
    title: "Apartamento de 78 m² no Centro",
    city: "Itapema",
    neighborhood: "Centro",
    type: "Apartamento",
    purpose: "Alugar",
    price: 4200,
    area: 78,
    beds: 2,
    baths: 2,
    parking: 1,
    tag: "2 QUARTOS",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    description:
      "Apartamento para alugar no Centro de Itapema. São 78 m², 2 quartos, 2 banheiros e 1 vaga de garagem. Aluguel mensal: R$ 4.200.",
  },
];
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
export const business = {
  name: "Hugo Henrique",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
};

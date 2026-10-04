import { Header, Footer } from "@/components/site";
export const metadata = { title: "Privacidade" };
export default function Privacy() {
  return (
    <>
      <Header />
      <main className="container legal">
        <h1>Política de privacidade</h1>
        <p>
          Esta versão demonstrativa do site Hugo Henrique não possui cadastro de
          usuários, ferramentas de publicidade ou rastreamento analítico.
        </p>
        <h2>Seus favoritos</h2>
        <p>
          Os imóveis favoritos ficam salvos apenas no armazenamento local do seu
          navegador. Você pode removê-los pelo botão de coração ou limpando os
          dados deste site no navegador.
        </p>
        <h2>Formulário de contato</h2>
        <p>
          Quando houver um canal de atendimento configurado, o formulário
          prepara uma mensagem no WhatsApp ou no seu aplicativo de e-mail. Você
          deve concluir o envio nesse aplicativo. O site não armazena os dados
          preenchidos em um banco de dados. Enquanto o contato não estiver
          configurado, nenhuma mensagem será enviada.
        </p>
        <h2>Serviços externos</h2>
        <p>
          As imagens ilustrativas são carregadas do Unsplash e as fontes do
          Google Fonts. Esses serviços recebem dados técnicos necessários à
          conexão, como endereço IP. Se você abrir o WhatsApp, aplicam-se também
          as políticas desse serviço.
        </p>
        <h2>Antes da operação comercial</h2>
        <p>
          Esta política deve ser atualizada com os dados do responsável pelo
          atendimento e os canais para solicitações de privacidade antes do
          lançamento comercial.
        </p>
      </main>
      <Footer />
    </>
  );
}

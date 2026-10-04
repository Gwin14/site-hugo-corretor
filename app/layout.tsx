import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:{default:'Hugo Henrique | Imóveis para viver o extraordinário',template:'%s | Hugo Henrique'},description:'Encontre seu próximo lar no litoral de Santa Catarina. Uma seleção de imóveis e atendimento próximo em cada etapa da sua escolha.',icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}

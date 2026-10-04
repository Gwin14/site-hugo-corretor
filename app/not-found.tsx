import Link from 'next/link';
import {Header,Footer} from '@/components/site';
export default function NotFound(){return <><Header/><main className="container legal"><h1>Vamos encontrar outro caminho.</h1><p>Este endereço não está disponível. Explore nossa seleção de imóveis.</p><Link className="button" href="/#imoveis">Voltar aos imóveis</Link></main><Footer/></>}

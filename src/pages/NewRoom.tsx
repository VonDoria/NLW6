import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

export function NewRoom(){
    const { user } = useAuth();
    return(
        <div id="page-auth">
            <aside>
                <img src={illustration} alt="Imagem simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua aldiencia em tempo real</p>
                <main>
                    <div className="main-content">
                        <img src={logo} alt="Letmeask" />
                        <h2>Criar uma nova sala</h2>
                        <form>
                            <input type="text" placeholder="Nome da sala" />
                            <Button type="submit">Criar sala</Button>
                        </form>
                        <p>Quer entrar em uma sala existente? <Link to="/">click aqui</Link></p>
                    </div>
                </main>
            </aside>
        </div>
    );
}
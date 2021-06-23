import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'

import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new');
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustration} alt="Imagem simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua aldiencia em tempo real</p>
                <main>
                    <div className="main-content">
                        <img src={logo} alt="Letmeask" />
                        <button onClick={handleCreateRoom} className="create-room">
                            <img src={googleIconImg} alt="Logo do Google" />
                            Crie sua sala com o Google
                        </button>
                        <div className="separetor">Ou entre em uma sala</div>
                        <form>
                            <input type="text" placeholder="Digite o código da sala" />
                            <Button type="submit">Entrar na sala</Button>
                        </form>
                    </div>
                </main>
            </aside>
        </div>
    );
}
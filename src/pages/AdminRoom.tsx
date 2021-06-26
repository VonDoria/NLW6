import { useHistory, useParams } from 'react-router-dom'

import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";

import logo from '../assets/images/logo.svg'
import deleteimg from '../assets/images/delete.svg'
import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}


export function AdminRoom(){
    // const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Tem certeza que você deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}                    
                </div>
                <div className="question-list">
                    {questions.map((question, index) => {
                        return(
                            <Question key={question.id} content={question.content} author={question.author}>
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteimg} alt="Remover pergunta"/>
                                </button>
                            </Question>
                            );
                    })}
                </div>
            </main>
        </div>
    );
}
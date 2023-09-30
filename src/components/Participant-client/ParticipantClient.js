import './participant-client.css'
import {io} from 'socket.io-client'

const socket = io.connect("http://localhost:3000")
export default function ParticipantClient(props){
    const {teamId} = props;
    function buzz(){let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


        socket.emit("message",teamId)
    }

    return(
        <div className="participant-client-wrapper">
            <button className="buzzer" onClick = {buzz}>
            BUZZER
            </button>
            <div className="wager"></div>
        </div>
    )
}
// Routing imporst
import { Link } from "react-router-dom"

// MAIN
export default function TeamClient(){
    let clientList= [];
    for(let i=0;i<10;i++){
        clientList.push(<Link to ={'/Team-client/team'+i+1}><h1>{'Team'+(i+1)}</h1></Link>)
    }

    return (
        <div className="Participant-client">
            {clientList}
        </div>
    )
}

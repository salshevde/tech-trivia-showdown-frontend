// Routing imporst
import { Link } from "react-router-dom"

// MAIN
export default function Participant(){
    let teamsList= [];
    for(let i=0;i<10;i++){
        teamsList.push(<Link to ={'/Participant/team'+i+1}><h1>{'Team'+(i+1)}</h1></Link>)
    }

    return (
        <div className="Participant">
            {teamsList}
        </div>
    )
}
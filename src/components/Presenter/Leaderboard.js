// Component imports
import Header from "../Header";

// Firebase imports
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

// React imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Styling imports
import "./Leaderboard.css";

// MAIN
export default function Leaderboard() {
  /*--------------------Intialisation--------------------*/
  const [teamList, setTeamList] = useState([]);
  const teamRef = ref(db, "/teams");
  let teamTable = []
  
  /*--------------------Assignments--------------------*/
  useEffect(
    function () {
      onValue(
        teamRef,
        (snapshot) => {
          let collection = snapshot.val();
          collection.sort((a, b) => -a.points + b.points);

          setTeamList(collection);
        },

        function (error) {
          console.error();
        }
      );
    },
    [db]
  );

  
  for(let i = 0;i<teamList.length;i++){
    teamTable.push(    <tr>
      <td>{i+1}</td>
      <td>{teamList[i]["team-name"]}</td>
      <td>{teamList[i].points}</td>
    </tr>

    )
  }
  
  return (
    
    <div className="leaderboard-wrapper">
      <Header/>
      <table>
        <tbody>
          <tr>
            <th>Ranking</th>
            <th>Team Name</th>
            <th>Points</th>
          </tr>

          {teamTable}
        </tbody>
      </table>

      <Link to = "/Presenter"><button className="leaderboard-button"><h1>QUESTION TABLE</h1></button></Link>
      
    </div>
  );
}

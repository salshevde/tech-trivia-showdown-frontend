// Component imports
import Header from "../Header";

// Firebase imports
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

// React imports
import { useEffect, useState } from "react";

// Styling imports
import "./participant.css";

// MAIN
export default function Team(props) {
  /*--------------------Intialisation--------------------*/
  const [points, setPoints] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [finalShow, setFinalShow] = useState(false);
  const { teamId } = props;

  /*--------------------Hooks--------------------*/
  useEffect(
    function () {
      const teamRef = ref(db, "/teams/" + teamId);

      onValue(
        teamRef,
        (snapshot) => {
          let collection = snapshot.val();

          setTeamName(collection["team-name"]);
          setPoints(collection.points);
        },

        function (error) {
          console.error();
        }
      );
    },
    [points, db]
  );

  useEffect(
    function () {
      const finalRef = ref(db, "/finalStats");

      onValue(
        finalRef,
        (snapshot) => {
          let collection = snapshot.val();

          setFinalShow(collection.active);
        },

        function (error) {
          console.error();
        }
      );
    },
    [finalShow, db]
  );

  return (
    <div className="team-wrapper">
      <Header />

      <div className="team-info">
        <div className="team-points">{points}</div>
        <div className="team-name">
          <h1>{teamName}</h1>
        </div>
      </div>

      {finalShow ? <div className="wager"></div> : <div className="none"></div>}
    </div>
  );
}

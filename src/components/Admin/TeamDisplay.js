// Firebase imports
import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";

// React imports
import { useEffect, useState } from "react";

// MAIN
export default function TeamDisplay(props) {
  /*--------------------Intialisation--------------------*/
  const [points, setPoints] = useState(0);
  const [teamName, setTeamName] = useState("");
  const { teamId, currPoints } = props;

  /*--------------------Functions--------------------*/
  function addpoints() {
    set(ref(db, "/teams/" + teamId + "/points"), points + currPoints);
  }

  function subtractpoints() {
    set(ref(db, "/teams/" + teamId + "/points"), points - currPoints);
  }

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

  return (
    <div className="admin-team-display">
      <div className="admin-points">{points}</div>
      <div className="admin-team-name">{teamName}</div>
      <button className="right" onClick={addpoints}>
        W
      </button>

      <button className="wrong" onClick={subtractpoints}>
        L
      </button>
    </div>
  );
}

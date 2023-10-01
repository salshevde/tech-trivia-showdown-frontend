import './participant-client.css'
import {io} from 'socket.io-client'

// Firebase imports
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

// React imports
import { useEffect, useState } from "react";

const socket = io.connect("https://tech-trivia-showdown-backend.onrender.com")
export default function ParticipantClient(props){
    const [points, setPoints] = useState(0);
    const [teamName, setTeamName] = useState("");
    const [finalShow, setFinalShow] = useState(false);
    const {teamId} = props;
    function buzz(){let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let message = {
          at: time,
          teamno : teamId
        };
        socket.emit("message",message)
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

    return(
        <div className="participant-client-wrapper">
            <div className="team-info-client">
            <div className="team-name-client">
            {teamName}
            </div>
            <div className="team-points-client">
            {points}
            </div>
            </div>
            
            <button className="buzzer" onClick = {buzz}>
            BUZZER
            </button>
            <div className="wager"></div>
        </div>
    )
}
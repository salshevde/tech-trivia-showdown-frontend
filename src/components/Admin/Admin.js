// Component imports
import TeamDisplay from "./TeamDisplay";
import Header from '../Header'
// Firebase imports
import { db } from "../firebase";
import { ref, onValue, set, child, push, update } from "firebase/database";

// React imports
import { useState, useEffect } from "react";

// Socket.io
import {io} from "socket.io-client";

// Styling imports
import "./admin.css";

const socket = io.connect("https://tech-trivia-showdown-backend.onrender.com")
export default function Admin() {
  /*--------------------Intialisation--------------------*/
  let teamComponents = [];
  let teamBuzz = [];
  const [currPoints, setCurrPoints] = useState(0);

  /*--------------------Intialisation--------------------*/
  useEffect(() => {
    const currRef = ref(db, "/currentStats");
    onValue(currRef, (snapshot) => {
      setCurrPoints(snapshot.val().currPoints);
    });
  }, [currPoints, db]);

  /*--------------------Socket--------------------*/
  useEffect(()=>{
    socket.on("buzz-broadcast",(data)=>{
      console.log(data)
    }
    )
  },[socket])
  /*--------------------Assignment--------------------*/
  for (let i = 0; i < 10; i++) {
    teamComponents.push(<TeamDisplay teamId={i} currPoints={currPoints} />);
  }
  return (
    
    <div className="admin-wrapper">
      <Header/>

      <div className="admin-currQuestion">
        <h1>Current Points: {currPoints}</h1>
      </div>
      <div className="point-management">{teamComponents}</div>
    </div>
  );
}

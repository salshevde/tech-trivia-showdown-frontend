// Component  imports
import Header from "../Header";
import Question from "./Question";
import Topic from "./Topic";
import Stopwatch from "./Stopwatch";
// Firebase imports
import { db } from "../firebase";
import { ref, onValue, set, child, push, update, get } from "firebase/database";

// React imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Socket.io
import { io } from "socket.io-client";

// Styling imports
import "./presenter.css";

const socket = io.connect("https://tech-trivia-showdown-backend.onrender.com");

// MAIN
export default function Presenter() {
  /*--------------------Initialisation--------------------*/
  let finalStats = {};
  let questions = [];
  let topicsList = [];
  let finalShow = 0;
  let questionComponents = [];
  let questionTable = [];

  const [currQuestion, setCurrQuestion] = useState("");
  const [currAns, setCurrAns] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [answerShow, setAnswerShow] = useState(true);
  /*--------------------Team List--------------------*/

  /*--------------------Socket--------------------*/
  useEffect(() => {
    socket.on("buzz-broadcast", (data) => {
      alert(data.teamname," BUZZED AT " ,data.at)
    });
  }, [socket]);
  /*--------------------Firebase--------------------*/
  const questRef = ref(db, "/questions");

  // Question table fetching
  onValue(
    questRef,
    (snapshot) => {
      let collection = snapshot.val();

      for (let i = 0; i < 5; i++) {
        if (collection[i].questions) {
          topicsList.push(<Topic topicName={collection[i].topic} />);
        }
      }
      
      questions = collection.map((questions) => questions.questions);

    },
    function (error) {
      console.error();
    }
  );

  // Final Question Stats fetching
  get(child(ref(db), "/finalStats"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        finalStats = {
          question: snapshot.val().question,
          answer: snapshot.val().answer,
          active: snapshot.val().active,
        };
      }
    })
    .catch((error) => {
      console.error(error);
    });

  /*--------------------Functions--------------------*/
  function delQuestion(topicId, points) {
    let questionId = points / 100 - 1;

    set(ref(db, "/questions/" + topicId + "/questions/" + questionId), {});
  }
  function updateCurrQuestion(question, points) {
    if (question && points) {
      set(ref(db, "/currentStats/currPoints"), points);
      set(ref(db, "/currentStats/currQuestion"), question);
    }
  }
  function showAns() {
    setAnswerShow((curr) => !curr);
  }
  function toggleQuestion(question, topic, points, answer) {
    if (!points) setAnswerShow(true);
    setFocusMode((prevState) => !prevState);
    setCurrQuestion(question);
    setCurrAns(answer);
    updateCurrQuestion(question, points);
    delQuestion(topic, points);
    if (!questions) {
      finalShow = 0;
    }
  }
  function toggleFinal() {
    finalShow = 1;
    setFocusMode((prevState) => !prevState);
    setCurrQuestion(finalStats.question);
    setCurrAns(finalStats.answer);
    set(ref(db, "/finalStats/active"), 1);
    updateCurrQuestion(finalStats.question, 1);
  }
  /*--------------------Creating Question Table--------------------*/

  if (questions) {
    for (let i = 0; i < questions.length; i++) {
      console.log(questions[i],i)
      if (questions[i] && Array.isArray(questions[i])) {
        finalShow++;
        questionComponents.push(
          questions[i].map((q) => (
            <Question
              points={q.points}
              answer={q.answer}
              handleClick={() =>
                toggleQuestion(q.question, i, q.points, q.answer)
              }
            />
          ))
        );
      } else if (questions[i]) {
        finalShow++;
        let questionItem = []
        for (let j in questions[i]) {
          let q = questions[i][`${j}`];
          console.log('q',q);
          questionItem.push(
            <Question
              points={q.points}
              answer={q.answer}
              handleClick={() => toggleQuestion(q.question, i, q.points,q.answer)}
            />
          );
        }

        questionComponents.push(questionItem);
        
        
        
      }
    
    }

    console.log(questionComponents)
  }

  for (let i = 0; i < 5; i++) {
    questionTable.push(
      <div className="col">
        {topicsList[i]}
        {questionComponents[i]}
      </div>
    );
  }

  /*--------------------Creating Question Table--------------------*/
  return (
    <div className="presenter-wrapper">
      <Header />

      {/*--------------------Question Table--------------------*/}
      {focusMode ? (
        <div className="question-render">
          <Stopwatch />
          <p>{currQuestion}</p>
          <div className="team-icons"></div>
          {finalShow ? (
            <button className="nextQuestion" onClick={toggleQuestion}>
              NEXT
            </button>
          ) : (
            <Link to="/Presenter/Leaderboard">
              <button className="nextQuestion">NEXT</button>
            </Link>
          )}

          {answerShow && (
            <button className="answer" onClick={showAns}>
              ANSWER
            </button>
          )}

          {!answerShow && (
            <div className="answer-display">
              <p>{currAns}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="question-table">
          <div className="questions">{questionTable}</div>
        </div>
      )}

      {/*--------------------Final Question--------------------*/}
      {!finalShow && !focusMode ? (
        <div className="finalShow">
          <button onClick={toggleFinal}>FINAL QUESTION</button>
        </div>
      ) : (
        <div className="none"></div>
      )}

      {/*--------------------Leaderboard Button--------------------*/}
      <Link to="/Presenter/Leaderboard">
        <button className="leaderboard-button">
          <h1>LEADERBOARD</h1>
        </button>
      </Link>
    </div>
  );
}

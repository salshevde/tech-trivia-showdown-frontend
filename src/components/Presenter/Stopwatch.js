import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import "./stopwatch.css";

export default function Stopwatch(){
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">TIME UP</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
      };
      const [key, setKey] = useState(0);
      const [play, setPlay] = useState(false);
      return(
        <div className="timer-wrapper">
        <CountdownCircleTimer
        key={key}
          isPlaying = {play}
          duration={20}
          colors={["#00ffff", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[20, 10, 5, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>

        <div className="button-restart-wrapper">
        <button onClick={() => setKey((prevKey) => prevKey + 1)}>
          Restart
        </button>
        <button onClick={() => setPlay((play) => !play)}>
          ||
        </button>
      </div>
      </div>
      )
}
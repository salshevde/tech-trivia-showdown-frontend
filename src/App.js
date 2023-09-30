// Components imports
import Admin from "./components/Admin/Admin";
import Participant from "./components/Participant/Participant";
import Presenter from "./components/Presenter/Presenter";
import Home from "./components/Home";
import Team from "./components/Participant/Team";
import Leaderboard from "./components/Presenter/Leaderboard";
import ParticipantClient from "./components/Participant-client/ParticipantClient";
import TeamClient from "./components/Participant-client/TeamClient";
import Missing from "./components/Missing";

//import {AuthProvider} from './context/AuthProvider'

// Routing imports
import { Route, Routes, useHistory } from "react-router-dom";

// MAIN
export default function App() {
  let teamsList = [];
  for (let i = 0; i < 10; i++) {
    teamsList.push(
      <Route path={"/Participant/team" + i + 1} element={<Team teamId={i} />} />
    );
  }

  let clientList = [];
  for (let i = 0; i < 10; i++) {
    clientList.push(
      <Route path={"/Team-client/team" + i + 1} element={<ParticipantClient teamId={i} />} />
    );
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Participant" element={<Participant />} />
        <Route path="/Presenter" element={<Presenter />} />
        <Route path="/Presenter/Leaderboard" element={<Leaderboard />} />
        <Route path="/Team-client" element={<TeamClient/>} />
        
        {clientList}
        {teamsList}

        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

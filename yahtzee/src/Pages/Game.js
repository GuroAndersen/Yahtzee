import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScoreTable from '../Components/ScoreTable';
import { InputText } from 'primereact/inputtext';

export default function Game() {
  
  const { numPlayers } = useParams();
  const [playerNickname, setPlayerNickname] = useState("");
  const [playerScore, setPlayerScore] = useState([]);

  useEffect (() => {

  })
  
  return (
    <div className="Game-component">
      <h1>THE GAME</h1>
      <div className="number-of-players">
        <p>Number of players chosen: {numPlayers}</p>
        <div className="player-nickname-entry">
          <p>Player {numPlayers}</p>
          {/*<InputText value={playerNickname} onChange={(e) => setPlayerNickname(e.target.playerNickname)} /> */}
        </div>
        
      </div>
      <div className="score-table">
          
      </div>
      <div className="dice-table">

      </div>
    </div>
  );
}

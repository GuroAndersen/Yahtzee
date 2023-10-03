import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScoreTable from '../Components/ScoreTable';
import { InputText } from 'primereact/inputtext';
import DiceTable from "../Components/DiceTable";
import './Game.css';

export default function Game() {
  
  const { numPlayers } = useParams();
  const [playerScore, setPlayerScore] = useState([]);

  useEffect (() => {

  })
  
  return (
    <div className="Game-component">
      <h1>THE GAME</h1>
      <div className="number-of-players">
        <p>Number of players chosen: {numPlayers}</p>
      </div>
      <div className="game-components">
        <div className="dice-table">
          <DiceTable />
        </div>
        <div className="score-table">
          <ScoreTable numPlayers={parseInt(numPlayers, 10)} />
        </div>
      </div>
    </div>
  );
}

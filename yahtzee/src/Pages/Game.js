import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ScoreTable from '../Components/ScoreTable';
import DiceTable from "../Components/DiceTable";
import './Game.css';
import DiceContext from '../Components/DiceContext';


export default function Game() {
  
  const { numPlayers } = useParams();
  const [diceValue, setDiceValue] = useState([0, 0, 0, 0, 0]);
 
  return (
    <div className="Game-component">
      <h1>THE GAME</h1>
      <div className="number-of-players">
        <p>Number of players chosen: {numPlayers}</p>
      </div>
      <DiceContext.Provider value={{ diceValue, setDiceValue }}>
        <div className="game-components">
        <div className="dice-table">
          <DiceTable />
        </div>
        <div className="score-table">
          <ScoreTable numPlayers={parseInt(numPlayers, 10)} />
        </div>
      </div>
      </DiceContext.Provider>
      
    </div>
  );
}

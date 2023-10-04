import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ScoreTable from '../Components/ScoreTable';
import DiceTable from "../Components/DiceTable";
import './Game.css';
import DiceContext from '../Components/DiceContext';
import ButtonContext from "../Components/ButtonContext";
import TurnContext from "../Components/TurnContext";
import SaveDiceContext from "../Components/SaveDiceContext";
import WinnerContext from "../Components/WinnerContext";


export default function Game() {
  
  const { numPlayers } = useParams();
  const [diceValue, setDiceValue] = useState([1, 2, 3, 4, 5]);
  const [numRolls, setNumRolls] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [saveDice, setSaveDice] = useState([false, false, false, false, false]);
  const [winner, setWinner] = useState(0);
 
  return (
    <div className="Game-component">
      <div className="App-logo-game">
          <img
            src={"/DiceImage/die-logo.png"}
            id={"dice-logo"}
            alt={"dice-logo"}
          />
        </div>
      <h1>THE GAME</h1>
      <div className="number-of-players">
        <p>Number of players chosen: {numPlayers}</p>
      </div>
      <DiceContext.Provider value={{ diceValue, setDiceValue }}>
      <ButtonContext.Provider value={{ numRolls, setNumRolls}}>
      <TurnContext.Provider value={{currentTurn, setCurrentTurn}}>
      <SaveDiceContext.Provider value={{saveDice, setSaveDice}}>
      <WinnerContext.Provider value={{winner, setWinner}}>
        <div className="game-components">
        <div className="dice-table">
          <DiceTable />
        </div>
        <div className="score-table">
          <ScoreTable numPlayers={parseInt(numPlayers, 10)} />
        </div>
      </div>
      </WinnerContext.Provider>
        
      </SaveDiceContext.Provider>
        
      </TurnContext.Provider>
      </ButtonContext.Provider>
      </DiceContext.Provider>
      <div className="winner-component">
        <h1>
           {winner !== 0 ? ('Player ' + winner + ' wins') : null} 
        </h1>
      </div>
    </div>
  );
}

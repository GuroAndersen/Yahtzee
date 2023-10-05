import React, { useContext, useState} from "react";
import "./DiceTable.css";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import axios from 'axios';
import EvaluateRoll from './EvaluateRoll';
import DiceContext from "./DiceContext";
import ButtonContext from "./ButtonContext";
import TurnContext from "./TurnContext";
import SaveDiceContext from "./SaveDiceContext";
import EvaluateContext from "./EvaluateContext";

export default function DiceTable() {
  const { numPlayers } = useParams();
  const {saveDice, setSaveDice} = useContext(SaveDiceContext);
  const {diceValue, setDiceValue} = useContext(DiceContext);
  const {currentTurn, setCurrentTurn} = useContext(TurnContext);
  const {numRolls, setNumRolls} = useContext(ButtonContext);
  const {evaluation, setEvaluation} = useContext(EvaluateContext);

  const maxTurns = 3;
  const numberOfDice = 5;

  let images = [
    "/DiceImage/Die-1.png",
    "/DiceImage/Die-2.png",
    "/DiceImage/Die-3.png",
    "/DiceImage/Die-4.png",
    "/DiceImage/Die-5.png",
    "/DiceImage/Die-6.png",
  ];

  //console.log(dice);

  function toggleSave(index) {
    const newSavedDice = [...saveDice];
    newSavedDice[index] = !newSavedDice[index];
    setSaveDice(newSavedDice);
  }

  function roll() { 
      axios.get(`/api/Yahtzee/roll/${numberOfDice}`)
      .then(response => {
        const fetchedDiceRoll = response.data;
        
        const newDiceValue = diceValue.map((value, index) => {
            if (!saveDice[index]) {
                return fetchedDiceRoll[index];
            }
            return value;
        });

        setDiceValue(newDiceValue);
        //setDiceImage(newDiceValue);
        console.log(newDiceValue);

      EvaluateRoll(newDiceValue, (evaluation) => {
        console.log("numrolls again: ", numRolls);   
        if (numRolls < maxTurns) {
            setEvaluation(evaluation);
            setNumRolls(numRolls + 1);
        } else {
            setEvaluation(undefined);
            setNumRolls(0);
        }   
      })
  
    })
    .catch(error => {
        console.error("Error fetching dice roll value: ", error);
    });
  }

  

  return (
    <div className="dice-table-content">
      <div className="dice-table-top">
        <h1 className="player-name">Player {currentTurn}'s turn</h1>
        <p>Rolls: {numRolls}</p>
      </div>
      <div className="dice-table-dice">
        <div className="top-dice">
          <img
          src={images[diceValue[0]-1]}
          id="die-1"
          alt="die-1"
          onClick={() => toggleSave(0)}
          className={saveDice[0] ? "highlighted" : ""}
        />
        <img
          src={images[diceValue[1]-1]}
          id="die-2"
          alt="die-2"
          onClick={() => toggleSave(1)}
          className={saveDice[1] ? "highlighted" : ""}
        />
        </div>
        <div className="bottom-dice">
          <img
          src={images[diceValue[2]-1]}
          id="die-3"
          alt="die-3"
          onClick={() => toggleSave(2)}
          className={saveDice[2] ? "highlighted" : ""}
        />
        <img
          src={images[diceValue[3]-1]}
          id="die-4"
          alt="die-4"
          onClick={() => toggleSave(3)}
          className={saveDice[3] ? "highlighted" : ""}
        />
        <img
          src={images[diceValue[4]-1]}
          id="die-5"
          alt="die-5"
          onClick={() => toggleSave(4)}
          className={saveDice[4] ? "highlighted" : ""}
        />
        </div>
        
      </div>

      <div className="dice-table-bottom">
        <Button className="btn" onClick={roll} disabled={numRolls === maxTurns} outlined style={{width: '30vh', hover: 'var(--primary-100)'}} >
          Roll Dice
        </Button>     
        
      </div>
    </div>
  );
}

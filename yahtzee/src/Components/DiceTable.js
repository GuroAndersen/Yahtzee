import React, { useState} from "react";
import "./DiceTable.css";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import axios from 'axios';

export default function DiceTable() {
  const { numPlayers } = useParams();
  const [saveDice, setSaveDice] = useState([false, false, false, false, false]);
  const [diceImage, setDiceImage] = useState([0, 0, 0, 0, 0]);
  const [diceValue, setDiceValue] = useState([0, 0, 0, 0, 0]);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [numRolls, setNumRolls] = useState(0);

  const maxTurns = 3;
  const numberOfDice = 5;

  let images = [
    "/DiceImage/Dice-1.png",
    "/DiceImage/Dice-2.png",
    "/DiceImage/Dice-3.png",
    "/DiceImage/Dice-4.png",
    "/DiceImage/Dice-5.png",
    "/DiceImage/Dice-6.png",
  ];

  //console.log(dice);

  function toggleSave(index) {
    const newSavedDice = [...saveDice];
    newSavedDice[index] = !newSavedDice[index];
    setSaveDice(newSavedDice);
  }

  function nextTurn() {
    setCurrentTurn((prevTurn) => {
        if (prevTurn === parseInt(numPlayers)) {
            return 1;
        }
        return prevTurn + 1;
    })
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
        setDiceImage(newDiceValue);
        console.log(newDiceValue);

        if (numRolls < maxTurns) {
            setNumRolls(numRolls + 1);
        } else {
            setNumRolls(0);
            nextTurn();
        }
    })
    .catch(error => {
        console.error("Error fetching dice roll value: ", error);
    });
}

  return (
    <div className="dice-table-content">
      <div className="dice-table-game"></div>
      <div className="dice-table-dice">
        <img
          src={images[diceImage[0]-1]}
          id="die-1"
          alt="die-1"
          onClick={() => toggleSave(0)}
        />
        <img
          src={images[diceImage[1]-1]}
          id="die-2"
          alt="die-2"
          onClick={() => toggleSave(1)}
        />
        <img
          src={images[diceImage[2]-1]}
          id="die-3"
          alt="die-3"
          onClick={() => toggleSave(2)}
        />
        <img
          src={images[diceImage[3]-1]}
          id="die-4"
          alt="die-4"
          onClick={() => toggleSave(3)}
        />
        <img
          src={images[diceImage[4]-1]}
          id="die-5"
          alt="die-5"
          onClick={() => toggleSave(4)}
        />
      </div>

      <div className="dice-table-bottom">
        <Button className="btn" onClick={roll}>
          Roll Dice
        </Button>
        <div className="player-name">Player {currentTurn}'s turn</div>
      </div>
    </div>
  );
}

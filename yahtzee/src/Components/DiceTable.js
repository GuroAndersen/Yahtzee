import React, { useState } from "react";
import "./DiceTable.css";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";

export default function DiceTable() {
  const { numPlayers } = useParams();
  const [saveDice, setSaveDice] = useState([false, false, false, false, false]);
  const [diceValue, setDiceValue] = useState([0, 0, 0, 0, 0]);

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

  function roll() {
    const newDiceValue = diceValue.map((value, index) => {
      if (!saveDice[index]) {
        return Math.floor(Math.random() * 6);
      }
      return value;
    });
    setDiceValue(newDiceValue);

      console.log(
        newDiceValue
      );
      
  }

  return (
    <div className="dice-table-content">
      <div className="dice-table-game"></div>
      <div className="dice-table-dice">
        <img
          src={images[diceValue[0]]}
          id="die-1"
          alt="die-1"
          onClick={() => toggleSave(0)}
        />
        <img
          src={images[diceValue[1]]}
          id="die-2"
          alt="die-2"
          onClick={() => toggleSave(1)}
        />
        <img
          src={images[diceValue[2]]}
          id="die-3"
          alt="die-3"
          onClick={() => toggleSave(2)}
        />
        <img
          src={images[diceValue[3]]}
          id="die-4"
          alt="die-4"
          onClick={() => toggleSave(3)}
        />
        <img
          src={images[diceValue[4]]}
          id="die-5"
          alt="die-5"
          onClick={() => toggleSave(4)}
        />
      </div>

      <div className="dice-table-bottom">
        <Button className="btn" onClick={roll}>
          Roll Dice
        </Button>
        <div className="player-name">{numPlayers}</div>
      </div>
    </div>
  );
}

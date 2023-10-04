import React, { useContext, useState } from "react";
import "./ScoreTable.css";
import EvaluateRoll from "./EvaluateRoll";
import DiceContext from './DiceContext';
 
export default function ScoreTable({ numPlayers }) {
  const upperSection = [
    "Ones",
    "Twos",
    "Threes",
    "Fours",
    "Fives",
    "Sixes",
    "Sum",
    "Bonus",
  ];
  const lowerSection = [
    "Three of a kind",
    "Four of a kind",
    "Full house",
    "Small straight",
    "Large straight",
    "Chance",
    "Yahtzee",
    "Total sum",
  ];
  const allSections = ["Score Type", ...upperSection, ...lowerSection];

  var rows = allSections.length;
  var cols = numPlayers + 1;

  
  const [cellValues, setCellValues] = useState({});
  const [lockedCells, setLockedCells] = useState([]);
  const {diceValue, setDiceValue} = useContext(DiceContext);

  const initScore = (numPlayers) => {
    let playerScores = [];
    
    for (let i = 0; i < numPlayers; i++) {
      const playerscore = {
        ones: 1,
        twos: 2,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        sum: undefined,
        bonus: undefined,
        threeofakind: undefined,
        fourofakind: undefined,
        fullhouse: undefined,
        smallstraight: undefined,
        largestraight: undefined,
        chance: undefined,
        yahtzee: undefined,
        totalsum: undefined,
      };

      playerScores.push(playerscore);
    }
    return playerScores;
  }
  
  const [scores, setScores] = useState(initScore(numPlayers));

  const handleClick= (rowIndex, colIndex) => {
    if (lockedCells[`${rowIndex}-${colIndex}`]) return;

    const value = EvaluateRoll(diceValue, (evaluation) => {
      console.log(evaluation);
    });

    console.log(scores);
    updateCells();
    console.log(cellValues);

    setLockedCells((prevLocked) => ({
      ...prevLocked,
      [`${rowIndex}-${colIndex}`]: true,
    }));
  }
  
  function updateCells() {
    for (let i = 0; i < cols - 1; i++) {
      console.log(i);
      setCellValues((prevValues) => ({
        ...prevValues,
        [`${1}-${i+1}`]: scores[i].ones,
        [`${2}-${i+1}`]: scores[i].twos,
        [`${3}-${i+1}`]: scores[i].threes,
        [`${4}-${i+1}`]: scores[i].fours,
        [`${5}-${i+1}`]: scores[i].fives,
        [`${6}-${i+1}`]: scores[i].sixes,
        [`${9}-${i+1}`]: scores[i].threeofakind,
        [`${10}-${i+1}`]: scores[i].fourofakind,
        [`${11}-${i+1}`]: scores[i].fullhouse,
        [`${12}-${i+1}`]: scores[i].smallstraight,
        [`${13}-${i+1}`]: scores[i].largestraight,
        [`${14}-${i+1}`]: scores[i].chance,
        [`${15}-${i+1}`]: scores[i].yahtzee,
    }));
    }
  }
  
  return (
    <div className="table-content">
      <table style={{ marginLeft: "2vw" }}>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: cols }).map((_, j) => {
                if (j === 0) {
                  return <td key={j}>{allSections[i]}</td>;
                } else {
                  if (i === 0) {
                    return <td key={j}>Player {j}</td>;
                  } else {
                    return (
                      <td key={j} onClick={() => handleClick(i, j)} style={{ cursor: 'pointer', backgroundColor: 'wheat', color: 'black'}}>
                        {cellValues[`${i}-${j}`] || `${i}-${j}`} {/* Display cell value */}
                      </td>
                    );
                  }
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

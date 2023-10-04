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
  const [evaluation, setEvaluation] = useState({});
  const [currentTurn, setCurrentTurn] = useState(1);

  const initScore = (numPlayers) => {
    let playerScores = [];
    
    for (let i = 0; i < numPlayers; i++) {
      const playerscore = {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        sum: undefined,
        bonus: undefined,
        threeOfAKind: undefined,
        fourOfAKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        chance: undefined,
        yahtzee: undefined,
        totalSum: undefined,
      };

      playerScores.push(playerscore);
    }
    return playerScores;
  }
  
  const [scores, setScores] = useState(initScore(numPlayers));

  const handleClick= (rowIndex, colIndex) => {
    if (lockedCells[`${rowIndex}-${colIndex}`]) return;

  
    const value = EvaluateRoll(diceValue, (evaluation) => {
      console.log("Here is eval: ", evaluation);
      let ev = evaluation;
      setEvaluation(evaluation);

      if (rowIndex === 1) {
        scores[colIndex-1].ones = evaluation.aces;
      }
      else if (rowIndex === 2){
        scores[colIndex-1].twos = evaluation.twos;
      }
      else if (rowIndex === 3){
        scores[colIndex-1].threes = evaluation.threes;
      }
      else if (rowIndex === 4){
        scores[colIndex-1].fours = evaluation.fours;
      }
      else if (rowIndex === 5){
        scores[colIndex-1].fives = evaluation.fives;
      }
      else if (rowIndex === 6){
        scores[colIndex-1].sixes = evaluation.sixes;
      }
      else if (rowIndex === 7){
        scores[colIndex-1].sum = evaluation.sum;
      }
      else if (rowIndex === 9){
        scores[colIndex-1].bonus = evaluation.bonus;
      }
      else if (rowIndex === 10){
        scores[colIndex-1].threeOfAKind = evaluation.threeOfAKind;
      }
      else if (rowIndex === 11){
        scores[colIndex-1].fourOfAKind = evaluation.fourOfAKind;
      }
      else if (rowIndex === 12){
        scores[colIndex-1].fullHouse = evaluation.fullHouse;
      }
      else if (rowIndex === 13){
        scores[colIndex-1].smallStraight = evaluation.smallStraight;
      }
      else if (rowIndex === 14){
        scores[colIndex-1].largeStraight = evaluation.largeStraight;
      }
      else if (rowIndex === 15){
        scores[colIndex-1].chance = evaluation.chance;
      }
      else if (rowIndex === 16){
        scores[colIndex-1].yahtzee = evaluation.yahtzee;
      }
      else if (rowIndex === 17){
        scores[colIndex-1].totalSum = evaluation.totalSum;
      }
      setScores(scores);
      console.log(scores);
      updateCells();
      console.log(cellValues);
  
      setLockedCells((prevLocked) => ({
        ...prevLocked,
        [`${rowIndex}-${colIndex}`]: true,
      }));
    });

    
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
        [`${7}-${i+1}`]: scores[i].bonus,
        [`${8}-${i+1}`]: scores[i].sum,
        [`${9}-${i+1}`]: scores[i].threeOfaKind,
        [`${10}-${i+1}`]: scores[i].fourOfAKind,
        [`${11}-${i+1}`]: scores[i].fullHouse,
        [`${12}-${i+1}`]: scores[i].smallStraight,
        [`${13}-${i+1}`]: scores[i].largeStraight,
        [`${14}-${i+1}`]: scores[i].chance,
        [`${15}-${i+1}`]: scores[i].yahtzee,
        [`${16}-${i+1}`]: scores[i].totalSum,
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

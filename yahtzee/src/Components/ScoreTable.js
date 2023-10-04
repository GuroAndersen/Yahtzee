import React, { useContext, useState } from "react";
import "./ScoreTable.css";
import EvaluateRoll from "./EvaluateRoll";
import DiceContext from './DiceContext';
import ButtonContext from "./ButtonContext";
import TurnContext from "./TurnContext";
import SaveDiceContext from "./SaveDiceContext";
 
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
  const { numRolls, setNumRolls } = useContext(ButtonContext);
  const {currentTurn, setCurrentTurn} = useContext(TurnContext);
  const {saveDice, setSaveDice} = useContext(SaveDiceContext);

  const resetRolls = () => {
    setNumRolls(0);
  }

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

  function nextTurn() {
    setCurrentTurn((prevTurn) => {
        if (prevTurn === parseInt(numPlayers)) {
            return 1;
        }
        return prevTurn + 1;
    })
  }
  
  const [scores, setScores] = useState(initScore(numPlayers));

  const handleClick= (rowIndex, colIndex) => {
    if (lockedCells[`${rowIndex}-${colIndex}`]) return;
    console.log("current turn: ", currentTurn);
    console.log("colindex: ", colIndex);
    if (currentTurn !== colIndex) return;
    if (numRolls === 0) {
      return;
    }
    if (rowIndex === 7 || rowIndex === 8 || rowIndex === 16) {
      return;
    }
  
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
      else if (rowIndex === 9){
        scores[colIndex-1].threeOfAKind = evaluation.threeOfAKind;
      }
      else if (rowIndex === 10){
        scores[colIndex-1].fourOfAKind = evaluation.fourOfAKind;
      }
      else if (rowIndex === 11){
        scores[colIndex-1].fullHouse = evaluation.fullHouse;
      }
      else if (rowIndex === 12){
        scores[colIndex-1].smallStraight = evaluation.smallStraight;
      }
      else if (rowIndex === 13){
        scores[colIndex-1].largeStraight = evaluation.largeStraight;
      }
      else if (rowIndex === 14){
        scores[colIndex-1].chance = evaluation.chance;
      }
      else if (rowIndex === 15){
        scores[colIndex-1].yahtzee = evaluation.yahtzee;
      }
      
      let sum = 0;
      if (scores[colIndex-1].ones !== undefined) {
        sum += scores[colIndex-1].ones; 
      }
      if (scores[colIndex-1].twos !== undefined) {
        sum += scores[colIndex-1].twos; 
      }
      if (scores[colIndex-1].threes !== undefined) {
        sum += scores[colIndex-1].threes; 
      }
      if (scores[colIndex-1].fours !== undefined) {
        sum += scores[colIndex-1].fours; 
      }
      if (scores[colIndex-1].fives !== undefined) {
        sum += scores[colIndex-1].fives; 
      }
      if (scores[colIndex-1].sixes !== undefined) {
        sum += scores[colIndex-1].sixes; 
      }

      scores[colIndex-1].sum = sum;

      if (sum >= 63) {
        scores[colIndex-1].bonus = 35;
      } else {
        scores[colIndex-1].bonus = 0;
      }

      let totalSum = 0;
      if (scores[colIndex-1].sum !== undefined) {
        totalSum += scores[colIndex-1].sum;
      }
      if (scores[colIndex-1].bonus !== undefined) {
        totalSum += scores[colIndex-1].bonus;
      }
      if (scores[colIndex-1].threeOfAKind !== undefined) {
        totalSum += scores[colIndex-1].threeOfAKind;
      }
      if (scores[colIndex-1].fourOfAKind !== undefined) {
        totalSum += scores[colIndex-1].fourOfAKind;
      }
      if (scores[colIndex-1].fullHouse !== undefined) {
        totalSum += scores[colIndex-1].fullHouse;
      }
      if (scores[colIndex-1].smallStraight !== undefined) {
        totalSum += scores[colIndex-1].smallStraight;
      }
      if (scores[colIndex-1].largeStraight !== undefined) {
        totalSum += scores[colIndex-1].largeStraight;
      }
      if (scores[colIndex-1].chance !== undefined) {
        totalSum += scores[colIndex-1].chance;
      }
      if (scores[colIndex-1].yahtzee !== undefined) {
        totalSum += scores[colIndex-1].yahtzee;
      }

      scores[colIndex-1].totalSum = totalSum;

      setScores(scores);
      resetRolls();
      nextTurn();
      setSaveDice([false, false, false, false, false]);
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
        [`${7}-${i+1}`]: scores[i].sum,
        [`${8}-${i+1}`]: scores[i].bonus,
        [`${9}-${i+1}`]: scores[i].threeOfAKind,
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
                      <td key={j} onClick={() => handleClick(i, j)} style={{ cursor: 'pointer', backgroundColor: 'var(--primary-100)', color: 'black'}}>
                        {cellValues[`${i}-${j}`] !== undefined ? cellValues[`${i}-${j}`] : ""} {/* Display cell value */}
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

import React, { useContext, useState } from "react";
import "./ScoreTable.css";
import DiceContext from './DiceContext';

import { useParams } from "react-router-dom";

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

  const [score, setScore] = useState(0);
  
  const [cellValues, setCellValues] = useState({});

  const {diceValue, setDiceValue} = useContext(DiceContext);

  
  

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
                      <td key={j} >
                        {cellValues[`${i}-${j}`] || ""} {/* Display cell value */}
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

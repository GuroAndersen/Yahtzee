import React from "react";
import "./ScoreTable.css";

export default function ScoreTable({ numPlayers }) {
  const upperSection = [
    "Ones",
    "Twos",
    "Threes",
    "Fours",
    "Fives",
    "Sixes",
    "Bonus",
  ];
  const lowerSection = [
    "Three of a kind",
    "Four of a kind",
    "Full house",
    "Small straight",
    "Large straight",
    "Yahtzee",
    "Chance",
    "Total sum",
  ];
  const allSections = ["Score Type", ...upperSection, ...lowerSection];

  var rows = allSections.length;
  var cols = numPlayers + 1;

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
                    return <td key={j}></td>; // Empty cell or any placeholder content you want
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

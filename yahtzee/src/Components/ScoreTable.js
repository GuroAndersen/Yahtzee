import React, { useContext, useState, useEffect } from "react";
import "./ScoreTable.css";
import EvaluateRoll from "./EvaluateRoll";
import DiceContext from "./DiceContext";
import ButtonContext from "./ButtonContext";
import TurnContext from "./TurnContext";
import SaveDiceContext from "./SaveDiceContext";
import WinnerContext from "../Components/WinnerContext";
import EvaluateContext from "./EvaluateContext";

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
  const { diceValue, setDiceValue } = useContext(DiceContext);
  const { numRolls, setNumRolls } = useContext(ButtonContext);
  const { currentTurn, setCurrentTurn } = useContext(TurnContext);
  const { saveDice, setSaveDice } = useContext(SaveDiceContext);
  const { winner, setWinner } = useContext(WinnerContext);
  const { evaluation, setEvaluation } = useContext(EvaluateContext);

  const resetRolls = () => {
    setNumRolls(0);
    setEvaluation(undefined);
  };

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
  };

  function nextTurn() {
    setCurrentTurn((thisTurn) => {
      if (thisTurn === parseInt(numPlayers)) {
        return 1;
      }
      return prevTurn + 1;
    });
  }

  function checkCompletion(scores) {
    for (let i = 1; i < cols; i++) {
      for (let j = 1; j < rows; j++) {
        if (scores[`${j}-${i}`] === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  const [scores, setScores] = useState(initScore(numPlayers));

  const handleClick = (rowIndex, colIndex) => {
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

      if (rowIndex === 1) {
        scores[colIndex - 1].ones = evaluation.aces;
      } else if (rowIndex === 2) {
        scores[colIndex - 1].twos = evaluation.twos;
      } else if (rowIndex === 3) {
        scores[colIndex - 1].threes = evaluation.threes;
      } else if (rowIndex === 4) {
        scores[colIndex - 1].fours = evaluation.fours;
      } else if (rowIndex === 5) {
        scores[colIndex - 1].fives = evaluation.fives;
      } else if (rowIndex === 6) {
        scores[colIndex - 1].sixes = evaluation.sixes;
      } else if (rowIndex === 9) {
        scores[colIndex - 1].threeOfAKind = evaluation.threeOfAKind;
      } else if (rowIndex === 10) {
        scores[colIndex - 1].fourOfAKind = evaluation.fourOfAKind;
      } else if (rowIndex === 11) {
        scores[colIndex - 1].fullHouse = evaluation.fullHouse;
      } else if (rowIndex === 12) {
        scores[colIndex - 1].smallStraight = evaluation.smallStraight;
      } else if (rowIndex === 13) {
        scores[colIndex - 1].largeStraight = evaluation.largeStraight;
      } else if (rowIndex === 14) {
        scores[colIndex - 1].chance = evaluation.chance;
      } else if (rowIndex === 15) {
        scores[colIndex - 1].yahtzee = evaluation.yahtzee;
      }

      let sum = 0;
      if (scores[colIndex - 1].ones !== undefined) {
        sum += scores[colIndex - 1].ones;
      }
      if (scores[colIndex - 1].twos !== undefined) {
        sum += scores[colIndex - 1].twos;
      }
      if (scores[colIndex - 1].threes !== undefined) {
        sum += scores[colIndex - 1].threes;
      }
      if (scores[colIndex - 1].fours !== undefined) {
        sum += scores[colIndex - 1].fours;
      }
      if (scores[colIndex - 1].fives !== undefined) {
        sum += scores[colIndex - 1].fives;
      }
      if (scores[colIndex - 1].sixes !== undefined) {
        sum += scores[colIndex - 1].sixes;
      }

      scores[colIndex - 1].sum = sum;

      if (sum >= 63) {
        scores[colIndex - 1].bonus = 35;
      } else {
        scores[colIndex - 1].bonus = 0;
      }

      let totalSum = 0;
      if (scores[colIndex - 1].sum !== undefined) {
        totalSum += scores[colIndex - 1].sum;
      }
      if (scores[colIndex - 1].bonus !== undefined) {
        totalSum += scores[colIndex - 1].bonus;
      }
      if (scores[colIndex - 1].threeOfAKind !== undefined) {
        totalSum += scores[colIndex - 1].threeOfAKind;
      }
      if (scores[colIndex - 1].fourOfAKind !== undefined) {
        totalSum += scores[colIndex - 1].fourOfAKind;
      }
      if (scores[colIndex - 1].fullHouse !== undefined) {
        totalSum += scores[colIndex - 1].fullHouse;
      }
      if (scores[colIndex - 1].smallStraight !== undefined) {
        totalSum += scores[colIndex - 1].smallStraight;
      }
      if (scores[colIndex - 1].largeStraight !== undefined) {
        totalSum += scores[colIndex - 1].largeStraight;
      }
      if (scores[colIndex - 1].chance !== undefined) {
        totalSum += scores[colIndex - 1].chance;
      }
      if (scores[colIndex - 1].yahtzee !== undefined) {
        totalSum += scores[colIndex - 1].yahtzee;
      }

      scores[colIndex - 1].totalSum = totalSum;

      setScores(scores);
      resetRolls();
      nextTurn();
      setSaveDice([false, false, false, false, false]);
      console.log(scores);
      updateCells(scores);
      console.log("cellvalues: ", cellValues);

      setLockedCells((prevLocked) => ({
        ...prevLocked,
        [`${rowIndex}-${colIndex}`]: true,
      }));
    });
  };

  useEffect(() => {
    checkWinners();
    console.log("Hei og ha: ", evaluation);
  });

  function evaluationValue(index) {
    if (index === 1) {
      return evaluation.aces;
    }
    if (index === 2) {
      return evaluation.twos;
    }
    if (index === 3) {
      return evaluation.threes;
    }
    if (index === 4) {
      return evaluation.fours;
    }
    if (index === 5) {
      return evaluation.fives;
    }
    if (index === 6) {
      return evaluation.sixes;
    }
    if (index === 9) {
      return evaluation.threeOfAKind;
    }
    if (index === 10) {
      return evaluation.fourOfAKind;
    }
    if (index === 11) {
      return evaluation.fullHouse;
    }
    if (index === 12) {
      return evaluation.smallStraight;
    }
    if (index === 13) {
      return evaluation.largeStraight;
    }
    if (index === 14) {
      return evaluation.chance;
    }
    if (index === 15) {
      return evaluation.yahtzee;
    }
  }

  function checkWinners() {
    if (checkCompletion(cellValues)) {
      let highestScore = 0;
      let leadingPlayer = 0;
      let countWinners = 0;
      let winners = [];

      for (let i = 0; i < numPlayers; i++) {
        if (scores[i].totalSum > highestScore) {
          highestScore = scores[i].totalSum;
          leadingPlayer = i + 1;
        }
      }
      for (let i = 0; i < numPlayers; i++) {
        if (highestScore === scores[i].totalSum) {
          countWinners++;
          winners.push(i + 1);
        }
      }
      if (countWinners === 1) {
        setWinner("Player " + leadingPlayer + " wins!");
      } else {
        let winnerString = "The winners are: ";
        for (let i = 0; i < countWinners; i++) {
          winnerString +=
            "Player " + winners[i] + (i === countWinners - 1 ? "" : ", ");
        }
        setWinner(winnerString);
      }
    }
  }

  function updateCells(scores) {
    for (let i = 0; i < cols - 1; i++) {
      console.log(i);
      setCellValues((prevValues) => ({
        ...prevValues,
        [`${1}-${i + 1}`]: scores[i].ones,
        [`${2}-${i + 1}`]: scores[i].twos,
        [`${3}-${i + 1}`]: scores[i].threes,
        [`${4}-${i + 1}`]: scores[i].fours,
        [`${5}-${i + 1}`]: scores[i].fives,
        [`${6}-${i + 1}`]: scores[i].sixes,
        [`${7}-${i + 1}`]: scores[i].sum,
        [`${8}-${i + 1}`]: scores[i].bonus,
        [`${9}-${i + 1}`]: scores[i].threeOfAKind,
        [`${10}-${i + 1}`]: scores[i].fourOfAKind,
        [`${11}-${i + 1}`]: scores[i].fullHouse,
        [`${12}-${i + 1}`]: scores[i].smallStraight,
        [`${13}-${i + 1}`]: scores[i].largeStraight,
        [`${14}-${i + 1}`]: scores[i].chance,
        [`${15}-${i + 1}`]: scores[i].yahtzee,
        [`${16}-${i + 1}`]: scores[i].totalSum,
      }));
    }
  }

  return (
    <div className="table-content">
      <table style={{ marginLeft: "2vw" }}>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} id={"row" + i}>
              {Array.from({ length: cols }).map((_, j) => {
                if (j === 0) {
                  return <td key={j}>{allSections[i]}</td>;
                } else {
                  if (i === 0) {
                    return <td key={j}>Player {j}</td>;
                  } else {
                    return (
                      <td
                        key={j}
                        onClick={() => handleClick(i, j)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "var(--primary-100)",
                          color: `${
                            cellValues[`${i}-${j}`] !== undefined
                              ? "black"
                              : j === currentTurn && evaluation !== undefined
                              ? "teal"
                              : "black"
                          }`,
                        }}
                      >
                        {cellValues[`${i}-${j}`] !== undefined
                          ? cellValues[`${i}-${j}`]
                          : j === currentTurn &&
                            evaluation !== undefined &&
                            evaluationValue(i) !== 0
                          ? evaluationValue(i)
                          : ""}{" "}
                        {/* Display cell value */}
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

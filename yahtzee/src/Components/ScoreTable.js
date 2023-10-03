import React from "react";
import './ScoreTable.css';


export default function ScoreTable({numPlayers}) {

  var rows = 17;
  var cols = numPlayers + 1;

  const colsNames = ["", ...Array.from({ length: numPlayers}).map((_,i) => `Player ${i + 1}`)];
  
  return(
      <div className="table-content">
          <table style={{marginLeft: '2vw'}}>
              <tbody>
                  {Array.from({length: rows}).map((_, i) => (
                      <tr key={i}>
                          {Array.from({ length: cols }).map((_, j) => (
                              <td key={j}>Row {i + 1} Col {j + 1}</td>
                          ))}
                      </tr>
                  ))}
              </tbody>
          </table>
   
      </div>
  )
}
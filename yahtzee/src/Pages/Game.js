import React from "react";
import { useParams } from "react-router-dom";

export default function Game() {
  
  const { numPlayers } = useParams();
  
  return (
    <div className="Game-component">
      <h1>THE GAME</h1>
      <div className="number-of-players"></div>
    </div>
  );
}

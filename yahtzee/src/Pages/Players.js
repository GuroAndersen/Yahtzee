import React, {useState} from "react";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Link } from "react-router-dom";

export default function Players() {

    const [selectedPlayers, setSelectedPlayers] = useState(null);
    const choosePlayerNumber = Array.from({length: 9}).map((_,i) => ({ label: `${i + 2} players`, value: i + 2}));
    

  return (
    <div className="Game-component">
      <div className="App-logo">
          <img
            src={"/DiceImage/die-logo.png"}
            id={"dice-logo"}
            alt={"dice-logo"}
          />
        </div>
      <h1>How many players?</h1>
      <div className="dropdown-component">
        <Dropdown value={selectedPlayers} onChange={(e) => setSelectedPlayers(e.value)} options={choosePlayerNumber} placeholder="Select number of players" className="w-full md:w-14rem"></Dropdown>
      </div>
      <div className="number-of-players"></div>
      <div className="start-button" style={{display: 'flex', justifyContent: 'center', marginTop: '3vh'}}>
        {/* Ensure that a valid number of players have been selected! */}
        <Link to={selectedPlayers ? `/game/${selectedPlayers}` : '#' }> 
        <Button className="btn" outlined style={{width: '30vh', hover: 'var(--primary-100)'}} > Start game </Button>
        </Link>
        
      </div>
    </div>
  );
}
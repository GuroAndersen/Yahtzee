import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "./Home.css";


export default function Home() {
  return (
    <div className="home-component">
      <div className="App-logo">
          <img
            src={"/DiceImage/die-logo.png"}
            id={"dice-logo"}
            alt={"dice-logo"}
          />
        </div>
      <h1>YAHTZEE</h1>
      <div className="game-buttons">
        <Link to="/players">
        <Button className="btn" outlined style={{width: '30vh', hover: 'var(--primary-100)'}} >Create game</Button>
        </Link>
        <Link to="/help">
        <Button className="btn" outlined style={{width: '30vh', hover: 'var(--primary-100)'}} >Help</Button>
        </Link>
      </div>
    </div>
  );
}

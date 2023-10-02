import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-component">
      <h1>YAHTZEE</h1>
      <div className="game-buttons">
        <Link to="/players">
          <Button className="btn">Create game</Button>
        </Link>
        <Link to="/help">
          <Button className="btn">Help</Button>
        </Link>
      </div>
    </div>
  );
}

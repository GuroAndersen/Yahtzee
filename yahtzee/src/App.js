import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Game from "./Pages/Game";
import Help from "./Pages/Help";
import Players from "./Pages/Players";
import Header from "./Components/Header";

import "primereact/resources/themes/arya-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="App-logo">
          <img
            src={"/DiceImage/die-logo.png"}
            id={"dice-logo"}
            alt={"dice-logo"}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/game/:numPlayers" element={<Game />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

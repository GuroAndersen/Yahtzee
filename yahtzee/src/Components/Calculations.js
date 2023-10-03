import React, { useContext, useState } from "react";
import axios from 'axios';
import DiceContext from './DiceContext';

export default function Calculations() {

    const [rolledDice, setRolledDice] = useState([]);
    const [numberOnHand, setNumberOnHand] = useState(0);
    const {diceValue} = useContext(DiceContext);

    function evaluateRoll(dice) {
        axios.post(`/api/Yahtzee/calculate`)
                .then(response => {
                    const evaluation = response.data;
                    setNumberOnHand(evaluation);
                })
                .catch(error => {
                    console.error("Error evaluating player hand: ", error);
                });
      }
}
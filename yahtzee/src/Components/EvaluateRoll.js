import axios from 'axios';

export default function EvaluateRoll(diceValue, callback) {
        axios.post(`/api/Yahtzee/calculate`, diceValue)
                .then(response => {
                    const evaluation = response.data;
                    callback(evaluation);
                })
                .catch(error => {
                    console.error("Error evaluating player hand: ", error);
                });
      

    
}
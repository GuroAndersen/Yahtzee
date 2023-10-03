import React from 'react';
import './DiceTable.css';
import { useParams } from "react-router-dom";
import { Button } from 'primereact/button';

export default function DiceTable() {
    
    const { numPlayers } = useParams();

    let images = ["/DiceImage/Dice-1.png", "/DiceImage/Dice-2.png", "/DiceImage/Dice-3.png", "/DiceImage/Dice-4.png", "/DiceImage/Dice-5.png"];
    let dice = document.querySelectorAll("img");

    //console.log(dice);

    function roll() {

        setTimeout(function() {
            let dieOneValue = Math.floor((Math.random()*6 + 1));
            let dieTwoValue = Math.floor((Math.random()*6 + 1));
            let dieThreeValue = Math.floor((Math.random()*6 + 1));
            let dieFourValue = Math.floor((Math.random()*6 + 1));
            let dieFiveValue = Math.floor((Math.random()*6 + 1));
        
            console.log(dieOneValue, dieTwoValue, dieThreeValue, dieFourValue, dieFiveValue);
        }, 1000);
        
    }
    
    return (
        <div className='dice-table-content'>
            <div className='dice-table-game'></div>
            <div className='dice-table-dice'>
                <img src='/DiceImage/Dice-1.png' id='die-1' alt='die-1'/>
                <img src='/DiceImage/Dice-2.png' id='die-2' alt='die-2'/>
                <img src='/DiceImage/Dice-3.png' id='die-3' alt='die-3'/>
                <img src='/DiceImage/Dice-4.png' id='die-4' alt='die-4'/>
                <img src='/DiceImage/Dice-5.png' id='die-5' alt='die-5'/>
            </div>
            
            <div className='dice-table-bottom'>
                <Button className='btn' onClick={roll}>Roll Dice</Button>
                <div className='player-name'>
                    {numPlayers}
                </div>
            </div>
            
        </div>
    )
}
'use strict';

//players variable
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//score variable
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
//dice variable
const diceEl = document.querySelector('.dice');
//button variables
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//current score variables
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

    let scores, currentScore, activePlayer, playing;

//the switchPlayer function
const switchPlayer = function () {
     //setting the active players score back to 0 when dice is equals 1
     document.querySelector(`#current--${activePlayer}`).textContent = 0;
     //switch to next player
     activePlayer = activePlayer === 0 ? 1 : 0; //tenary operator(for short if statements)
     //set current score back to zero
     currentScore = 0;
     player0El.classList.toggle('player--active');
     player1El.classList.toggle('player--active');
}

//the resetGame/initialization function
const init = function() {
    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    //scores of both players that keeps accumulating. 
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
};
init();


//Rolling the dice functionality
btnRoll.addEventListener('click', function() {

if(playing) {

    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player.
    if(dice !== 1) {
        //add dice to the current score
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
       switchPlayer();
    }
    
}
});

//holding current score functionality
btnHold.addEventListener('click', function() {
if(playing) {

    //1. add current score to score of active player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    //2. check if activePlayer's score is >= 100, then finish the game.
    if(scores[activePlayer] >= 100) {
        //finish the game
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        //3. Switch to the next player
        switchPlayer();
    }
}
});

//resetting the game functionality
btnNew.addEventListener('click', function() {
    init();
});
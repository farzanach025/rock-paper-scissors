let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*if(score === null){
score = {
wins: 0,
losses: 0,
ties: 0
};
localStorage.setItem('score', JSON.stringify(score));
}*/

let isAutoPlaying = false;
let intervalId;

/*const autoPlay = () =>{

} */

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => { // remove function and added arrow function
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-button').innerHTML = 'Stop Play'
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play-button').innerHTML = 'Auto Play'
  }
}


document.querySelector('.js-rock-button').addEventListener('click',() => {
  playGame('rock');
}); // we cant directly call playgame function to the addeventlistener, which will return a undefined value.


document.querySelector('.js-paper-button').addEventListener('click',() => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',() => {
  playGame('scissors');
});


document.querySelector('.js-reset-score-button').addEventListener('click',() => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.clear();
  updateScoreElement();
});

document.querySelector('.js-auto-play-button').addEventListener('click',() => {
  autoplay();
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie";
    } else if (computerMove === "paper") {
      result = "you lose";
    } else if (computerMove === "scissors") {
      result = "you win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "you win";
    } else if (computerMove === "paper") {
      result = "tie";
    } else if (computerMove === "scissors") {
      result = "you lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "you lose";
    } else if (computerMove === "paper") {
      result = "you win";
    } else if (computerMove === "scissors") {
      result = "tie";
    }
  }

  if (result === "you win") {
    score.wins += 1;
  } else if (result === "you lose") {
    score.losses += 1;
  } else if (result === "tie") {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-move"
  ).innerHTML = `You<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer `;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
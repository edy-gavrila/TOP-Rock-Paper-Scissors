const title1 = document.querySelector(".display h1");
const title2 = document.querySelector(".display h2");
const title3 = document.querySelector(".display h3");
const title4 = document.querySelector(".display #lastH1");
const greet = document.querySelector(".display");
const game = document.querySelector(".game");
const btns = document.querySelectorAll(".hand");
const results = document.querySelector(".results");
const resetBtn = document.querySelector(".reset");
const msg = document.getElementById("msg");

let playerScore = 0;
let computerScore = 0;
console.log(results);

function introAnimation() {
  setTimeout(() => {
    title1.style.opacity = "1";
    setTimeout(() => {
      title2.style.opacity = "1";
      setTimeout(() => {
        title3.style.opacity = "1";
        setTimeout(() => {
          title4.style.opacity = "1";
          setTimeout(() => {
            title1.style.opacity = "0";
            title2.style.opacity = "0";
            title3.style.opacity = "0";
            title4.style.opacity = "0";
            setTimeout(() => {
              game.style.opacity = "1";
            }, 2000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

//get an integer between 0 and 2
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//returns a hand for the computer to play
function computerPlay() {
  let game = ["Rock", "Paper", "Scissors"];
  return game[getRndInteger(0, 2)];
}

//plays a round between computer and player and returns a message
function playRound(playerHand, computerHand) {
  if (playerHand === computerHand) {
    playerScore++;
    computerScore++;
    return "It's a tie on " + playerHand;
  }

  if (
    (playerHand === "Rock" && computerHand === "Scissors") ||
    (playerHand === "Paper" && computerHand === "Rock") ||
    (playerHand === "Scissors" && computerHand === "Paper")
  ) {
    playerScore++;
    return "You win: " + playerHand + " beats " + computerHand + ".";
  }
  computerScore++;
  return "You lose: " + computerHand + " beats " + playerHand + ".";
}

function reset() {
  msg.innerText = "Good luck, Young Padawan!";
  msg.style.color = "white";
  computerScore = 0;
  playerScore = 0;
  results.innerText = "\u00A0"; //&nbsp;
  enableButtons();
  resetBtn.style.display = "none";
}

function disableButtons() {
  btns.forEach((btn) => {
    btn.setAttribute("disabled", "true");
    btn.classList.remove("selected");
  });
}

function enableButtons() {
  btns.forEach((btn) => {
    btn.removeAttribute("disabled");
  });
}

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    btn.classList.add("selected");

    const message = playRound(btn.getAttribute("hand"), computerPlay());
    results.innerText =
      message +
      "   Score: You - " +
      playerScore +
      " Computer - " +
      computerScore;

    if (playerScore >= 5 && playerScore !== computerScore) {
      msg.style.color = "green";
      msg.innerText = "You Win";
      disableButtons();
      resetBtn.style.display = "block";
    } else if (computerScore >= 5 && playerScore !== computerScore) {
      msg.style.color = "red";
      msg.innerText = "You Lose";
      disableButtons();
      resetBtn.style.display = "block";
    }
  });
});

resetBtn.addEventListener("click", reset);

introAnimation();

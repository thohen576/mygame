const gameArea = document.getElementById("game-area");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

let score = 0;
let lives = 3;
let basketPosition = 180;
let gameInterval;

// So that th e user can move the basket using their arrow keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && basketPosition > 0) {
    basketPosition -= 20;
  } else if (e.key === "ArrowRight" && basketPosition < 350) {
    basketPosition += 20;
  }
  basket.style.left = basketPosition + "px";
});

// Create a falling object
function createObject() {
  const object = document.createElement("div");
  object.classList.add("object");
  object.style.left = Math.random() * 370 + "px"; // Random spawn position
  gameArea.appendChild(object);

  let objectTop = 0;
  const fallInterval = setInterval(() => {
    objectTop += 5;
    object.style.top = objectTop + "px";

    // Check if object hits the basket
    if (
      objectTop >= 570 &&
      basketPosition < parseInt(object.style.left) + 30 &&
      basketPosition + 50 > parseInt(object.style.left)
    ) {
      score++;
      scoreDisplay.textContent = score;
      object.remove();
      clearInterval(fallInterval);
    }

    // Check if object falls off screen
    if (objectTop > 600) {
      lives--;
      livesDisplay.textContent = lives;
      object.remove();
      clearInterval(fallInterval);

      if (lives === 0) {
        endGame("Game Over! Try again!");
      }
    }

    // Win condition
    if (score === 10) {
      endGame("Congratulations! You won!");
    }
  }, 50);
}

// End the game
function endGame(message) {
  clearInterval(gameInterval);
  alert(message);
  location.reload(); // Reload the page to restart
}

// Start the game loop
gameInterval = setInterval(createObject, 1000);

const innerBox = document.getElementById("inner_box");
let direction = "right";
let rowSize = 20;
let columnSize = 20;
let snakeBody = [
  { r: 1, c: 1 },
  { r: 1, c: 2 },
  { r: 1, c: 3 },
  { r: 1, c: 4 },
];

let food = {};

function generateFood() {
  return {
    r: Math.floor(Math.random() * 20) + 1,
    c: Math.floor(Math.random() * 20) + 1,
  };
}
plotGrid();
food = generateFood();

function gameOver() {
  let snakeRow = snakeBody[snakeBody.length - 1].r;
  let snakeCell = snakeBody[snakeBody.length - 1].c;
  if (snakeRow > rowSize || snakeCell > columnSize) {
    alert("Game Over");
    clearInterval(snakeInterval);
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  switch (key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});

function plotGrid() {
  let gridDom = "";
  for (let r = 1; r <= rowSize; r++) {
    gridDom += `<div class='row'>`;
    for (let c = 1; c <= columnSize; c++) {
      let isSnakeBody =
        snakeBody.filter(function (el) {
          return el.r == r && el.c == c;
        }).length > 0;
      let isFood = r == food.r && c == food.c;

      gridDom += `<div id='cell_${r}_${c}' class='cell ${
        isFood ? "food" : ""
      } ${isSnakeBody ? "snake-body" : ""} '></div>`;
    }
    gridDom += `</div>`;
  }
  innerBox.innerHTML = gridDom;
}

const snakeInterval = setInterval(function () {
  let snakeRow = snakeBody[snakeBody.length - 1].r;
  let snakeCell = snakeBody[snakeBody.length - 1].c;

  if (direction === "up") {
    if (snakeRow === food.r && snakeCell === food.c) {
      food = generateFood();
      snakeBody.push({ r: (snakeRow -= 1), c: snakeCell });
    } else {
      snakeBody.push({ r: (snakeRow -= 1), c: snakeCell });
      snakeBody.shift();
    }
  } else if (direction === "down") {
    if (snakeRow === food.r && snakeCell === food.c) {
      food = generateFood();
      snakeBody.push({ r: (snakeRow += 1), c: snakeCell });
    } else {
      snakeBody.push({ r: (snakeRow += 1), c: snakeCell });
      snakeBody.shift();
    }
  } else if (direction === "left") {
    if (snakeRow === food.r && snakeCell === food.c) {
      food = generateFood();
      snakeBody.push({ r: snakeRow, c: (snakeCell -= 1) });
    } else {
      snakeBody.push({ r: snakeRow, c: (snakeCell -= 1) });
      snakeBody.shift();
    }
  } else if (direction === "right") {
    if (snakeRow === food.r && snakeCell === food.c) {
      food = generateFood();
      snakeBody.push({ r: snakeRow, c: (snakeCell += 1) });
    } else {
      snakeBody.push({ r: snakeRow, c: (snakeCell += 1) });
      snakeBody.shift();
    }
  }

  plotGrid();
  gameOver();
}, 1000);

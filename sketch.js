let source;
let gif;
let tiles = [];
let cols = 4;
let rows = 4;
let w, h;
let board = [];
let blankSpot = -1;
let flag = false;

function preload() {
  source = loadImage(
    "Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg"
  );
  //   let max = Math.min(windowWidth, windowHeight);
  //   console.log(max);

  //   gif = loadImage(
  //     "https://media0.giphy.com/media/2gtoSIzdrSMFO/200.webp?cid=ecf05e4775zqwhqr74sqchg3c3067zig8ywhlzqucxg3lbqa&rid=200.webp&ct=g"
  //   );
}

function setup() {
  //   console.log(max);
  let max = Math.min(windowWidth, windowHeight);
  max = max - 10;
  source.resize(max, 0);
  createCanvas(max, max);
  background(0);
  w = max / cols;
  h = max / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(source, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }
  tiles.pop();
  board.pop();
  board.push(-1);
  //   console.log(board);
  setTimeout(() => {
    suff(board);
    flag = true;
  }, 5000);

  //   console.log(board);
}

function swap(i, j, arr) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  moveTile(r1, r2, arr);
}

function suff(arr) {
  for (let i = 0; i < 1000; i++) {
    randomMove(arr);
  }
}

function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  moveTile(i, j, board);
}

function draw() {
  background(0);
  //   randomMove(board);
  //   image(source, 0, 0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let index = i + j * cols;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        let img = tiles[tileIndex].image;
        image(img, x, y);
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);
    }
  }
  if (isSolved()) {
    console.log("SOLVED");
    winner();
  }
}

function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) return false;
  }
  return true;
}

function winner() {
  if (flag) {
    //     image(gif, 0, 0, 400, 400);
    //     noLoop();
    let img = createImg(
      "https://media0.giphy.com/media/2gtoSIzdrSMFO/200.webp?cid=ecf05e4775zqwhqr74sqchg3c3067zig8ywhlzqucxg3lbqa&rid=200.webp&ct=g"
    );
    img.position(CENTER, CENTER);
    //     noCanvas();
    noLoop();
  }
}

function moveTile(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);
  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

function isNeighbor(i, j, x, y) {
  if (i != x && j != y) return false;
  if (abs(i - x) == 1 || abs(j - y) == 1) return true;
  return false;
}

function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}

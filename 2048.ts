import * as readline from 'readline';

type Board = number[][];

class Game2048 {
  private board: Board;
  private score: number;
  private size: number = 4;
  private gameOver: boolean;

  constructor() {
    this.board = Array(this.size).fill(0).map(() => Array(this.size).fill(0));
    this.score = 0;
    this.gameOver = false;
    this.init();
  }

  private init() {
    this.addRandomTile();
    this.addRandomTile();
  }

  private addRandomTile() {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  private draw() {
    console.clear();
    console.log("=================================");
    console.log("           2048 - TS             ");
    console.log("=================================");
    console.log(` Pontuação: ${this.score}\n`);

    const cellWidth = 6;
    const borderLine = "+" + "-".repeat(cellWidth) + "+" + "-".repeat(cellWidth) + "+" + "-".repeat(cellWidth) + "+" + "-".repeat(cellWidth) + "+";

    for (let r = 0; r < this.size; r++) {
      console.log(borderLine);
      let rowStr = "|";
      for (let c = 0; c < this.size; c++) {
        const val = this.board[r][c];
        const valStr = val === 0 ? "" : val.toString();
        const padded = valStr.padStart(Math.floor((cellWidth + valStr.length) / 2)).padEnd(cellWidth);
        rowStr += padded + "|";
      }
      console.log(rowStr);
    }
    console.log(borderLine);
    console.log("\nControles: [W/⬆️ ] Cima | [S/⬇️ ] Baixo | [A/⬅️ ] Esquerda | [D/➡️ ] Direita");
    console.log("Pressione 'Q' para sair.");

    if (this.gameOver) {
      console.log("\n*** FIM DE JOGO! Sem movimentos disponíveis. ***");
    }
  }

  private slideRow(row: number[]): { newRow: number[]; gainedScore: number } {
    let filtered = row.filter(val => val !== 0);
    let newRow: number[] = [];
    let gainedScore = 0;
    let i = 0;

    while (i < filtered.length) {
      if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
        const mergedVal = filtered[i] * 2;
        newRow.push(mergedVal);
        gainedScore += mergedVal;
        i += 2;
      } else {
        newRow.push(filtered[i]);
        i += 1;
      }
    }

    while (newRow.length < this.size) {
      newRow.push(0);
    }

    return { newRow, gainedScore };
  }

  public moveLeft(): boolean {
    let moved = false;
    for (let r = 0; r < this.size; r++) {
      const original = [...this.board[r]];
      const { newRow, gainedScore } = this.slideRow(original);
      this.board[r] = newRow;
      this.score += gainedScore;
      if (original.some((val, idx) => val !== newRow[idx])) {
        moved = true;
      }
    }
    return moved;
  }

  public rotateBoard(times: number) {
    for (let t = 0; t < times; t++) {
      let newB = Array(this.size).fill(0).map(() => Array(this.size).fill(0));
      for (let r = 0; r < this.size; r++) {
        for (let c = 0; c < this.size; c++) {
          newB[c][this.size - 1 - r] = this.board[r][c];
        }
      }
      this.board = newB;
    }
  }

  public move(direction: 'left' | 'right' | 'up' | 'down') {
    if (this.gameOver) return;

    let rotations = 0;
    if (direction === 'up') rotations = 3;
    else if (direction === 'right') rotations = 2;
    else if (direction === 'down') rotations = 1;

    this.rotateBoard(rotations);
    const moved = this.moveLeft();
    this.rotateBoard((4 - rotations) % 4);

    if (moved) {
      this.addRandomTile();
      if (!this.checkMovesAvailable()) {
        this.gameOver = true;
      }
    }
    this.draw();
  }

  private checkMovesAvailable(): boolean {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c] === 0) return true;
        if (c + 1 < this.size && this.board[r][c] === this.board[r][c + 1]) return true;
        if (r + 1 < this.size && this.board[r][c] === this.board[r + 1][c]) return true;
      }
    }
    return false;
  }

  public isGameOver(): boolean {
    return this.gameOver;
  }
}

// Configuração do input do terminal
const game = new Game2048();
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

game['draw']();

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c' || key.name === 'q') {
    console.log("\nSaindo do jogo...");
    process.exit();
  }

  if (game.isGameOver()) return;

  if (key.name === 'left' || key.name === 'a') {
    game.move('left');
  } else if (key.name === 'right' || key.name === 'd') {
    game.move('right');
  } else if (key.name === 'up' || key.name === 'w') {
    game.move('up');
  } else if (key.name === 'down' || key.name === 's') {
    game.move('down');
  }
});
// Calling html elements
const game = document.querySelector(".game");
const start = document.querySelector(".start");
const box = document.querySelector(".box");
const reset = document.querySelector(".reset");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const scoreBoard = document.querySelectorAll(".points")
const decision = document.querySelector(".decision");
const level = document.querySelector("#difficulty");
const wait = document.querySelector(".wait");
const wall = document.querySelector(".wall");
let p = "";
let turn = 0;
let empty = 0;


// Function declaration
const play = (() => {
    // Webpage reacting to Escape and Enter Keys
    const keys = () => {
        window.addEventListener("keydown", function (e) {
            if (e.key == "Escape") {
                play.reset();
                play.close();
            }
            if (e.key == "Enter") {
                play.show();
            }
        });
    };

    // Difficulty selector
    const difficulty = () => {
        reset();
        close();
        console.log(level.value);
    };

    // Show tic tac toe grid
    const show = () => {
        reset();
        game.classList.add("play");
        start.style.display = "none";
        fillStripes();
        const shell = document.querySelectorAll(".shell");
        fillshells(shell);
    };

    // Draw stripes in tic tac toe grid
    const fillStripes = () => {
        for (let i = 0; i < 9; i++) {
            box.appendChild(document.createElement("div"));
            box.childNodes[i].classList.add("shell");
        };
    }

    // Fill shell with users symbol
    const fillshells = (shell) => {
        for (let i = 0; i < shell.length; i++) {
            shell[i].addEventListener("click", function () {
                empty = noSpace(shell);
                winner(checkWinner(shell));
                if (this.innerHTML == "") {
                    this.style.color = "#545454";
                    this.innerHTML = "X";
                    turn = 1;
                    playerTurn(1);
                    wait.style.display = "block";
                    if (empty && level.value == "normal") { setTimeout(() => { botMove(shell); }, 300); }
                    else if (empty && level.value == "easy") { setTimeout(() => { easyBot(shell); }, 300); }
                };
            });
        };
    };

    // Bots turn
    const botMove = (shell) => {
        setTimeout(() => { wait.style.display = "none"; }, 500);
        empty = noSpace(shell);
        winner(checkWinner(shell));
        const bestMove = findBestMove(shell); // Get the best move using the minimax algorithm
        if (bestMove.move != -1) {
            shell[bestMove.move].style.color = "#F2EBD3";
            shell[bestMove.move].innerHTML = "O";
            if (checkWinner(shell) == false && turn == 1) { turn = 0; };
            playerTurn(turn);
            console.log(turn);
            empty = noSpace(shell);
            winner(checkWinner(shell));
        };
    };

    // Easy bot move
    const easyBot = (shell) => {
        setTimeout(() => { wait.style.display = "none"; }, 500);
        empty = noSpace(shell);
        winner(checkWinner(shell));
        for (let i = 0; i < 9; i++) {
            let n = (Math.floor(Math.random() * 8));
            if (shell[n].innerHTML == "" && !(checkWinner(shell))) {
                shell[n].style.color = "#F2EBD3";
                shell[n].innerHTML = "O";
                if (checkWinner(shell) == false && turn == 1) { turn = 0; };
                console.log(turn);
                playerTurn(turn);
                empty = noSpace(shell);
                break;
            };
        };
    };

    // Change player turn
    const playerTurn = (turn) => {
        if (turn == 0) {
            p1.style.color = "rgba(255, 255, 255, .9)";
            p2.style.color = "#14BDAC";
        }
        else if (turn == 1) {
            p1.style.color = "#14BDAC";
            p2.style.color = "rgba(255, 255, 255, .9)";
        };
    };

    const points = {
        p1: 0,
        p2: 0,
    }

    // Minimax algorithm
    const minimax = (shell, depth, maximizingPlayer) => {
        const result = checkWinner(shell);
        if (result === 'O') {
            return 1; // Bot wins
        } else if (result === 'X') {
            return -1; // Player wins
        } else if (result === 'draw' || depth >= 9) {
            return 0; // It's a draw or the maximum depth is reached
        };

        if (maximizingPlayer) {
            let bestEval = -Infinity;
            for (let i = 0; i < shell.length; i++) {
                if (shell[i].innerHTML === '') {
                    shell[i].innerHTML = 'O';
                    const eval = minimax(shell, depth + 1, false);
                    shell[i].innerHTML = '';
                    bestEval = Math.max(bestEval, eval);
                }
            }
            return bestEval;
        } else {
            let bestEval = Infinity;
            for (let i = 0; i < 9; i++) {
                if (shell[i].innerHTML === '') {
                    shell[i].innerHTML = 'X';
                    const eval = minimax(shell, depth + 1, true);
                    shell[i].innerHTML = '';
                    bestEval = Math.min(bestEval, eval);
                }
            }
            return bestEval;
        }
    };

    // Find the best move using the minimax algorithm
    const findBestMove = (shell) => {
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (shell[i].innerHTML === '') {
                shell[i].innerHTML = 'O';
                const score = minimax(shell, 0, false);
                shell[i].innerHTML = '';

                if (score >= bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return { move: bestMove, score: bestScore };
    }

    // Check for the winner
    const checkWinner = (shell) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (shell[a].innerHTML === shell[b].innerHTML && shell[a].innerHTML == shell[c].innerHTML && shell[a].innerHTML !== "") {
                return shell[a].innerHTML;
            }
        }

        let draw = true;
        for (let i = 0; i < 9; i++) {
            if (shell[i].innerHTML === "") {
                draw = false;
                break;
            }
        }
        if (draw) {
            return "draw";
        }

        return false;
    }

    // Count empty spaces in the grid
    const noSpace = (shell) => {
        let empty = 0;
        for (let i = 0; i < 9; i++) {
            if (shell[i].innerHTML === "") {
                empty++;
            }
        }
        return empty;
    }

    // Determine the winner and update score
    const winner = (result) => {
        if (result === "O") {
            points.p2++;
            scoreBoard[1].innerHTML = points.p2;
            decision.innerHTML = "Bot Wins!";
            wall.style.display = "block";
        } else if (result === "X") {
            points.p1++;
            scoreBoard[0].innerHTML = points.p1;
            decision.innerHTML = "Player Wins!";
            wall.style.display = "block";
        } else if (result === "draw") {
            decision.innerHTML = "Draw!";
            wall.style.display = "block";
        }
    };

    // Wall to stop player interaction after gaining a point or game over
    const dim = () => {
        wall.addEventListener("click", function () {
            if (points.p1 >= 3 || points.p2 >= 3) {
                reset();
                close();
                decision.innerHTML = "";
                wall.style.display = "none";
            }
            else if (points.p1 < 3 && points.p2 < 3) {
                clear();
            }
            else if (empty == 0) {
                decision.innerHTML = "";
                clear();
                empty = noSpace([]);
            };
        });
    };

    // Reset the game
    const reset = () => {
        clear();
        scoreBoard[0].innerHTML = 0;
        scoreBoard[1].innerHTML = 0;
        points.p1 = 0;
        points.p2 = 0;
        empty = 0;
    };

    // Close the grid
    const close = () => {
        game.classList.remove("play");
        start.style.display = "block";
    };

    // Clear the grid
    const clear = () => {
        if (game.childNodes[3]) {
            let box = game.childNodes[3];
            for (let i = 0; i < (box.childNodes).length; i++) { box.childNodes[i].innerHTML = ""; };
            wall.style.display = "none";
        };
        turn = 0;
        playerTurn(0);
        p = "";
        decision.innerHTML = "";
    };

    return { keys, show, reset, close, dim, difficulty };
})();



// Function calling
start.addEventListener("click", play.show);
reset.addEventListener("click", function () { play.reset(); play.close(); });
level.addEventListener("click", play.difficulty)
play.keys();
play.dim();
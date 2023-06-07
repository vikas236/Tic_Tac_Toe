// Calling html elements
const game = document.querySelector(".game");
const start = document.querySelector(".start");
const box = document.querySelector(".box");
const reset = document.querySelector(".reset");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const score = document.querySelectorAll(".points")
const decision = document.querySelector(".decision");
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
    }

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
                if (this.innerHTML == "" && !winner(checkWinner(shell))) {
                    winner(checkWinner(shell));
                    this.style.color = "#545454";
                    this.innerHTML = "X";
                    turn = 1;
                    playerTurn(1);
                    wait.style.display = "block";
                    setTimeout(() => { botMove(shell); }, 1000);
                };
            });
        };
    };

    // Bots turn
    const botMove = (shell) => {
        wait.style.display = "none";
        empty = noSpace(shell);
        winner(checkWinner(shell));
        for (let i = 0; i < shell.length; i++) {
            let n = Math.floor(Math.random() * 8);
            if (p) { break; };
            if (shell[n].innerHTML == "") {
                shell[n].style.color = "#F2EBD3";
                shell[n].innerHTML = "O";
                if (checkWinner(shell) == false && turn == 0) { playerTurn(0, shell); };
                turn = 0;
                return shell;
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

    // Winner announcing, Starting a new game
    const winner = (str) => {
        let z = 0;
        if (str == "X") { z = 1; }
        else if (str == "O") { z = 2; };
        if (str != false && (empty == 0)) {
            if (points.p1 < 3 && points.p2 < 3) {
                p = `Player ${z} has won a Point!`;
                decision.innerHTML = p;
                points[Object.keys(points)[z - 1]] = ++Object.values(points)[z - 1];
                score[z - 1].innerHTML = Object.values(points)[z - 1];
                wall.style.display = "block";
            };
            if (points.p1 >= 3) {
                p = "Player 1 is the Winner!";
                decision.innerHTML = p;
                wall.style.display = "block";
            }
            else if (points.p2 >= 3) {
                p = "Player 2 is the Winner!";
                decision.innerHTML = p;
                wall.style.display = "block";
            };
        }
        else if (empty == 1) {
            p = "Draw!"
            decision.innerHTML = p;
            wall.style.display = "block";
            empty = 0;
        }
        else {
            console.log("here");
        };
    };

    // Confirm winner
    const checkWinner = (shell) => {
        let arr = [];
        for (i = 0; i < shell.length; i++) {
            arr[i] = shell[i].innerHTML;
        };
        if (checkEqual(arr, 0, 1, 2)) { return arr[0]; }
        else if (checkEqual(arr, 2, 5, 8)) { return arr[2]; }
        else if (checkEqual(arr, 0, 3, 6)) { return arr[0]; }
        else if (checkEqual(arr, 6, 7, 8)) { return arr[6]; }
        else if (checkEqual(arr, 1, 4, 7)) { return arr[1]; }
        else if (checkEqual(arr, 3, 4, 5)) { return arr[3]; }
        else if (checkEqual(arr, 0, 4, 8)) { return arr[0]; }
        else if (checkEqual(arr, 2, 4, 6)) { return arr[2]; }
        else { return false; };
    };

    // Check if 3 values consecutively are equal for a win
    const checkEqual = (arr, a, b, c) => {
        if (arr[a] == arr[b] && arr[b] == arr[c] && arr[a] != "") {
            return true;
        }
        else { return false; };
    };

    // Wall to stop player interaction after gaining a point or game over
    const dim = () => {
        wall.addEventListener("click", function () {
            if (points.p1 >= 3 || points.p1 >= 3) {
                reset();
                close();
                decision.innerHTML = "";
                wall.style.display = "none";
            }
            else if (points.p1 < 3 && points.p2 < 3) {
                clear();
            }
            else if (empty == 1) {
                decision.innerHTML = "Draw";
                clear();
                empty = noSpace([]);
            };
        });
    };

    // Check if the grid is full
    const noSpace = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].innerHTML == "") {
                return 0;
            }
        };
        return 1;
    };

    // Reset the game
    const reset = () => {
        clear();
        score[0].innerHTML = 0;
        score[0].innerHTML = 0;
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
        empty = 0;
        decision.innerHTML = "";
    };

    return { keys, show, dim, clear, reset, close, botMove };
})();



// Function calling
start.addEventListener("click", play.show);
reset.addEventListener("click", function () { play.reset(); play.close(); });
play.keys();
play.show();
play.dim();
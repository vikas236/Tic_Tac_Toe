// Calling html elements
const game = document.querySelector(".game");
const start = document.querySelector(".start");
const box = document.querySelector(".box");
const reset = document.querySelector(".reset");
const clear = document.querySelector(".clear");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const score = document.querySelectorAll(".points")
const decision = document.querySelector(".decision");
const wall = document.querySelector(".wall");
let turn = 0;


// Function declaration
const play = (() => {
    // Webpage reacting to Escape and Enter Keys
    const keys = () => {
        window.addEventListener("keydown", function (e) {
            if (e.key == "Escape") {
                play.close();
            }
            if (e.key == "Enter") {
                play.show();
            }
        });
    }

    // Show tic tac toe grid
    const show = () => {
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
                if (this.innerHTML == "" && !winner(checkWinner(shell))) {
                    if (turn == 0) {
                        this.style.color = "#545454";
                        this.innerHTML = "X";
                        turn = 1;
                    }
                    else if (turn == 1) {
                        this.style.color = "#F2EBD3";
                        this.innerHTML = "O";
                        turn = 0;
                    };
                    winner(checkWinner(shell))
                    if (checkWinner(shell) == false) { playerTurn(turn); };
                };
            });
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
            p2.style.color = "rgba(255, 255, 255, .9)"
        };
    };

    // Winner announcing, Starting a new game
    const winner = (str) => {
        let z = "";
        if (str == "X") { z = 1; }
        else if (str == "O") { z = 2; };
        if (str != false) {
            decision.innerHTML = `Player ${z} is the Winner!`;
            wall.style.display = "block";
            score[z - 1].innerHTML = 1;
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

    // Clear the grid
    const close = () => {
        clear();
        game.classList.remove("play");
        start.style.display = "block";
    };

    // Reset the game
    const clear = () => {
        if (game.childNodes[3]) {
            let box = game.childNodes[3];
            for (let i = 0; i < (box.childNodes).length; i++) { box.childNodes[i].innerHTML = ""; };
            decision.innerHTML = "";
            wall.style.display = "none";
        };
        turn = 0;
        playerTurn(turn);
    };

    return { show, clear, keys, close };
})();



// Function calling
start.addEventListener("click", play.show);
reset.addEventListener("click", play.close);
clear.addEventListener("click", play.clear);
wall.addEventListener("click", play.clear);
play.keys();
play.show();
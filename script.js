// Calling html elements
const game = document.querySelector(".game");
const start = document.querySelector(".start");
const box = document.querySelector(".box");
const reset = document.querySelector(".reset");
const clear = document.querySelector(".clear");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");


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
        let turn = 0;
        for (let i = 0; i < shell.length; i++) {
            shell[i].addEventListener("click", function () {
                if (this.innerHTML == "" && turn == 0) {
                    this.style.color = "#545454";
                    this.innerHTML = "X";
                }
                else if (this.innerHTML == "" && turn == 1) {
                    this.style.color = "#F2EBD3";
                    this.innerHTML =  "O";
                };
                turn = playerTurn(turn);
            });
        };
    };

    const playerTurn = (turn) => {
        if (turn == 0) { return 1; }
        else { return 0; };
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
        };
    };

    return { show, clear, keys, close };
})();



// Function calling
start.addEventListener("click", play.show);
reset.addEventListener("click", play.close);
clear.addEventListener("click", play.clear);
play.keys();
play.show();
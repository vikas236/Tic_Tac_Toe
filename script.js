// Calling html elements
const game = document.querySelector(".game");
const start = document.querySelector(".start");
const box = document.querySelector(".box");


// Function declaration
const play = (() => {
    window.addEventListener("keydown", function (e) {
        if (e.key == "Escape") {
            play.clear();
        }
        if (e.key == "Enter") {
            play.show();
        }
    });
    const show = () => {
        game.classList.add("play");
        start.style.display = "none";
        fillStripes();
        const shell = document.querySelectorAll(".shell");
        fillshells(shell);
    };
    const fillStripes = () => {
        for (let i = 0; i < 9; i++) {
            box.appendChild(document.createElement("div"));
            box.childNodes[i].classList.add("shell");
        };
    }
    const fillshells = (shell) => {
        for (let i = 0; i < shell.length; i++) {
            shell[i].addEventListener("click", function () {
                this.innerHTML = "O";
                console.log(this.style);
            });
        };
    };
    const clear = () => {
        game.classList.remove("play");
        start.style.display = "block";
    };

    return { show, clear };
})();



// Function calling
start.addEventListener("click", play.show);
play.show();
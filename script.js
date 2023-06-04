// Calling html elements
const game = document.querySelector(".game");
const start = document.querySelector(".play");


// Function declaration
const play = (() => {
    const show = () => {
        game.classList.remove("play");
        fillBox();
    };
    const fillBox = () => {
        game.innerHTML = "";
        for (i = 0; i < 9; i++) {
            game.appendChild(document.createElement("div"));
            game.childNodes[i].classList.add("box");
        };
    }
    const clear = () => {
        game.classList.add("play");
        game.innerHTML = "<h1>PLAY</h1>";
    };

    return { show, clear };
})();


// Function calling
start.addEventListener("click", play.show);
window.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        play.clear();
    }
    if (e.key == "Enter") {
        play.show();
    }
});
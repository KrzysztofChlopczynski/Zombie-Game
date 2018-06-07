function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", function() {
  const coursor = document.createElement("div");
  var score = 0; // Główny wynik gry
  const board = document.querySelector(".board");

  coursor.classList.add("coursor");
  board.appendChild(coursor);

  const scoreEl = document.createElement('div');
  scoreEl.classList.add('score');
  board.appendChild(scoreEl);
  scoreEl.innerHTML = score;

  setInterval(function() {
    const zombie = document.createElement("div");
    zombie.classList.add("zombie");

    const postBottom = randomBetween(10, 170);
    zombie.style.bottom = postBottom + "px";

    const time = randomBetween(8, 15);
    (zombie.style.animationDuration = "0,5s"), +time + "s";

    const zIndex = 170 - postBottom;
    zombie.style.zIndex = zIndex;

    var scale = 0.8 + Math.random() / 4;

    if (postBottom <= 40) {
      scale += 0.2;
    } else if (postBottom > 40 && postBottom <= 80) {
    } else if (postBottom > 80 && postBottom <= 120) {
      scale -= 0.2;
      zombie.style.filter = "blur(1px) brigthness(.95)";
    } else {
      scale -= 0.3;
      zombie.style.filter = "blur(2px) brigthness(.8)";
    }

    zombie.style.transform = "scale(" + scale + ")";

    zombie.addEventListener("animationend", function(e) {
      if (e.animationName === "zombieMove") {
        this.remove();
      }
    });

    zombie.addEventListener("click", function() {
      this.live--;
      if (this.live < 1) {
        this.remove();
        score++;
        scoreEl.innerHTML = score;
      } else {
        this.querySelector("span").style.width = this.live * 20 + "px";
      }
    });

    zombie.live = 3;
    var span = document.createElement("span");
    zombie.appendChild(span);

    board.appendChild(zombie);
  }, 800);

  board.addEventListener("mousemove", function(e) {
    coursor.style.left = e.pageX - 68 + "px";
    coursor.style.top = e.pageY - 68 + "px";
  });
});

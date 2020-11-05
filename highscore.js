let highScore = document.querySelector("#highScore");
let clear = document.querySelector("#clear");
let goBack = document.querySelector("#goBack");

let allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
  for (let i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].initials + " " + allScores[i].score;
    highScore.appendChild(createLi);
  }
}

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

goBack.addEventListener("click", function () {
  window.location.replace("index.html");
});

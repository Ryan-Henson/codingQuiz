let questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log",
  },
];

let score = 0;
let questionIndex = 0;
let seconds = 76;
let timeDelay = 0;
let penalty = 10;

let currentTime = document.querySelector("#currentTime");
let timer = document.querySelector("#startTime");
let questionsDiv = document.querySelector("#questionsDiv");
let wrapper = document.querySelector("#wrapper");
let ulCreate = document.createElement("ul");

function render(questionIndex) {
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    let userQuestion = questions[questionIndex].question;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
  }

  userChoices.forEach(function (newItem) {
    let listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}

function compare(event) {
  let element = event.target;

  if (element.matches("li")) {
    let createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");

    if (element.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent =
        "Correct! The answer is:  " + questions[questionIndex].answer;
    } else {
      seconds = seconds - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }
  }

  questionIndex++;

  if (questionIndex >= questions.length) {
    allDone();
    createDiv.textContent =
      "End of quiz!" +
      " " +
      "You got  " +
      score +
      "/" +
      questions.length +
      " Correct!";
  } else {
    render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);
}

function allDone() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  let createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";

  questionsDiv.appendChild(createH1);

  let createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  if (seconds >= 0) {
    let timeRemaining = seconds;
    let createP2 = document.createElement("p");
    clearInterval(timeDelay);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionsDiv.appendChild(createP2);
  }

  let createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  let createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  let createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);

  createSubmit.addEventListener("click", function () {
    let initials = createInput.value;

    if (initials === null) {
      console.log("No value entered!");
    } else {
      let finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      let allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      let newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);

      window.location.replace("highscore.html");
    }
  });
}

timer.addEventListener("click", function () {
  if (timeDelay === 0) {
    timeDelay = setInterval(function () {
      seconds--;
      currentTime.textContent = "Time: " + seconds;

      if (seconds <= 0) {
        clearInterval(timeDelay);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

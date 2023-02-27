let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-btn");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startBtn = document.getElementById("start-btn");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;



//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["js", "script", "scripting", "javascript"],
        correct: "script"
    },
    {
        id: "1",
        question: "How to write an IF statement in JavaScript?",
        options: ["if(i==5)", "if i = 5 then", "if i=5", "if i == 5 then"],
        correct: "if(i==5)"
    },
    {
        id: "2",
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        options: ["if i <> 5", "if(i <> 5)", "if i =! 5 then", "if(i != 5)"],
        correct: "if(i != 5)"
    }
];
//Restart quiz
restart.addEventListener("click", ()=> {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
      //increment questionCount
      questionCount += 1;
      //if last question
      if (questionCount == quizArray.length) {
        //hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        //user score
        userScore.innerHTML =
          "Your score is " + scoreCount + " out of " + questionCount;
      } else {
        //display questionCount
        countOfQuestion.innerHTML =
          questionCount + 1 + " of " + quizArray.length + " Question";
        //display quiz
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
      }
    })
  );
  


//Timer
const timerDisplay = () => {
    countdown = setInterval(()=> {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if(count == 0){
            clearInterval(countdown);
            displayNext();
        }
    },1000);
}

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
}



//Quiz Creation
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid",
        "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question ";
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]} </button>
        <button class="option-div" onclick="checker(this)">${i.options[2]} </button>
        <button class="option-div" onclick="checker(this)">${i.options[3]} </button>
        `;
        quizContainer.appendChild(div);

    }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
      document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
      userOption.classList.add("correct");
      scoreCount++;
    } else {
      userOption.classList.add("incorrect");
      //For marking the correct option
      options.forEach((element) => {
        if (element.innerText == quizArray[questionCount].correct) {
          element.classList.add("correct");
        }
      });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
      element.disabled = true;
    });
  }




//initial setup
function initial(){
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count=11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);

}
//when user click on start btn
startBtn.addEventListener("click", ()=> {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
})


//hide quiz and display start screen

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
}


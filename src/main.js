//
const allTests =[]
const problemUrl = 'https://upyourskill.herokuapp.com/problems';
const tests = 'https://upyourskill.herokuapp.com/tests';
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];



//
function init(){
return fetch(tests)
  .then(res => res.json())
  .then(tests => showTests(tests))
}

init()



  function renderTest(test) {
    const testBox = document.querySelector("ul")
    const listedTests = document.createElement("li")
    listedTests.className = "name"
    listedTests.dataset.id = test.id
    listedTests.innerHTML = `<span>${test.name}</span>`
    listedTests.addEventListener('click', e =>{
      fetch(`https://upyourskill.herokuapp.com/tests/${test.id}/problems`)
      .then(res => {
        return res.json();
      })
      .then(loadedQuestions => {
      questions = loadedQuestions;
      startTest();
      })
        .catch(err => {
        console.error(err);
        });
    })
    testBox.append(listedTests)
  }


function showTests(tests) {
    tests.forEach((test) => renderTest(test))
}

function showProfessions(professions) {
    professions.forEach(profession => proContainer(profession))
}



//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startTest = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

// cycle through questions
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //action after questions are completed
    if(!alert('Thank you for tyring out my app! More features coming soon!')){window.location.reload();
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//check if question is right or wrong
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

//finish assessment



//dev questions
function devTest(){
return fetch(`https://upyourskill.herokuapp.com/tests/${test.id}/problems`)
.then(res => {
 return res.json();
})
.then(loadedQuestions => {
 questions = loadedQuestions;
 startTest();
})
.catch(err => {
 console.error(err);
});
}
}

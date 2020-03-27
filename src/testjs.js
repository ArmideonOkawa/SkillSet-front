const main = document.querySelector(".main")

function init(){
    return fetch(`https://upyourskill.herokuapp.com/tests`)
      .then(res => res.json())
      .then(tests => showTests(tests))
    }
    
    init()

function showTests(tests) {
    tests.forEach((test) => renderTest(test))
}

function renderTest(test) {
    const testBox = document.querySelector("ul")
    const listedTests = document.createElement("li")
    listedTests.className = "name"
    listedTests.dataset.id = test.id
    listedTests.innerHTML = `<span>${test.name}</span>`
    listedTests.addEventListener('click', e =>{
      fetch(`https://upyourskill.herokuapp.com/tests/${test.id}/problems`)
      .then(res => res.json())
      .then(testItem => console.log(testItem))

      fetch('https://upyourskill.herokuapp.com/problems')
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

  startTest = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
  };
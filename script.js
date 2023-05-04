const questionScreen = document.getElementById("question");
const scoreBoardScreen = document.getElementById("scoreBoard");
const homeScreen = document.getElementById("homeScreen");
const feedbackComponent = questionScreen.getElementsByClassName("feedback")[0];
const feedbackLabel = questionScreen.getElementsByClassName("feedback-label")[0];
const startQuizBtn = document.getElementById("btn");
const restartQuiz = document.getElementById("restart-quiz");
const backToHomeScreen = document.getElementById("home-screen");
const questionLabel = questionScreen.getElementsByClassName("question-label")[0];
const correctAnswersLabel = scoreBoardScreen.getElementsByClassName("correct-answers")[0];
const totalQuestionsLabel = scoreBoardScreen.getElementsByClassName("total-questions")[0];
const optionsBox = questionScreen.getElementsByClassName("options")[0];

const questions = [
  {
    question: "Question 1",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 1,
  },
  {
    question: "Question 2",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 3,
  },
  {
    question: "Question 3 ",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 2,
  },
  {
    question: "Question 4",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 4,
  },
  {
    question: "Question 5",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 1,
  },
  {
    question: "Question 6 ",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 3,
  },
  {
    question: "Question 7 ",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 2,
  },
  {
    question: "Question 8",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 3,
  },
  {
    question: "Question 9",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 4,
  },
  {
    question: "Question 10 ",
    options: ["options 1", "options 2", "options 3", "options 4"],
    answer: 4,
  }
];

let userAnswers = [];

function generateQuestion(i, prevAnswerIsCorrect = null){

  const question = questions[i].question;
  const options = questions[i].options;
  const answer = questions[i].answer;
  
  optionsBox.innerHTML = "";
  feedbackComponent.style.display = "none";
  questionLabel.textContent = question;
  
  // show feedback for the previous question
  if(prevAnswerIsCorrect !== null)
  {
    feedbackComponent.style.display = "block";

    if(prevAnswerIsCorrect == true){
      feedbackLabel.textContent = "Correct!"
    }
    else{
      feedbackLabel.textContent = "Wrong!"
    }
  }

  for(let o = 0; o < options.length; o++)
  {
    let btn = document.createElement("button");
    btn.setAttribute("data-option", o+1);

    btn.addEventListener("click", function()
    {
      const chosenOption = parseInt(this.getAttribute("data-option"));
      let prevAnswerIsCorrect = answer == chosenOption;
      userAnswers.push(prevAnswerIsCorrect);

      // if this is not the last question
      if(i+1 < questions.length){
        generateQuestion(i+1, prevAnswerIsCorrect);
      }
      else{
        scoreBoard();
      }
    })

    btn.textContent = options[o];
    optionsBox.appendChild(btn);
  }
}

function scoreBoard(){
  scoreBoardScreen.style.display = "block";
  homeScreen.style.display ="none";
  questionScreen.style.display ="none";

  let corerctAnswers = 0;
  for(let i = 0; i < userAnswers.length; i++){
    if(userAnswers[i] == true){
      corerctAnswers++;
    }
  }

  correctAnswersLabel.textContent = corerctAnswers;
  totalQuestionsLabel.textContent = userAnswers.length;
}

function init(){
  homeScreen.style.display ="none";
  scoreBoardScreen.style.display ="none";
  questionScreen.style.display ="block";
  userAnswers = [];
  generateQuestion(0);
}

function homeScreenInit(){
  homeScreen.style.display ="block";
  scoreBoardScreen.style.display ="none";
  questionScreen.style.display ="none";
}

// initializing the quiz
startQuizBtn.addEventListener("click", function(){
  init()
})
// initializing the quiz
restartQuiz.addEventListener("click", function(){
  init()
})
// initializing the quiz
backToHomeScreen.addEventListener("click", function(){
  homeScreenInit()
})


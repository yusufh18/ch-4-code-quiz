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
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    answer: 1,
  },
  {
    question: "What does CSS stand for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
    answer: 3,
  },
  {
    question: "What does JS stand for?",
    options:  ["JavaServer", "JavaSockets", "JavaScript"],
    answer: 2,
  },
  {
    question: "What  is a function?",
    options:  [" a statement that perfoms a task or calculates a value", " a  condtion"," a type of web api"],
    answer: 4,
  },
  {
    question: "what does var stand for",
    options: ['vader','vacant','var'],
    answer: 1,
  },
  {
    question: "what does a event listener do",
    options: ['it appends the element into the html','it creatse a new element','it deletes an element',' is a method in JavaScript that allows you to attach an event handler function to an HTML element, which means you can specify a function to run when a certain event occurs on that element.'],
    answer: 3,
  },
  {
    question: "what does prevent default do",
    options: ['adds a defualt sa element', ' creates an element in the body','prevent default behaviors in  an element', 'it erases a default behavior'],
    answer: 2,
  },
  {
    question: "what are web Apis",
    options: ['hig level programing language simlair to javascript','query selectors','web devolper tool', ' high-level scripting language built into browsers that allows you to implement functionality on web pages/apps',],
    answer: 3,
  },
  {
    question: "what are variables used for",
    options: ['to store element into as var','to create into a var', 'to break elements','to erase elements'],
    answer: 4,
  },
  {
    question: " whhat is the confrim() method",
    options: :['the confrim method prompts a message on the user screen','the confirm method displays a dialog box with a message, an OK button, and a Cancel button.', ' it logs a message to the console','it alerts the user if a condtion isnt meet'],
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


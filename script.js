const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "Which programming language is used for web development?",
      answers: [
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true },
        { text: "C++", correct: false },
        { text: "Java", correct: false },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Mars", correct: true },
        { text: "Venus", correct: false },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false },
      ],
    },
  ];
  
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const scoreDisplay = document.getElementById("score");
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) button.dataset.correct = true;
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(selectedButton, correct);
    Array.from(answerButtons.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
      button.disabled = true;
    });
    if (correct) {
      score++;
      scoreDisplay.textContent = score;
    }
    if (currentQuestionIndex < questions.length - 1) {
      nextButton.style.display = "block";
    } else {
      nextButton.textContent = "Restart";
      nextButton.style.display = "block";
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  
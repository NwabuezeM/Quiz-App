const questions = [
    {
      question: "What is your name?",
      options: ["Orede Chigozie", "Orede Bethel", "Bethel Chigozie"],
      answer: "Orede Chigozie"
    },
    {
      question: "What is the capital city of France?",
      options: ["London", "Paris", "Rome"],
      answer: "Paris"
    },
    {
      question: "What is the largest animal on Earth?",
      options: ["Elephant", "Whale", "Giraffe"],
      answer: "Whale"
    },
    {
      question: "What is the smallest planet in our solar system?",
      options: ["Mercury", "Mars", "Venus"],
      answer: "Mercury"
    },
    {
      question: "What is the largest country in the world by landmass?",
      options: ["Russia", "Canada", "China"],
      answer: "Russia"
    },
    {
      question: "What is the smallest continent in the world?",
      options: ["Asia", "Australia", "Africa"],
      answer: "Australia"
    },
    {
      question: "What is the highest mountain in the world?",
      options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
      answer: "Mount Everest"
    },
    {
      question: "What is the largest ocean in the world?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean"
    },
    {
      question: "What is the most populous country in the world?",
      options: ["China", "India", "United States"],
      answer: "China"
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Maldives", "Vatican City"],
      answer: "Vatican City"
    },
    {
      question: "What is the name of the longest river in the world?",
      options: ["Nile", "Amazon", "Yangtze"],
      answer: "Nile"
    },
    {
      question: "What is the name of the largest desert in the world?",
      options: ["Sahara", "Gobi", "Arabian"],
      answer: "Sahara"
    },
    {
      question: "What is the name of the largest waterfall in the world?",
      options: ["Angel Falls", "Niagara Falls", "Victoria Falls"],
      answer: "Victoria Falls"
    },
    {
      question: "What is the name of the largest lake in the world?",
      options: ["Lake Superior", "Caspian Sea", "Lake Victoria"],
      answer: "Caspian Sea"
    },
    {
      question: "What is the name of the tallest animal in the world?",
      options: ["Elephant", "Giraffe", "Horse"],
      answer: "Giraffe"
    },
    {
      question: "What is the name of the fastest land animal in the world?",
      options: ["Cheetah", "Lion", "Leopard"],
      answer: "Cheetah"
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 600;
  
  const quizContainer = document.getElementById("quiz-container");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const submitButton = document.getElementById("submit-button");
  const questionNumber = document.getElementById("question-number");
  const timer = document.getElementById("timer");
  
  function displayQuestion(questionIndex) {
    const question = questions[questionIndex];
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = `
      <h2>${question.question}</h2>
      <div class="options">
        ${question.options.map(option => `
          <label>
            <input type="radio" name="answer" value="${option}">
            ${option}
          </label>
        `).join('')}
      </div>
    `;
    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionElement);
    questionNumber.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
      if (selectedOption.value === questions[currentQuestion].answer) {
        score++;
      }
    }
  }
  
  function startQuiz() {
    displayQuestion(currentQuestion);
    const countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown);
        endQuiz();
      } else {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.innerText = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;
      }
    }, 1000);
  }
  
  function endQuiz() {
    // Display the confirmation alert
    const confirmed = confirm("Are you sure you want to submit the quiz?");
  
    // If the user confirms, display the final score
    if (confirmed) {
      quizContainer.innerHTML = `
        <h2>Quiz completed!</h2>
        <p>You answered ${score} out of ${questions.length} questions correctly.</p>
      `;
      prevButton.style.display = "none";
      nextButton.style.display = "none";
      submitButton.style.display = "none";
      timer.style.display = "none";
    }
  }
  
  prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      displayQuestion(currentQuestion);
    }
  });
  
  nextButton.addEventListener("click", checkAnswer);
  nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion(currentQuestion);
    } else {
      endQuiz();
    }
  });
  
  submitButton.addEventListener("click", endQuiz);
  
  startQuiz();

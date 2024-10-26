const quizData = [
    {
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "Java Standard Extension", "JavaScript Extra", "JSON Extended"],
        answer: "JavaScript XML"
    },
    {
        question: "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useContext", "useState", "useReducer"],
        answer: "useState"
    },
    {
        question: "What is the purpose of the key prop when mapping arrays in React?",
        options: ["To store user data", "To give each element a unique identity", "To manage component styles", "To define component lifecycle"],
        answer: "To give each element a unique identity"
    },
    {
        question: "Which of the following prevents a component from re-rendering when its props haven't changed?",
        options: ["useEffect", "useRef", "React.memo", "useState"],
        answer: "React.memo"
    },
    {
        question: "What does the {children} prop allow you to do?",
        options: ["Pass data to the parent component", "Render nested content within a component", "Create a new component", "Manage component state"],
        answer: "Render nested content within a component"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const submitBtn = document.getElementById('submit-btn');
const retryBtn = document.getElementById('retry-btn');

function loadQuiz() {
    const currentQuizData = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <ul class="options">
            ${currentQuizData.options.map((option, index) => `
                <li>
                    <input type="radio" name="answer" id="option${index}" value="${option}">
                    <label for="option${index}">${option}</label>
                </li>
            `).join('')}
        </ul>
    `;
}

function calculateScore() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        if (selectedOption.value === quizData[currentQuestionIndex].answer) {
            score++;
        }
    }
}

function showResult() {
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    resultContainer.classList.remove('hidden');
    submitBtn.classList.add('hidden');
    retryBtn.classList.remove('hidden');
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    retryBtn.classList.add('hidden');
    loadQuiz();
}

loadQuiz();

submitBtn.addEventListener('click', () => {
    calculateScore();
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

retryBtn.addEventListener('click', resetQuiz);
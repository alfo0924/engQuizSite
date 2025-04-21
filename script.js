// 測驗問題資料
const quizQuestions = [
    {
        question: "Customer reviews indicate that many modern mobile devices are often unnecessarily _______.",
        options: [
            "complication",
            "complicates",
            "complicate",
            "complicated"
        ],
        correctAnswer: 3,
        explanation: "需要一個形容詞來修飾'devices'，'complicated'是正確的形容詞形式。",
        grammarPoint: "形容詞用法",
        difficulty: "中級"
    },
    {
        question: "Jamal Nawzad has received top performance reviews _______ he joined the sales department two years ago.",
        options: [
            "despite",
            "except",
            "since",
            "during"
        ],
        correctAnswer: 2,
        explanation: "'since'表示「自從...以來」，正確表達了時間關係。",
        grammarPoint: "連接詞用法",
        difficulty: "初級"
    },
    {
        question: "Gyeon Corporation's continuing education policy states that _______ learning new skills enhances creativity and focus.",
        options: [
            "regular",
            "regularity",
            "regulate",
            "regularly"
        ],
        correctAnswer: 3,
        explanation: "需要一個副詞來修飾動詞'learning'，'regularly'是正確的副詞形式。",
        grammarPoint: "副詞用法",
        difficulty: "中級"
    },
    {
        question: "Among _______ recognized at the company awards ceremony were senior business analyst Natalie Obi and sales associate Peter Comeau.",
        options: [
            "who",
            "whose",
            "they",
            "those"
        ],
        correctAnswer: 3,
        explanation: "'those'是正確的代名詞，用來指代「那些人」。",
        grammarPoint: "代名詞用法",
        difficulty: "高級"
    },
    {
        question: "All clothing sold in Develyn's Boutique is made from natural materials and contains no _______ dyes.",
        options: [
            "immediate",
            "synthetic",
            "reasonable",
            "assumed"
        ],
        correctAnswer: 1,
        explanation: "'synthetic'（合成的）是正確的形容詞，與'natural materials'形成對比。",
        grammarPoint: "形容詞選擇",
        difficulty: "中級"
    },
    {
        question: "The marketing team _______ the new advertising campaign next month.",
        options: [
            "launches",
            "will launch",
            "launching",
            "has launched"
        ],
        correctAnswer: 1,
        explanation: "'will launch'表示未來時態，正確表達將來的行動。",
        grammarPoint: "時態",
        difficulty: "初級"
    },
    {
        question: "If the project _______ on schedule, we would have met the client's deadline.",
        options: [
            "was completed",
            "has been completed",
            "had been completed",
            "would complete"
        ],
        correctAnswer: 2,
        explanation: "這是一個虛擬條件句（過去虛擬），需要使用'had been completed'。",
        grammarPoint: "虛擬條件句",
        difficulty: "高級"
    },
    {
        question: "The report _______ by the research team was presented at the conference.",
        options: [
            "preparing",
            "prepared",
            "prepares",
            "to prepare"
        ],
        correctAnswer: 1,
        explanation: "需要一個過去分詞作為被動語態，'prepared'是正確的形式。",
        grammarPoint: "分詞用法",
        difficulty: "中級"
    },
    {
        question: "Neither the CEO nor the board members _______ with the proposed changes.",
        options: [
            "agrees",
            "agree",
            "agreeing",
            "to agree"
        ],
        correctAnswer: 1,
        explanation: "當主語由'neither...nor...'連接時，動詞應與較接近的主語一致，這裡是'board members'，所以用複數形式'agree'。",
        grammarPoint: "主謂一致",
        difficulty: "高級"
    },
    {
        question: "The company is looking for candidates _______ can speak at least two languages fluently.",
        options: [
            "which",
            "who",
            "whose",
            "whom"
        ],
        correctAnswer: 1,
        explanation: "當關係代名詞指人時，應使用'who'。",
        grammarPoint: "關係代名詞",
        difficulty: "中級"
    }
];

// 全局變數
let currentQuestion = 0;
let userAnswers = Array(quizQuestions.length).fill(null);
let quizStarted = false;

// DOM元素
const introSection = document.getElementById('intro-section');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const retryBtn = document.getElementById('retry-btn');
const questionContainer = document.getElementById('question-container');
const questionNumber = document.getElementById('question-number');
const progressIndicator = document.getElementById('progress-indicator');
const scoreDisplay = document.getElementById('score-display');
const gaugeFill = document.getElementById('gauge-fill');
const skillAnalysis = document.getElementById('skill-analysis');
const questionResults = document.getElementById('detailed-results');

// 初始化測驗
function initQuiz() {
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', goToPreviousQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    retryBtn.addEventListener('click', resetQuiz);
}

// 開始測驗
function startQuiz() {
    quizStarted = true;
    introSection.classList.remove('active');
    introSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    quizSection.classList.add('active');
    loadQuestion(currentQuestion);
}

// 載入問題
function loadQuestion(index) {
    const question = quizQuestions[index];
    questionContainer.innerHTML = `
        <div class="question">
            <h3>${index + 1}. ${question.question}</h3>
            <ul class="options">
                ${question.options.map((option, i) => `
                    <li class="option ${userAnswers[index] === i ? 'selected' : ''}" data-index="${i}">
                        ${String.fromCharCode(65 + i)}. ${option}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    // 更新問題編號和進度條
    questionNumber.textContent = `問題 ${index + 1} / ${quizQuestions.length}`;
    progressIndicator.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;

    // 更新導航按鈕狀態
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === quizQuestions.length - 1;

    // 顯示或隱藏提交按鈕
    if (index === quizQuestions.length - 1) {
        submitBtn.classList.remove('hidden');
    } else {
        submitBtn.classList.add('hidden');
    }

    // 添加選項點擊事件
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            selectOption(option);
        });
    });
}

// 選擇選項
function selectOption(selectedOption) {
    const optionIndex = parseInt(selectedOption.dataset.index);
    userAnswers[currentQuestion] = optionIndex;

    // 更新選項樣式
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
}

// 前往上一題
function goToPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

// 前往下一題
function goToNextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

// 提交測驗
function submitQuiz() {
    // 檢查是否所有問題都已回答
    const unansweredQuestions = userAnswers.findIndex(answer => answer === null);

    if (unansweredQuestions !== -1) {
        if (!confirm(`您還有未回答的問題。確定要提交嗎？`)) {
            return;
        }
    }

    // 計算分數
    const score = calculateScore();

    // 顯示結果頁面
    quizSection.classList.remove('active');
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('active');

    // 顯示分數
    scoreDisplay.textContent = `${score} / ${quizQuestions.length} 正確`;
    gaugeFill.style.width = `${(score / quizQuestions.length) * 100}%`;

    // 分析技能
    analyzeSkills();

    // 顯示詳細結果
    showDetailedResults();
}

// 計算分數
function calculateScore() {
    return userAnswers.reduce((score, answer, index) => {
        return answer === quizQuestions[index].correctAnswer ? score + 1 : score;
    }, 0);
}

// 分析技能
function analyzeSkills() {
    // 按文法點分類問題
    const grammarPoints = {};

    quizQuestions.forEach((question, index) => {
        const point = question.grammarPoint;
        if (!grammarPoints[point]) {
            grammarPoints[point] = {
                total: 0,
                correct: 0
            };
        }

        grammarPoints[point].total++;
        if (userAnswers[index] === question.correctAnswer) {
            grammarPoints[point].correct++;
        }
    });

    // 生成技能分析HTML
    let analysisHTML = '';

    for (const point in grammarPoints) {
        const { total, correct } = grammarPoints[point];
        const percentage = (correct / total) * 100;

        analysisHTML += `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${point}</span>
                    <span>${correct}/${total}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-level" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }

    skillAnalysis.innerHTML = analysisHTML;
}

// 顯示詳細結果
function showDetailedResults() {
    let resultsHTML = '';

    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        resultsHTML += `
            <div class="result-item">
                <div class="result-header">
                    <h4>問題 ${index + 1}</h4>
                    <span class="result-status ${isCorrect ? 'status-correct' : 'status-incorrect'}">
                        ${isCorrect ? '正確' : '錯誤'}
                    </span>
                </div>
                <p>${question.question}</p>
                <ul class="options">
                    ${question.options.map((option, i) => `
                        <li class="option ${i === question.correctAnswer ? 'correct' : ''} ${i === userAnswer && i !== question.correctAnswer ? 'incorrect' : ''}">
                            ${String.fromCharCode(65 + i)}. ${option}
                            ${i === question.correctAnswer ? ' ✓' : ''}
                            ${i === userAnswer && i !== question.correctAnswer ? ' ✗' : ''}
                        </li>
                    `).join('')}
                </ul>
                <div class="explanation">
                    <p><strong>解釋：</strong> ${question.explanation}</p>
                    <p><strong>文法點：</strong> ${question.grammarPoint} (${question.difficulty})</p>
                    <p class="correct-answer"><strong>正確答案：</strong> ${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}</p>
                </div>
            </div>
        `;
    });

    questionResults.innerHTML = resultsHTML;
}

// 重置測驗
function resetQuiz() {
    currentQuestion = 0;
    userAnswers = Array(quizQuestions.length).fill(null);

    resultsSection.classList.remove('active');
    resultsSection.classList.add('hidden');
    introSection.classList.remove('hidden');
    introSection.classList.add('active');
}

// 頁面載入時初始化測驗
document.addEventListener('DOMContentLoaded', initQuiz);

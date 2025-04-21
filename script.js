document.addEventListener('DOMContentLoaded', function() {
    // 測驗題目
    const quizQuestions = [
        {
            question: "Mr. Yang's trip will _____ him away from the office for ten days.",
            options: ["withdraw", "continue", "retain", "keep"],
            correctAnswer: 3,
            explanation: "正確答案是 'keep'。這個句子需要一個動詞來表示「使某人遠離某地」，keep away from 是正確的搭配。",
            errorType: "動詞片語搭配"
        },
        {
            question: "The company that Marie DuBois started now sells _____ products throughout the world.",
            options: ["its", "it", "theirs", "them"],
            correctAnswer: 0,
            explanation: "正確答案是 'its'。公司是單數，需要使用所有格代名詞 'its' 來表示公司的產品。",
            errorType: "所有格代名詞使用"
        },
        {
            question: "If your shipment is not delivered _____ Tuesday, you can request a full refund for the merchandise.",
            options: ["at", "by", "within", "while"],
            correctAnswer: 1,
            explanation: "正確答案是 'by'。'by' 表示「在...之前」，適合用於截止日期的表達。",
            errorType: "介系詞使用"
        },
        {
            question: "The hotel breakfast _____ fresh fruit juice and a choice of pastries.",
            options: ["includes", "to include", "including", "was included"],
            correctAnswer: 0,
            explanation: "正確答案是 'includes'。句子需要一個現在式動詞，而 'includes' 是正確的形式。",
            errorType: "動詞時態"
        },
        {
            question: "We regret to announce the _____ of the training session scheduled for April 21.",
            options: ["denial", "incapability", "postponement", "dismissal"],
            correctAnswer: 2,
            explanation: "正確答案是 'postponement'。根據上下文，這裡需要表達「延期」的意思，'postponement' 是最合適的選擇。",
            errorType: "詞彙選擇"
        },
        {
            question: "The pamphlet contains some _____ information about the current exhibit.",
            options: ["importance", "important", "importantly", "importanting"],
            correctAnswer: 1,
            explanation: "正確答案是 'important'。'information' 是名詞，前面需要用形容詞 'important' 來修飾，而不是名詞 'importance'。",
            errorType: "形容詞使用"
        },
        {
            question: "No matter how long it _____ to finish the annual report, it must be done properly.",
            options: ["taking", "takes", "to take", "taken"],
            correctAnswer: 1,
            explanation: "正確答案是 'takes'。這裡需要一個現在式動詞，主詞是 'it'，所以使用第三人稱單數形式 'takes'。",
            errorType: "動詞形式"
        },
        {
            question: "The popularity of jogging appears to have decreased _____ the past couple of years.",
            options: ["since", "for", "during", "while"],
            correctAnswer: 0,
            explanation: "正確答案是 'since'。表示「從...以來」的時間關係，'since' 是正確的介系詞。",
            errorType: "介系詞使用"
        },
        {
            question: "At the hotel, laundry sent out by 10:00 a.m. _____ be returned by 5:00 p.m. the same day.",
            options: ["it will", "will", "it", "they will"],
            correctAnswer: 1,
            explanation: "正確答案是 'will'。這個句子的主詞是 'laundry'，不需要再加代名詞 'it'，直接使用助動詞 'will'。",
            errorType: "句子結構"
        },
        {
            question: "The _____ capital expenditures, after allowing for inflation, are projected to be 8.4 billion euros.",
            options: ["totally", "total", "totaling", "totality"],
            correctAnswer: 1,
            explanation: "正確答案是 'total'。這裡需要一個形容詞來修飾名詞 'capital expenditures'，'total' 是正確的形容詞形式。",
            errorType: "形容詞使用"
        }
    ];

    let currentQuestion = 0;
    let selectedAnswers = [];
    let score = 0;

    const questionNumberElement = document.getElementById('question-number');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitButton = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress');
    const quizSection = document.getElementById('quiz-section');
    const resultSection = document.getElementById('result-section');
    const scoreElement = document.getElementById('score');
    const analysisElement = document.getElementById('analysis');
    const detailedResultsElement = document.getElementById('detailed-results');
    const restartButton = document.getElementById('restart-btn');

    // 初始化測驗
    function initQuiz() {
        currentQuestion = 0;
        selectedAnswers = Array(quizQuestions.length).fill(-1);
        score = 0;
        loadQuestion();
        quizSection.classList.remove('hidden');
        resultSection.classList.add('hidden');
    }

    // 載入當前題目
    function loadQuestion() {
        const question = quizQuestions[currentQuestion];
        questionNumberElement.textContent = `問題 ${currentQuestion + 1} / ${quizQuestions.length}`;
        questionTextElement.textContent = question.question;

        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;

            if (selectedAnswers[currentQuestion] === index) {
                button.classList.add('selected');
            }

            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });

        updateProgressBar();
        updateSubmitButton();
    }

    // 選擇選項
    function selectOption(index) {
        selectedAnswers[currentQuestion] = index;

        const options = document.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        options[index].classList.add('selected');

        updateSubmitButton();
    }

    // 更新提交按鈕狀態
    function updateSubmitButton() {
        if (selectedAnswers[currentQuestion] !== -1) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // 更新進度條
    function updateProgressBar() {
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // 提交答案
    submitButton.addEventListener('click', function() {
        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    // 顯示測驗結果
    function showResults() {
        quizSection.classList.add('hidden');
        resultSection.classList.remove('hidden');

        // 計算分數
        score = 0;
        const errorTypes = {};

        selectedAnswers.forEach((selected, index) => {
            if (selected === quizQuestions[index].correctAnswer) {
                score++;
            } else {
                const errorType = quizQuestions[index].errorType;
                errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
            }
        });

        // 顯示分數
        const percentage = (score / quizQuestions.length) * 100;
        scoreElement.textContent = `${score} / ${quizQuestions.length} (${percentage.toFixed(0)}%)`;

        // 分析錯誤類型
        let analysisHTML = '<h3>錯誤類型分析</h3>';

        if (Object.keys(errorTypes).length === 0) {
            analysisHTML += '<p>恭喜！您全部答對了！</p>';
        } else {
            analysisHTML += '<p>您需要加強的部分：</p><ul>';

            Object.entries(errorTypes)
                .sort((a, b) => b[1] - a[1])
                .forEach(([type, count]) => {
                    analysisHTML += `<li><strong>${type}</strong>: ${count} 題錯誤</li>`;
                });

            analysisHTML += '</ul>';
        }

        analysisElement.innerHTML = analysisHTML;

        // 詳細結果
        let detailedHTML = '<h3>詳細答題結果</h3>';

        selectedAnswers.forEach((selected, index) => {
            const question = quizQuestions[index];
            const isCorrect = selected === question.correctAnswer;

            detailedHTML += `
                <div class="question-result ${isCorrect ? 'correct' : 'incorrect'}">
                    <h3>問題 ${index + 1}</h3>
                    <p>${question.question}</p>
                    <p>您的答案: ${String.fromCharCode(65 + selected)}. ${question.options[selected]}</p>
                    ${!isCorrect ? `<p>正確答案: <span class="correct-answer">${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}</span></p>` : ''}
                    <div class="explanation">
                        <p>${question.explanation}</p>
                        ${!isCorrect ? `<p>錯誤類型: <span class="error-type">${question.errorType}</span></p>` : ''}
                    </div>
                </div>
            `;
        });

        detailedResultsElement.innerHTML = detailedHTML;
    }

    // 重新測驗
    restartButton.addEventListener('click', initQuiz);

    // 初始化測驗
    initQuiz();
});


        // Example questions
        const questions = [
            {
                question: "What is the name of Link's horse?",
                answers: ["Epona", "Navi", "Midna", "Fi"],
                correct: 0
            },
            {
                question: "Which item is used to defeat Gohma in Ocarina of Time?",
                answers: ["Bow", "Boomerang", "Slingshot", "Bomb"],
                correct: 2
            },
            {
                question: "Who is the main villain in most Zelda games?",
                answers: ["Vaati", "Ganon", "Zant", "Majora"],
                correct: 1
            },
            {
                question: "What is the name of the princess Link often rescues?",
                answers: ["Zelda", "Nabooru", "Impa", "Saria"],
                correct: 0
            },
            {
                question: "In which game did Link first use the Master Sword?",
                answers: ["The Legend of Zelda", "The Legend of Zelda: A Link to the Past", "The Legend of Zelda: Ocarina of Time", "The Legend of Zelda: The Wind Waker"],
                correct: 1
            }
            
        ];

        let current = 0;
        let score = 0;
        let lives = 3;

        const questionEl = document.getElementById('question');
        const answersEl = document.getElementById('answers');
        const scoreEl = document.getElementById('score');
        const nextBtn = document.getElementById('nextBtn');
        const restartBtn = document.getElementById('restartBtn');

        let livesEl = document.getElementById('lives');
if (!livesEl) {
    livesEl = document.createElement('div');
    livesEl.id = 'lives';
    livesEl.style.margin = '8px 0';
    scoreEl.parentNode.insertBefore(livesEl, scoreEl.nextSibling);
}

        function showQuestion() {
            const q = questions[current];
            questionEl.textContent = q.question;
            answersEl.innerHTML = '';
            q.answers.forEach((ans, idx) => {
                const btn = document.createElement('button');
                btn.className = 'answer-btn';
                btn.textContent = ans;
                btn.onclick = () => selectAnswer(idx);
                answersEl.appendChild(btn);
            });
            nextBtn.style.display = 'none';
            scoreEl.textContent = `Score: ${score} / ${questions.length}`;
             livesEl.textContent = `Lives: ${lives}`;
        }

        function selectAnswer(idx) {
            const q = questions[current];
            const buttons = answersEl.querySelectorAll('button');
            buttons.forEach((btn, i) => {
                btn.disabled = true;
                if (i === q.correct) btn.style.background = '#ffd700';
                if (i === idx && i !== q.correct) btn.style.background = '#e74c3c';
            });
        if (idx === q.correct) {
            score++;
        } else {
            lives--;
            livesEl.textContent = `Lives: ${lives}`;
            if (lives <= 0) {
                showGameOver();
                return;
            }
        }
        nextBtn.style.display = 'inline-block';
        scoreEl.textContent = `Score: ${score} / ${questions.length}`;
    }

        nextBtn.onclick = () => {
            current++;
            if (current < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        };

        restartBtn.onclick = () => {
            current = 0;
            score = 0;
             lives = 3; // Reset lives
            restartBtn.style.display = 'none';
            showQuestion();
        };

        function showResult() {
            questionEl.textContent = `Quiz Complete!`;
            answersEl.innerHTML = `<div style="margin:16px 0;">Your final score: <strong>${score} / ${questions.length}</strong></div>`;
            nextBtn.style.display = 'none';
            restartBtn.style.display = 'inline-block';
            scoreEl.textContent = '';
            livesEl.textContent = ''; // Clear lives display
        }

        function showGameOver() {
    questionEl.textContent = `Game Over!`;
    answersEl.innerHTML = `<div style="margin:16px 0;">You ran out of lives.<br>Your final score: <strong>${score} / ${questions.length}</strong></div>`;
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    scoreEl.textContent = '';
    livesEl.textContent = '';
}

        // Initialize
        showQuestion();
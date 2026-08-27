// Sistema de Abas dos Tipos de IA
function openTab(evt, tabName) {
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
    }
    let tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Lógica do Quiz
function checkAnswer(button, isCorrect) {
    const resultElement = document.getElementById('quiz-result');
    const buttons = button.parentElement.querySelectorAll('button');
    
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        button.style.backgroundColor = '#2e7d32';
        button.style.borderColor = '#4caf50';
        resultElement.innerText = 'Resposta correta! Garry Kasparov foi vencido em 1997 pelo Deep Blue.';
        resultElement.style.color = '#4caf50';
    } else {
        button.style.backgroundColor = '#c62828';
        button.style.borderColor = '#ef5350';
        resultElement.innerText = 'Incorreto! A resposta certa é Garry Kasparov.';
        resultElement.style.color = '#ef5350';
    }
}

// Fundo Interativo de Partículas (Rede Neural)
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 75;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(11, 60, 73, ${1 - distance / 120})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    connect();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
// Dados e Lógica do Quiz Expandido
const quizData = [
    {
        question: "Quem foi o campeão mundial de xadrez vencido pelo supercomputador Deep Blue em 1997?",
        options: ["Alan Turing", "Garry Kasparov", "Ada Lovelace", "Geoffrey Hinton"],
        answer: 1
    },
    {
        question: "Qual tipo de IA é especializada em executar apenas uma tarefa específica, como o ChatGPT ou sistemas de reconhecimento facial?",
        options: ["IA Geral (AGI)", "Superinteligência (ASI)", "IA Estreita (Restrita)", "IA Autônoma"],
        answer: 2
    },
    {
        question: "Qual destas ferramentas é uma IA multimodal desenvolvida pelo Google?",
        options: ["Midjourney", "Claude", "ChatGPT", "Gemini"],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById('quiz-question-number').innerText = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    document.getElementById('question-text').innerText = q.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => selectOption(btn, index === q.answer);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(button, isCorrect) {
    const buttons = document.querySelectorAll('#quiz-options button');
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        button.style.backgroundColor = '#2e7d32';
        button.style.borderColor = '#4caf50';
        score++;
    } else {
        button.style.backgroundColor = '#c62828';
        button.style.borderColor = '#ef5350';
        buttons[quizData[currentQuestion].answer].style.backgroundColor = '#2e7d32';
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showQuizResults();
        }
    }, 1500);
}

function showQuizResults() {
    document.getElementById('quiz-content').style.display = 'none';
    const resultContainer = document.getElementById('quiz-result-container');
    resultContainer.style.display = 'block';
    
    document.getElementById('quiz-final-score').innerText = 
        `Você acertou ${score} de ${quizData.length} perguntas!`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-result-container').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    loadQuestion();
}

// Inicializar a primeira pergunta do quiz ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});
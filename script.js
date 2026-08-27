// ==========================================
// 1. SISTEMA DE ABAS
// ==========================================
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

// ==========================================
// 2. QUIZ INTERATIVO (6 PERGUNTAS)
// ==========================================
const quizData = [
    {
        question: "O que é o famoso 'Teste de Turing' proposto em 1950?",
        options: [
            "Um teste para medir a velocidade dos processadores",
            "Um método para avaliar se uma máquina consegue simular o comportamento humano",
            "Um programa para geração automática de imagens",
            "Um teste de segurança contra invasões digitais"
        ],
        answer: 1,
        explanation: "Alan Turing propôs que, se um humano conversar com uma máquina sem perceber que ela é um computador, a máquina demonstra inteligência."
    },
    {
        question: "Qual é a principal diferença entre IA Estreita (ANI) e IA Geral (AGI)?",
        options: [
            "A IA Estreita só funciona online, enquanto a AGI roda offline",
            "A IA Estreita executa tarefas específicas; a AGI possui capacidade cognitiva humana completa",
            "A IA Estreita é paga e a AGI é totalmente gratuita",
            "Ambas são exatamente a mesma tecnologia com nomes diferentes"
        ],
        answer: 1,
        explanation: "As IAs atuais são Estreitas (especialistas em uma função). A AGI (capacidade humana geral) ainda está em desenvolvimento."
    },
    {
        question: "O que caracteriza um modelo de IA 'Multimodal'?",
        options: [
            "Ele roda em múltiplos sistemas operacionais ao mesmo tempo",
            "Ele consegue processar e gerar diferentes tipos de dados (texto, imagem, áudio e código)",
            "Ele opera em vários idiomas simultaneamente",
            "Ele exige múltiplos computadores conectados para ligar"
        ],
        answer: 1,
        explanation: "Modelos multimodais conseguem interpretar e integrar diferentes formatos de mídia em uma única resposta."
    },
    {
        question: "Como funciona o Aprendizado Supervisionado?",
        options: [
            "O programador insere cada regra manualmente no código",
            "O algoritmo aprende sem nenhum dado inicial fornecido",
            "O sistema é treinado utilizando dados rotulados com as respostas corretas",
            "A máquina assiste a vídeos para aprender sobre o mundo"
        ],
        answer: 2,
        explanation: "No aprendizado supervisionado, o modelo aprende comparando suas previsões com exemplos já etiquetados."
    },
    {
        question: "O que são 'Tokens' em modelos de linguagem (LLMs)?",
        options: [
            "Moedas virtuais para pagar pelo uso da API",
            "Pedaços de palavras ou caracteres usados para processar o texto",
            "Servidores físicos onde os modelos ficam hospedados",
            "Chaves de acesso para autenticação de usuários"
        ],
        answer: 1,
        explanation: "Os modelos dividem o texto em 'tokens' para calcular matematicamente a probabilidade das próximas palavras."
    },
    {
        question: "O que representa o 'Viés Algorítmico' na IA?",
        options: [
            "Um erro técnico que trava o sistema",
            "A reprodução de preconceitos presentes nos dados de treinamento",
            "A capacidade da IA de tomar decisões por conta própria",
            "A velocidade de resposta do algoritmo"
        ],
        answer: 1,
        explanation: "Se os dados fornecidos contiverem distorções ou históricos discriminatórios, a IA aprenderá e replicará esses padrões."
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = quizData[currentQuestion];
    const qNum = document.getElementById('quiz-question-number');
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('quiz-options');

    if (!qNum || !qText || !optionsContainer) return;

    qNum.innerText = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    qText.innerText = q.question;
    
    optionsContainer.innerHTML = '';

    const oldExp = document.getElementById('quiz-explanation');
    if (oldExp) oldExp.remove();

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => selectOption(btn, index);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(button, selectedIndex) {
    const q = quizData[currentQuestion];
    const buttons = document.querySelectorAll('#quiz-options button');
    buttons.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIndex === q.answer;

    if (isCorrect) {
        button.style.backgroundColor = '#2e7d32';
        button.style.borderColor = '#4caf50';
        score++;
    } else {
        button.style.backgroundColor = '#c62828';
        button.style.borderColor = '#ef5350';
        buttons[q.answer].style.backgroundColor = '#2e7d32';
    }

    const expDiv = document.createElement('div');
    expDiv.id = 'quiz-explanation';
    expDiv.innerHTML = `<strong>Explicação:</strong> ${q.explanation}`;
    document.getElementById('quiz-content').appendChild(expDiv);

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showQuizResults();
        }
    }, 3500);
}

function showQuizResults() {
    document.getElementById('quiz-content').style.display = 'none';
    const resultContainer = document.getElementById('quiz-result-container');
    resultContainer.style.display = 'block';
    
    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('quiz-final-score').innerHTML = 
        `Você acertou ${score} de ${quizData.length} perguntas! (${percentage}%)`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-result-container').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    loadQuestion();
}

// ==========================================
// 3. FUNDO INTERATIVO (CANVAS)
// ==========================================
const canvas = document.getElementById('neural-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 60;

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

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connectParticles() {
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

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animateCanvas);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateCanvas();
}

// ==========================================
// 4. FUNCIONALIDADES DE ACESSIBILIDADE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();

    let zoomLevel = 100;

    const btnIncrease = document.getElementById('btn-increase-font');
    const btnDecrease = document.getElementById('btn-decrease-font');
    const btnReset = document.getElementById('btn-reset-font');
    const btnContrast = document.getElementById('btn-high-contrast');

    if (btnIncrease) {
        btnIncrease.onclick = () => {
            if (zoomLevel < 150) {
                zoomLevel += 10;
                document.body.style.zoom = `${zoomLevel}%`;
            }
        };
    }

    if (btnDecrease) {
        btnDecrease.onclick = () => {
            if (zoomLevel > 80) {
                zoomLevel -= 10;
                document.body.style.zoom = `${zoomLevel}%`;
            }
        };
    }

    if (btnReset) {
        btnReset.onclick = () => {
            zoomLevel = 100;
            document.body.style.zoom = '100%';
        };
    }

    if (btnContrast) {
        btnContrast.onclick = () => {
            document.body.classList.toggle('high-contrast');
        };
    }
});
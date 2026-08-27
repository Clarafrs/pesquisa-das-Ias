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
// Banco de Dados do Quiz Didático (6 Perguntas)
const quizData = [
    {
        question: "O que é o famoso 'Teste de Turing' proposto em 1950?",
        options: [
            "Um teste para medir a velocidade de processamento dos chips",
            "Um método para avaliar se uma máquina consegue simular o comportamento humano",
            "Um programa para criar imagens automáticas por computador",
            "Um teste de segurança contra invasões hackers"
        ],
        answer: 1,
        explanation: "Alan Turing propôs que, se um humano conversar com uma máquina sem perceber que ela é um computador, essa máquina demonstra inteligência."
    },
    {
        question: "Qual é a principal diferença entre IA Estreita (ANI) e IA Geral (AGI)?",
        options: [
            "A IA Estreita só funciona na internet, enquanto a AGI roda offline",
            "A IA Estreita resolve apenas tarefas específicas; a AGI pode aprender qualquer área cognitiva humana",
            "A IA Estreita é paga e a AGI é totalmente gratuita",
            "Não existe diferença, ambos são nomes para a mesma tecnologia"
        ],
        answer: 1,
        explanation: "Praticamente todas as IAs atuais (ChatGPT, Gemini, filtros) são Estreitas. A AGI (capacidade humana completa) ainda é um conceito em desenvolvimento."
    },
    {
        question: "O que significa dizer que um modelo de Inteligência Artificial é 'Multimodal'?",
        options: [
            "Que ele funciona em computadores, celulares e smartwatches ao mesmo tempo",
            "Que ele consegue processar e gerar múltiplos tipos de dados simultaneamente (texto, imagem, áudio e código)",
            "Que ele utiliza vários idiomas ao mesmo tempo",
            "Que ele precisa de vários processadores para ligar"
        ],
        answer: 1,
        explanation: "IAs multimodais (como o Gemini) conseguem interpretar fotos, áudios, vídeos e textos em uma única interação."
    },
    {
        question: "Como o Aprendizado Supervisionado ensina um algoritmo de IA?",
        options: [
            "Com um programador digitando cada regra manualmente",
            "Deixando o sistema solto na internet sem qualquer dado inicial",
            "Fornecendo um grande volume de dados já rotulados com as respostas corretas",
            "Fazendo a máquina assistir a filmes para entender o mundo"
        ],
        answer: 2,
        explanation: "No aprendizado supervisionado, mostramos exemplos prontos (ex: fotos de gatos com a etiqueta 'gato') para a IA aprender o padrão."
    },
    {
        question: "O que são 'Tokens' no funcionamento de um modelo de linguagem (LLM) como o ChatGPT?",
        options: [
            "Moedas digitais usadas para pagar pelo uso da IA",
            "Pedaços de palavras ou caracteres que a IA utiliza para processar e gerar textos",
            "Os chips físicos localizados dentro dos servidores da OpenAI",
            "Senhas secretas de acesso ao sistema"
        ],
        answer: 1,
        explanation: "Os modelos de linguagem quebram as frases em pequenas unidades chamadas 'tokens' para calcular a probabilidade da próxima palavra."
    },
    {
        question: "O que é o chamado 'Viés Algorítmico' na Inteligência Artificial?",
        options: [
            "Um erro que faz o computador desligar sozinho",
            "Quando a IA ganha consciência e passa a desobedecer ordens",
            "A reprodução de preconceitos ou injustiças presentes nos dados usados para treinar a IA",
            "A velocidade exagerada com que a IA responde às perguntas"
        ],
        answer: 2,
        explanation: "Se os dados usados no treinamento contiverem preconceitos históricos ou lacunas, a IA aprenderá e repetirá esses mesmos desvios."
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

    // Remove explicação anterior se existir
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

    // Exibe explicação didática da resposta
    const expDiv = document.createElement('div');
    expDiv.id = 'quiz-explanation';
    expDiv.innerHTML = `<strong>Explicação:</strong> ${q.explanation}`;
    document.getElementById('quiz-content').appendChild(expDiv);

    // Tempo para leitura da explicação antes de avançar
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showQuizResults();
        }
    }, 4000);
}

function showQuizResults() {
    document.getElementById('quiz-content').style.display = 'none';
    const resultContainer = document.getElementById('quiz-result-container');
    resultContainer.style.display = 'block';
    
    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('quiz-final-score').innerHTML = 
        `Você acertou ${score} de ${quizData.length} perguntas! (${percentage}%)<br>` +
        `<span style="font-size: 0.9rem; color: #e6edf3;">` +
        (percentage >= 80 ? "Excelente! Você domina os conceitos básicos de IA." : "Bom trabalho! Releia as seções do site para se tornar um especialista.") +
        `</span>`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-result-container').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    loadQuestion();
}

window.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});
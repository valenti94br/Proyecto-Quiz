const questionContainer = document.querySelector('#question-container')
console.log(questionContainer);
const questionText = document.querySelector('#question-text')
console.log(questionText);
const optionsContainer = document.querySelector('#options-container')
console.log(optionsContainer);
const startBtn = document.querySelector('#start-button')
console.log(startBtn);
const nextQuestionBtn = document.querySelector('#next-button')
console.log(nextQuestionBtn);
const scoreContainer = document.querySelector('#score')
console.log(scoreContainer);
const btnScore = document.querySelector('#btnScore')
const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple'
console.log(API_URL);

let preguntasObject = [];
let currentQuestion = 0;
let puntuacion = [];
//Esto define el Array para ir almacenando la puntuación

const cogerPreguntasApi = async () => {
    try {
        const response = await axios.get(API_URL)
        let preguntas = response.data.results
        console.log(preguntas);
        //todas las preguntas en un array de objetos hago un bucle para que me trabaje sobre cada una de las preguntas
        preguntas.forEach(pregunta => {
            const ask = pregunta.question
            // console.log(ask);
            const respCorrecta = [{ text: pregunta.correct_answer, correct: true }]
            // console.log(respCorrecta)

            const respIncorrectas = []
            pregunta.incorrect_answers.forEach(answer => {
                let incans = { text: answer, correct: false }
                respIncorrectas.push(incans)
            });

            // console.log(respIncorrectas);

            const answers = [...respCorrecta, ...respIncorrectas]

            answers.sort(() => Math.random() - Math.random());
            //esto hace que salgan las respuestas desordenadas pero no entiendo como funciona
            // console.log(answers);
            const askAndAnswers = { pregunta: ask, respuestas: answers }
            // console.log(askAndAnswers);
            preguntasObject.push(askAndAnswers)
            return preguntasObject
        })
        console.log(preguntasObject);
        //este codigo hace que coja de api los datos y los voy adecuando de tal forma para que cuando se ejecute este funcion que sera al hacer click en empezar y se forma un array de objetos deonde cada objeto tiene una pregunta y sus respuestas donde cada respuesta es un objeto con dos propiedades una el texto y otra si es la correcta
    } catch (error) {
        console.error(error);
    }
}
// cogerPreguntasApi()
// console.log(preguntasObject);
const empezarQuiz = async (e) => {
    e.preventDefault();
    startBtn.classList.add('hide')
    nextQuestionBtn.classList.remove('hide')
    questionContainer.classList.remove('hide')
    await cogerPreguntasApi(); // Espera a que se resuelva la promesa
    siguientePregunta(); // Muestra la primera pregunta
}

const mostrarPregunta = preguntasBloque => {
    questionText.innerText = preguntasBloque.pregunta;
    preguntasBloque.respuestas.forEach(respuesta => {
        const btn = document.createElement('button')
        btn.innerText = respuesta.text
        if (respuesta.correct === true) {
            btn.dataset.correct = true
            localStorage.setItem
        }
        btn.addEventListener('click', seleccionarPregunta)
        optionsContainer.appendChild(btn)
    })
}
function setStatusClass(element) {
    if (element.dataset.correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}
const siguientePregunta = () => {
    resetState();
    mostrarPregunta(preguntasObject[currentQuestion])
}
const seleccionarPregunta = (e) => {
    const seleccion = e.target;
    const correcto = seleccion.dataset.correct;
    setStatusClass(seleccion);
    if (correcto) {
        puntuacion.push(1);
    }
    Array.from(optionsContainer.children).forEach((boton) => {
        setStatusClass(boton);
        if (boton.dataset.correct) {
            puntuacion.push(1);
        }
    });
    if (preguntasObject.length > currentQuestion + 1) {
        nextQuestionBtn.classList.remove('hide');
    } else {
        btnScore.classList.remove('hide');
        scoreContainer.innerHTML = `<p>Tu puntuación final es: ${puntuacion.length} puntos.</p>`;
        scoreContainer.classList.remove('hide');
        questionContainer.classList.add('hide');
    }
}
function resetState() {
    nextQuestionBtn.classList.add("hide");
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}
startBtn.addEventListener('click', empezarQuiz);
nextQuestionBtn.addEventListener('click', () => {
    currentQuestion++;
    siguientePregunta()
})

const reiniciarQuiz = () => {
    // Reiniciar variables globales
    preguntasObject = [];
    currentQuestion = 0;
    puntuacion = [];

    // Limpiar elementos del DOM
    questionText.innerText = "";
    scoreContainer.innerHTML = "";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }

    // Esconder elementos del DOM
    nextQuestionBtn.classList.add('hide');
    scoreContainer.classList.add('hide');
    questionContainer.classList.add('hide');
    startBtn.classList.remove('hide');

    // Guardar el array de puntuación en el local storage
    localStorage.setItem('puntuacion', JSON.stringify(puntuacion));
}

const restartBtn = document.querySelector('#restart-button')
restartBtn.addEventListener('click', reiniciarQuiz)
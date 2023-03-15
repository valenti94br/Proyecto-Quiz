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
const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple'
console.log(API_URL);

let preguntas = [];
let answers = [];
let currentQuestion = 0;
const cogerPreguntasApi = async () => {
    try {
        const response = await axios.get(API_URL)
        preguntas = response.data.results
        console.log(preguntas);
        preguntas.forEach(pregunta => {
            const ask = pregunta.question
            console.log(ask);
            const answers = [...pregunta.incorrect_answers,pregunta.correct_answer]
            console.log(answers);
        });
    } catch (error) {
        console.error(error);
    }
}
cogerPreguntasApi()
// const muestraPregunta = (pregunta) =>{
//     preguntas.forEach(pregunta => {
        
//         questionContainer.innerHTML=`
//         <h1>${pregunta.question}</h1><br><br>
//         <p>${pre}
//         `
//     });
// }

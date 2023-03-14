const homeContainer = document.querySelector('#homeContainer')
const btnEmpezar = document.querySelector('#btnempezar')
const btnSiguiente = document.querySelector('#btnsiguiente')
const quizContainer = document.querySelector('#quizContainer')
const resultadosContainer = document.querySelector('#resultadosContainer')
const API_URL = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy'
const preguntaElemento = document.querySelector('#preguntaElemento')
const contenedorRespuestas = document.querySelector('#answers-buttons')
let currentQuestionIndex;
const cogerPreguntasAPI = async () => {
    try {
        const response = await axios.get(API_URL)
        const listado = response.data.results
        console.log(listado);
    } catch (error) {
        console.error(error);
    }
}

const empezarQuiz = (e) => {
    e.preventDefault()
    homeContainer.classList.add('hide')
    currentQuestionIndex = 0;
    quizContainer.classList.remove('hide')
    // setNextQuestion()

}
btnEmpezar.addEventListener('click', empezarQuiz)
// quizContainer.innerHTML = '';
const mostrarPreguntas = (listado) => {
    cogerPreguntasAPI()
quizContainer.innerText='${listado.question}'
    // listado.answers.forEach(answer => {
        
    //     const button = 
    // });

}
mostrarPreguntas()



const siguientePregunta = () => {
    resetState();
    mostrarPreguntas(listado.question[currentQuestionIndex]);
}
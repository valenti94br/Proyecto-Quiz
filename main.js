const homeContainer = document.querySelector('#homeContainer')
const btnEmpezar = document.querySelector('#btnempezar')
const btnSiguiente = document.querySelector('#btnsiguiente')
const quizContainer = document.querySelector('#quizContainer')
const resultadosContainer = document.querySelector('#resultadosContainer')
const API_URL = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy'
const preguntaElemento = document.querySelector('#preguntaElemento')
const contenedorPreguntas = document.querySelector('#preguntaContainer')
let currentQuestionIndex;
let preguntas = []
const cogerPreguntasAPI = async () => {
    try {
        const response = await axios.get(API_URL)
        const listado = response.data.results
        listado.forEach(objeto => {
            preguntas.push(objeto.question)//array con solo preguntas
            console.log(preguntas);
        });
        console.log(listado);
    } catch (error) {
        console.error(error);
    }
}
cogerPreguntasAPI()


const empezarQuiz = (e) => {
    e.preventDefault()
    homeContainer.classList.add('hide')
    currentQuestionIndex = 0;
    quizContainer.classList.remove('hide')
    // setNextQuestion()

}
btnEmpezar.addEventListener('click', empezarQuiz)
// // quizContainer.innerHTML = '';
// const mostrarPreguntas = (listado) => {
//     cogerPreguntasAPI()
// quizContainer.innerText = listado.question
// console.log(listado.question);
//     // listado.answers.forEach(answer => {
        
//     //     const button = 
//     // });

// }
// mostrarPreguntas()



// const siguientePregunta = () => {
//     resetState();
//     mostrarPreguntas(listado.question[currentQuestionIndex]);
// }

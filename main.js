const homeContainer = document.querySelector('#homeContainer')
const btnHome = document.querySelector('#btnHome')
const quizContainer = document.querySelector('#quizContainer')
const resultadosContainer = document.querySelector('#resultadosContainer')
const empezarQuiz = (e) => {
    e.preventDefault()
    homeContainer.classList.add('hide')
    quizContainer.classList.remove('hide')

}
btnHome.addEventListener('click', empezarQuiz)
const API_URL = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=medium'
const preguntaElemento = document.querySelector('#preguntaElemento')
const contenedorRespuestas = document.querySelector('#answers-buttons')
const mostrarPreguntas = () => {
    // quizContainer.innerHTML=''

}
// mostrarPreguntas()
function verApi() {
    axios.get()
}
const cogerPreguntas = async () => {
    try {
        const response = await axios.get(API_URL)
        const listaPreguntas = response.data.results
        console.log(listaPreguntas);
        const ponerPregunta = () => {
            listaPreguntas.forEach(pregunta => {
                preguntaElemento.innerHTML += ` <div>${pregunta.question}</div>`
                
            });
        }
        ponerPregunta()


    } catch (error) {
        console.error(error);
    }
}
cogerPreguntas()
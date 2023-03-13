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
const cogerPreguntas = async () => {
    try {
        const response = await axios.get(API_URL);
        const preguntas = response.data.results;
        quizContainer.innerHTML = ''; 
    
    
        const preguntasDesordenadas = Array.from(Array(preguntas.length).keys()).sort(() => Math.random() - 0.5);
    
        preguntasDesordenadas.forEach((i) => {
          const preguntaText = preguntas[i].question;
    
          const preguntaElement = document.createElement('h2');
          preguntaElement.textContent = preguntaText;
    
          const respuestas = preguntas[i].incorrect_answers.concat(preguntas[i].correct_answer);
    
          const respuestasDesordenadas = Array.from(Array(respuestas.length).keys()).sort(() => Math.random() - 0.5);
    
          const contenedorRespuestas = document.createElement('div');
    
          respuestasDesordenadas.forEach((j) => {
            const respuestaText = respuestas[j];
    
            const respuestaButton = document.createElement('button');
            respuestaButton.textContent = respuestaText;
            respuestaButton.classList.add('btn');
            respuestaButton.addEventListener('click', () => {
            });
    
            contenedorRespuestas.appendChild(respuestaButton);
          });
    
          quizContainer.appendChild(preguntaElement);
          quizContainer.appendChild(contenedorRespuestas);
        });
      } catch (error) {
        console.error(error);
      }
    }
    
    mostrarPreguntas();
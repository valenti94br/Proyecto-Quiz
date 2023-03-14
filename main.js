const homeContainer = document.querySelector('#homeContainer');
const btnHome = document.querySelector('#btnHome');
const quizContainer = document.querySelector('#quizContainer');
const resultadosContainer = document.querySelector('#resultadosContainer');

const empezarQuiz = (e) => {
  e.preventDefault();
  homeContainer.classList.add('hide');
  quizContainer.classList.remove('hide');
};

btnHome.addEventListener('click', empezarQuiz);

const API_URL = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=medium';
const preguntaElemento = document.querySelector('#preguntaElemento');
const contenedorRespuestas = document.querySelector('#answers-buttons');

const mostrarPreguntas = (preguntas) => {

  quizContainer.innerHTML = '';

  // mostrarPreguntas()

  preguntas.forEach((pregunta) => {

    const preguntaElement = document.createElement('h2');
    preguntaElement.textContent = pregunta.question;
    

    const contenedorRespuestas = document.createElement('div');
    

    const respuestasDesordenadas = pregunta.incorrect_answers.concat(pregunta.correct_answer).sort(() => Math.random() - 0.5);
    

    respuestasDesordenadas.forEach((respuesta) => {
      const respuestaButton = document.createElement('button');
      respuestaButton.textContent = respuesta;
      respuestaButton.classList.add('btn');
      respuestaButton.addEventListener('click', () => {});
    
      contenedorRespuestas.appendChild(respuestaButton);
    });
    

    quizContainer.appendChild(preguntaElement);
    quizContainer.appendChild(contenedorRespuestas);
  });
};

const cogerPreguntas = async () => {
  try {
    const response = await axios.get(API_URL);
    const preguntas = response.data.results;
    

    mostrarPreguntas(preguntas);
  } catch (error) {
    console.error(error);
  }
};

cogerPreguntas();




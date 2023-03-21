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
const API_URL = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple'
console.log(API_URL);
const imgapro = document.querySelector('#nota')
const intro = document.querySelector('#intro')
//objetos traidos del dom
let preguntasObject = [];
let currentQuestion = 0;
let puntuacion = [];
//Esto define el Array para ir almacenando la puntuación y un array para almacenar ahi preguntas y respuestas

const cogerPreguntasApi = async () => {
    try {
        const response = await axios.get(API_URL)
        let preguntas = response.data.results
        console.log(preguntas);
        //todas las preguntas en un array de objetos hago un bucle para que me trabaje sobre cada una de las preguntas
        preguntas.forEach(pregunta => {
            const ask = pregunta.question
            // defino el texto de la pregunta
            const respCorrecta = { text: pregunta.correct_answer, correct: true }
            // defino esta variable creando dos propiedades para el objeto que sera la respuesta correcta

            const respIncorrectas = []
            pregunta.incorrect_answers.forEach(answer => {
                let incans = { text: answer, correct: false }
                respIncorrectas.push(incans)
            });

            // como hay varias incorrectas haga un bucle para recorrer y creo un array vacio para ir metiendole cada pregunta incorrecta como un objeto;

            const answers = [respCorrecta, ...respIncorrectas]
            //para que todo este en un mismo array le digo que answers es igual al objeto y uso el metodo spread en resp incorrectas para que todo sea un array de objetos
            answers.sort(() => Math.random() - Math.random());
            //esto hace que salgan las respuestas desordenadas el metodo sort ordena un array y el random no lo entiendo mucho
            // console.log(answers);
            const askAndAnswers = { pregunta: ask, respuestas: answers }
            // console.log(askAndAnswers);
            //hago una variable para juntar preguntas y respuestas y la empujo a la variable global preguntasObject
            preguntasObject.push(askAndAnswers)
        })
        console.log(preguntasObject);
        //este codigo hace que coja de api los datos y los voy adecuando de tal forma para que cuando se ejecute este funcion que sera al hacer click en empezar y se forma un array de objetos deonde cada objeto tiene una pregunta y sus respuestas donde cada respuesta es un objeto con dos propiedades una el texto y otra si es la correcta
    } catch (error) {
        console.error(error);
    }
}
// cogerPreguntasApi()
// console.log(preguntasObject);
const empezarQuiz = async () => {
    console.log("ee")
    intro.classList.add('hide')
    startBtn.classList.add('hide')
    questionContainer.classList.remove('hide')
    await cogerPreguntasApi(); // Espera a que se resuelva la promesa
    siguientePregunta(); // Muestra la primera pregunta
}
//esta funcion es para que empiece el quiz y he puesto el async porque como va a ejecutar una funcion asincrona como es la de cogerpreguntas api debo decirle que espere porque es una tarea que tarda mucho,ademas de esconder y mostrar elementos conforme se requiere para una dinamica fluida
const mostrarPregunta = preguntasObject => {
    questionText.innerText = preguntasObject.pregunta;
    preguntasObject.respuestas.forEach(respuesta => {
        const btn = document.createElement('button')
        btn.innerText = respuesta.text
        btn.classList.add('btnresp')
        if (respuesta.correct === true) {
            btn.dataset.correct = true
        }
        btn.addEventListener('click', seleccionarPregunta)
        optionsContainer.appendChild(btn)
    })
}


//esta funcion mostrarPregunta tiene un parametro que va a ser preguntasObject que sera el array construido por la funcion de cogerPreguntasApi y lo que hace es crear un boton por cada respuesta que haya dentro de preguntasObject,y lo que hace es si respuesta tiene la propiedad correct con valor true que le añada al boton como una clase/dato de correct = true,y se les añade a los botones que escuchen que al clickar ejecuten la funcion seleccionarPregunta
const setStatusClass = btn => {
    if (btn.dataset.correct) {
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
    }
}
//en esta funcion lo que hacemos es que si el boton tiene el dato/clase correct añade esa clase o la otra que sera para que cuando click salga verde o rojo
const siguientePregunta = () => {
    resetState();
    mostrarPregunta(preguntasObject[currentQuestion])
}
//Esta funcion es para pasar a la siguiente pregunta donde se ejecutan las funciones de resetState que esta abajo explicada y mostrarPregunta en funcion de el indice en que se encuentra el array de objetos con las preguntas que es preguntasObject
const seleccionarPregunta = e => {
    const seleccion = e.target;
    const correcto = seleccion.dataset.correct;
    setStatusClass(seleccion);
    if (correcto) {
        puntuacion.push(1);
    }
    Array.from(optionsContainer.children).forEach((boton) => {
        setStatusClass(boton)
    });
    //esta parte de abajo es para que siga mostrando el boton de siguiente pregunta si es mayor la cantidad total de preguntas que la pregunta actual mas 1 y si no pues eso y puse un temporizador para que no se ejecutase rapido y diera tiempo a ver la ultima pregunta un poco
    if (preguntasObject.length > currentQuestion + 1) {
        nextQuestionBtn.classList.remove('hide');
    } else {
        setTimeout(() => {
            scoreContainer.innerHTML = `<p>Tu puntuación final es de ${puntuacion.length} sobre 10 puntos.</p>`;
            scoreContainer.classList.remove('hide');
            questionContainer.classList.add('hide');
            restartBtn.classList.remove('hide')
            aprobado(puntuacion)
            imgapro.classList.remove('hide')
        }, 1500);
    }
}

const resetState = ()=>{
    nextQuestionBtn.classList.add("hide");
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}
//Esto es para limpiar el contenedor de pregunta y respuestas y lo que hacemos es que mientras ese tengo algun hijo quitame el primero por lo tanto va a quitar todo el rato el primero hasta quedarse sin hijos

startBtn.addEventListener('click', empezarQuiz);

// para que se ejecuta empezarQuiz al darle al startBtn
nextQuestionBtn.addEventListener('click', () => {
    currentQuestion++;
    siguientePregunta()
})
//para que al darle a siguiente nos sume +1 a currentQuestion y se ejecute la funcion siguiente pregunta
const restartBtn = document.querySelector('#restart-button')
const reiniciarQuiz = () => {
console.log("hola")
    // Reiniciar variables globales
    preguntasObject = [];
    currentQuestion = 0;
    puntuacion = [];

    // Limpiar elementos del DOM
    optionsContainer.innerHTML=''
    questionText.innerText = "";
    scoreContainer.innerHTML = "";
    imgapro.innerHTML = '';
    
    // Esconder elementos del DOM
    nextQuestionBtn.classList.add('hide');
    scoreContainer.classList.add('hide');
    questionContainer.classList.add('hide');
    startBtn.classList.remove('hide');
    restartBtn.classList.add('hide');
    imgapro.classList.add('hide');
    intro.classList.remove('hide')
    // Guardar el array de puntuación en el local storage(lo comento valenti que no lo hace)
    // localStorage.setItem('puntuacion', JSON.stringify(puntuacion));
}

restartBtn.addEventListener('click', reiniciarQuiz)


const aprobado = puntuacion => {
    if (puntuacion.length >= 5) {
        imgapro.innerHTML = `<img src='https://cdn-icons-png.flaticon.com/512/2726/2726544.png' alt="aprobado">`
    } else {
        imgapro.innerHTML = `<img src='https://www.blogdelaautoescuela.com/blog/wp-content/uploads/2010/07/suspenso1.jpg' alt="suspendido">`
    }
}

//funcion para añadir una imagen en funcion de si apruebas o suspendes con parametro la puntuacion
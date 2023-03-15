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
let currentQuestion = 0;
const cogerPreguntasApi = async () => {
    try {
        const response = await axios.get(API_URL)
        preguntas = response.data.results
        console.log(preguntas);
        //todas las preguntas en un array de objetos hago un bucle para que me trabaje sobre cada una de las preguntas
        preguntas.forEach(pregunta => {
            const ask = pregunta.question
            console.log(ask);
            // guardo la pregunta en una variable para luego meterla en el html
            const answers = [...pregunta.incorrect_answers,pregunta.correct_answer]
            console.log(answers);
            //lo mismo con las respuestas los 3 puntos significa que rompe su array para que asi esten todas en un unico arrays(incorrect_answers es un arrar con 3 mal y el otro es una key solo con una string por eso solo en el primero si no tambn en el otro para romper el array  tambn) las malas y buenas
            //luego no se como habria que hacerlo para recorrer este array y que saliese todo en el html la cosa es que tampoco se como avanzar pq me ha llevado rato pillar lo de los puntos
        });
    } catch (error) {
        console.error(error);
    }
}
cogerPreguntasApi()
//te lo dejo hasta aqui asi y si tocas ya tu me dices pq no estoy seguro de que hasta aqui sea asi pero es lo mas aseado que me ha salido por consola y por aqui asi que ahora voy a desconectar no se cual seria el siguiente paso ahora mismo pero quizas sea tirar por meterlo en el html en el dom pero eso con el tema del SCOPE no se como va a salir pq estan todas las variables dentro de es afuncion y yo con eso me lio y tambn habria que tener en cuenta que para que saliese de una en una habia que hacer lo de currentQuestion e ir limpiando con cada click y salga una nueva pregunta ahora mismo esto ultimo que he dicho tomalo mas como corazonada pq no tengo ni idea de vd me meto con eso esta noche o mañana
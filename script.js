//initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

//Events
document
  .querySelector('.scoreArea button')
  .addEventListener('click', handleReset);

//Functions
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];
    let percent = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector('.progress--bar').style.width = `${percent}%`;

    document.querySelector('.scoreArea').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'block';

    document.querySelector('.question').innerHTML = q.question;

    let optionsHTML = '';
    for (const option in q.options) {
      optionsHTML += `<div data-option=${option} class="option"><span>${
        parseInt(option) + 1
      }</span>${q.options[option]}</div>`;
    }
    document.querySelector('.options').innerHTML = optionsHTML;

    document.querySelectorAll('.options .option').forEach((option) => {
      option.addEventListener('click', handleClick);
    });
  } else {
    finishQuiz();
  }
}

function handleClick(event) {
  let clickedOption = parseInt(event.target.getAttribute('data-option'));

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if (points < 30) {
    document.querySelector('.scoreText1').innerHTML = 'Tá ruim Em!';
    document.querySelector('.scorePct').style.color = '#ff0000';
  } else if (points >= 30 && points < 70) {
    document.querySelector('.scoreText1').innerHTML = 'Muito Bom!';
    document.querySelector('.scorePct').style.color = '#ffff00';
  } else if (points >= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
    document.querySelector('.scorePct').style.color = '#0d630d';
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
  document.querySelector(
    '.scoreText2'
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

  document.querySelector('.scoreArea').style.display = 'block';
  document.querySelector('.questionArea').style.display = 'none';
  document.querySelector('.progress--bar').style.width = `100%`;
}

function handleReset() {
  currentQuestion = 0;
  correctAnswers = 0;

  showQuestion();
}

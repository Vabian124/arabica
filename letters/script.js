let score = 0;
const letterDisplay = document.getElementById('letterDisplay');
const optionsContainer = document.getElementById('optionsContainer');
const scoreDisplay = document.getElementById('score');
const NEW_LETTER_TIMEOUT = 2000;
const AMOUNT_OF_OPTIONS = 6;
const loggedCorrectLetters = document.getElementById('loggedCorrectLetters');
const loggedWrongLetters = document.getElementById('loggedWrongLetters');


let cycleIndex = 0;
let cycleOrder = [];

let arabicAlphabetPromise = fetch('arabicAlphabet.json')
  .then(response => response.json())
  .then(data => {
    arabicAlphabet = data;
    getNewLetter();
  });

function resetColors() {
  const radios = document.getElementsByName('transcription');
  letterDisplay.style.color = '';
  letterDisplay.style.outline = 'none';
  for (let i = 0; i < radios.length; i++) {
    radios[i].parentElement.style.color = '';
  }
}

function getNewLetter() {
  resetColors();

  setCycleOrder();

  const currentLetter = cycleOrder[cycleIndex];
  letterDisplay.textContent = currentLetter.letter;

  // Genereer transcriptie-opties
  const options = generateOptions(currentLetter);

  optionsContainer.innerHTML = '';
  setOptions(options, currentLetter);

  cycleIndex++;
  if (cycleIndex >= cycleOrder.length) {
    cycleIndex = 0;
    cycleOrder = [];
  }


}

function setOptions(options, currentLetter) {
  options.forEach((option, index) => {
    const optionContainer = document.createElement("div");
    const radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "transcription");
    radio.setAttribute("value", option);
    radio.id = `option${index}`;
    radio.addEventListener('change', function () {
      const isCorrect = this.value === currentLetter.transcription;
      updateScore(isCorrect);
      setOutline(isCorrect, options, currentLetter);
      const transcriptionDisplay = document.createElement("span");
      transcriptionDisplay.innerHTML = `<span class="letterTranscription"> - ${currentLetter.transcription}</span>`;

      letterDisplay.appendChild(transcriptionDisplay);

      setLogItems(isCorrect, currentLetter);

      setTimeout(getNewLetter, NEW_LETTER_TIMEOUT);
    });

    const label = setLabels(index, option);

    optionContainer.appendChild(radio);
    optionContainer.appendChild(label);
    optionsContainer.appendChild(optionContainer);
  });
}

function setLogItems(isCorrect, currentLetter) {
  if (isCorrect) {
    loggedCorrectLetters.innerHTML += `<li>${currentLetter.letter}  -  ${currentLetter.transcription}</li>`;
  } else {
    loggedWrongLetters.innerHTML += `<li>${currentLetter.letter}  -  ${currentLetter.transcription}</li>`;
  }
}

function setLabels(index, option) {
  const label = document.createElement("label");
  label.setAttribute("for", `option${index}`);
  label.textContent = option;
  return label;
}

function setCycleOrder() {
  if (cycleOrder.length === 0) {
    cycleOrder = shuffleArray(arabicAlphabet);
  }
}

function setOutline(isCorrect, options, currentLetter) {
  if (isCorrect) {
    letterDisplay.style.color = 'green';
    letterDisplay.style.outline = '2px solid green';
  } else {
    letterDisplay.style.color = 'red';
    letterDisplay.style.outline = '2px solid red';
    document.getElementById(`option${options.indexOf(currentLetter.transcription)}`).parentElement.style.color = 'green';
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateOptions(currentLetter) {
  const options = [];
  for (let i = 0; i < AMOUNT_OF_OPTIONS; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * arabicAlphabet.length);
    } while (index === arabicAlphabet.indexOf(currentLetter) || options.includes(arabicAlphabet[index].transcription));
    options.push(arabicAlphabet[index].transcription);
  }
  options.push(currentLetter.transcription);
  options.sort(() => Math.random() - 0.5);
  return options;
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="transcription"]:checked');
  if (selectedOption) {
    const isCorrect = selectedOption.value === arabicAlphabet[0].transcription;
    updateScore(isCorrect);
  }
}

function updateScore(isCorrect) {
  if (isCorrect) {
    score++;
  } else {
    score--;
  }
  scoreDisplay.textContent = score;
}

document.getElementById('resetButton').addEventListener('click', function () {
  score = 0;
  scoreDisplay.textContent = score;
});


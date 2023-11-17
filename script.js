let score = 0;
const letterDisplay = document.getElementById('letterDisplay');
const optionsContainer = document.getElementById('optionsContainer');
const scoreDisplay = document.getElementById('score');

let arabicAlphabet = [
 {letter: "ا،أَ،أُ،إ", transcription: "ā, ‘a, ‘u, ‘i", example: "أَنا – ik"},
 {letter: "ب", transcription: "b", example: "بابٌ – deur"},
 {letter: "ت", transcription: "t", example: "تاجٌ – kroon"},
 {letter: "ط", transcription: "ṭ", example: "طِفْلٌ – kind"},
 {letter: "ض", transcription: "ḍ", example: "ضِرْسٌ – kies"},
 {letter: "ظ", transcription: "ẓ", example: "ظُهْرٌ – middag"},
 {letter: "ث", transcription: "t", example: "ثَلْجٌ – sneeuw"},
 {letter: "ع", transcription: "ع", example: "عَيْنٌ – oog"},
 {letter: "ج", transcription: "j", example: "جَمَلٌ -kameel"},
 {letter: "غ", transcription: "ġ", example: "غَرْبٌ – westen"},
 {letter: "ح", transcription: "Ḥ", example: "حُبٌّ – liefde"},
 {letter: "ف", transcription: "f", example: "فارِسٌ – ruiter"},
 {letter: "خ", transcription: "kh/x", example: "خَبَرٌ – bericht"},
 {letter: "ق", transcription: "q", example: "قَلْبٌ – hart"},
 {letter: "د", transcription: "d", example: "دُبٌّ – beer"},
 {letter: "ك", transcription: "k", example: "كَلْبٌ – hond"},
 {letter: "ذ", transcription: "d", example: "ذَهَبٌ – goud"},
 {letter: "ل", transcription: "l", example: "لَيْلٌ – nacht"},
 {letter: "ر", transcription: "r", example: "رَأْسٌ – hoofd"},
 {letter: "م", transcription: "m", example: "مَدِينَةٌ – stad"},
 {letter: "ز", transcription: "z", example: "زَيْتونٌ – olijf"},
 {letter: "ن", transcription: "n", example: "نَوْمٌ – slaap"},
 {letter: "س", transcription: "s", example: "سُوقٌ – markt"},
 {letter: "ه", transcription: "h", example: "هُوَ – hij"},
 {letter: "ش", transcription: "š", example: "شَمْسٌ – zon"},
 {letter: "و", transcription: "w/ū", example: "وَلَدٌ – jongen"},
 {letter: "ص", transcription: "ṣ", example: "صَديقٌ -vriend"},
 {letter: "ي/ى", transcription: "y, ī / ā", example: "يَدٌ – hand"}
];

function resetColors() {
    letterDisplay.style.color = '';
    const radios = document.getElementsByName('transcription');
    letterDisplay.style.outline = 'none';
    for (let i = 0; i < radios.length; i++) {
     radios[i].parentElement.style.color = '';
    }
   }
   
   let cycleIndex = 0;
let cycleOrder = [];

function getNewLetter() {
    resetColors();
   
    if (cycleOrder.length === 0) {
     cycleOrder = shuffleArray(arabicAlphabet);
    }
   
    const currentLetter = cycleOrder[cycleIndex];
    letterDisplay.textContent = currentLetter.letter;
   
    // Genereer transcriptie-opties
    const options = generateOptions(currentLetter);
   
    optionsContainer.innerHTML = '';
    options.forEach((option, index) => {
     const optionContainer = document.createElement("div");
     const radio = document.createElement("input");
     radio.setAttribute("type", "radio");
     radio.setAttribute("name", "transcription");
     radio.setAttribute("value", option);
     radio.id = `option${index}`;
     radio.addEventListener('change', function() {
       const isCorrect = this.value === currentLetter.transcription;
       updateScore(isCorrect);
       if (isCorrect) {
         letterDisplay.style.color = 'green';
         letterDisplay.style.outline = '2px solid green';
       } else {
         letterDisplay.style.color = 'red';
         letterDisplay.style.outline = '2px solid red';
         document.getElementById(`option${options.indexOf(currentLetter.transcription)}`).parentElement.style.color = 'green';
       }
       const transcriptionDisplay = document.createElement("span");
       transcriptionDisplay.textContent = currentLetter.transcription;
       letterDisplay.appendChild(transcriptionDisplay);
       setTimeout(getNewLetter, 2000);
     });
   
     const label = document.createElement("label");
     label.setAttribute("for", `option${index}`);
     label.textContent = option;
   
     optionContainer.appendChild(radio);
     optionContainer.appendChild(label);
     optionsContainer.appendChild(optionContainer);
    });
   
    cycleIndex++;
    if (cycleIndex >= cycleOrder.length) {
     cycleIndex = 0;
     cycleOrder = [];
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
    for (let i = 0; i < 6; i++) {
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
 scoreDisplay.textContent = 'Score: ' + score;
}

document.getElementById('resetButton').addEventListener('click', function() {
 score = 0;
 scoreDisplay.textContent = 'Score: ' + score;
});

getNewLetter();

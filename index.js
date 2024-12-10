const rules = document.querySelector('.rules');
const closemodal = document.querySelector('.close');
const rock = document.querySelector('.rock');
const scissors = document.querySelector('.scissors');
const paper = document.querySelector('.paper');
const modal = document.querySelector('.modal');
const stepTwo = document.querySelector('.step-two');
const cominnerCircle = document.querySelector('.cominnerCircle');
const userinnerCircle = document.querySelector('.userinnerCircle');
const gameContainer = document.querySelector('.game-container');
const gamedecider = document.querySelector('.gamedecider');
const winLose = document.querySelector('.win_lose');
const score = document.querySelector('.score');
const continueGame = document.querySelector('.continue');

rules.addEventListener('click', openModal);
closemodal.addEventListener('click', closesModal);
[scissors, paper, rock].forEach(choice => choice.addEventListener('click', openStepTwo));
continueGame.addEventListener('click', resetGame);

function openModal(){
    modal.style.scale = "1"
}

function closesModal(){
    modal.style.scale = "0"
}

function openStepTwo(e){
    // Reset state for new game
    resetVisuals();
    
    gameContainer.style.display = 'none';
    stepTwo.style.display = 'block';

    const userChoice = e.target;
    const userChoiceClass = userChoice.className;
    userinnerCircle.firstElementChild.src = userChoice.src;
    userinnerCircle.classList.add(userChoiceClass);  // Add chosen class for styling

    // Delay for computer choice
    setTimeout(() => revealComputerChoice(userChoiceClass), 2500);

}

function revealComputerChoice(userChoiceClass) {
    const computerOptions = [rock, paper, scissors];
    const randomIndex = Math.floor(Math.random() * computerOptions.length);
    const computerChoice = computerOptions[randomIndex];
    const computerChoiceClass = computerChoice.className;

    // Display computer choice
    cominnerCircle.firstElementChild.src = computerChoice.src;
    cominnerCircle.classList.add(computerChoiceClass);

    // Determine game result
    const result = determineResult(userChoiceClass, computerChoiceClass);
    updateScoreAndMessage(result);

}

// Determine result
function determineResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) return 'DRAW';
    if ((userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')) {
        return 'WIN';
    }
    return 'LOSE';
}

// Update score and message
function updateScoreAndMessage(result) {
    winLose.textContent = `YOU ${result}`;
    gamedecider.style.display = 'block';

    if (result === 'WIN') {
        score.textContent = parseInt(score.textContent) + 1;
        userinnerCircle.classList.add('circle-bg');
    } else if (result === 'LOSE') {
        score.textContent = Math.max(0, parseInt(score.textContent) - 1);
        cominnerCircle.classList.add('circle-bg');
    } else {
        // DRAW case
        userinnerCircle.classList.add('circle-bg');
        cominnerCircle.classList.add('circle-bg');
    }
}

// Reset visuals for next game
function resetVisuals() {
    gamedecider.style.display = 'none';
    userinnerCircle.className = 'userinnerCircle';
    cominnerCircle.className = 'cominnerCircle';
    winLose.textContent = '';
}

// Reset game (without reloading page)
function resetGame() {
    resetVisuals();
    stepTwo.style.display = 'none';
    gameContainer.style.display = 'block';
}
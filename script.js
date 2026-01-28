// TIC TAC TOE LOGIC
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
let winningIndices = null;

function makeMove(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        const result = checkWin();
        if (result) {
            statusDisplay.innerText = `${currentPlayer} Wins!`;
            winningIndices = result;
            highlightWinningLine(result);
            triggerConfetti();
            lockBoard();
        } else if (board.every((cell) => cell !== '')) {
            statusDisplay.innerText = 'Draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.innerText = `${currentPlayer}'s Turn`;
        }
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const cond of winConditions) {
        if (cond.every((index) => board[index] === currentPlayer)) {
            return cond;
        }
    }
    return null;
}

function highlightWinningLine(winningIndices) {
    winningIndices.forEach((index) => {
        cells[index].classList.add('winning-cell');
    });
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach((cell) => {
        cell.innerText = '';
        cell.classList.remove('winning-cell');
    });
    currentPlayer = 'X';
    statusDisplay.innerText = "X's Turn";
    winningIndices = null;
}

function lockBoard() {
    cells.forEach((cell) => (cell.onclick = null));
}

// Typing Speed Test
let timer = 0;
let interval;
let isTyping = false;
let testFinished = false;
const sampleText =
    'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.';
let startTime;
const maxTime = 60;

function checkTyping() {
    if (testFinished) return;

    if (!isTyping) {
        startTime = new Date().getTime();
        isTyping = true;
        timer = 0;
        testFinished = false;
        document.getElementById('typing-reset-btn').style.display = 'none';
        interval = setInterval(() => {
            timer++;
            updateTimerDisplay();
            if (timer >= maxTime) {
                clearInterval(interval);
                endTypingTest();
            }
        }, 1000);
    }
    const input = document.getElementById('typing-input').value;
    const sample = sampleText.substring(0, input.length);

    // Update sample text display with color coding
    updateSampleTextDisplay(input);

    if (input === sample) {
        document.getElementById('typing-input').style.borderColor = '#00ff00';
    } else {
        document.getElementById('typing-input').style.borderColor = '#ff0000';
    }

    // Check if entire text has been typed correctly
    if (input === sampleText) {
        clearInterval(interval);
        endTypingTest();
    }

    calculateResults();
}

function updateTimerDisplay() {
    document.getElementById('timer-display').innerText = timer;
}

function updateSampleTextDisplay(input) {
    const displayDiv = document.getElementById('sample-text-display');
    let html = '';

    for (let i = 0; i < sampleText.length; i++) {
        if (i < input.length) {
            // Character has been typed
            if (input[i] === sampleText[i]) {
                // Correct character - green
                html += `<span style="color: #00ff00; background-color: rgba(0, 255, 0, 0.2);">${sampleText[i]}</span>`;
            } else {
                // Wrong character - red
                html += `<span style="color: #ff0000; background-color: rgba(255, 0, 0, 0.2);">${sampleText[i]}</span>`;
            }
        } else {
            // Character not yet typed - gray
            html += `<span style="color: #808080;">${sampleText[i]}</span>`;
        }
    }

    displayDiv.innerHTML = html;
}

function endTypingTest() {
    testFinished = true;
    document.getElementById('typing-input').disabled = true;
    document.getElementById('typing-reset-btn').style.display = 'block';
    calculateResults(true);
}

function calculateResults(isFinished = false) {
    const input = document.getElementById('typing-input').value;
    if (input.length === 0) {
        document.getElementById('wpm-display').innerText = '0 WPM';
        document.getElementById('accuracy-display').innerText = '0% Accuracy';
        return;
    }
    const timeElapsed = Math.max(
        (new Date().getTime() - startTime) / 1000 / 60,
        0.016,
    ); // at least 1 second to avoid infinity
    const wordsTyped = input.split(' ').length;
    const wpm = Math.round(wordsTyped / timeElapsed);
    const correctChars = input
        .split('')
        .filter((char, i) => char === sampleText[i]).length;
    const accuracy = Math.round((correctChars / input.length) * 100) || 0;
    document.getElementById('wpm-display').innerText = `${wpm} WPM`;
    document.getElementById('accuracy-display').innerText =
        `${accuracy}% Accuracy`;

    // Trigger confetti if test is finished and conditions are met
    if (isFinished && wpm > 35 && accuracy > 95) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
        });
    }
}

function resetTypingTest() {
    timer = 0;
    isTyping = false;
    testFinished = false;
    clearInterval(interval);
    document.getElementById('typing-input').value = '';
    document.getElementById('typing-input').disabled = false;
    document.getElementById('typing-input').style.borderColor = '#ff69b4';
    document.getElementById('timer-display').innerText = '0';
    document.getElementById('wpm-display').innerText = '0 WPM';
    document.getElementById('accuracy-display').innerText = '0% Accuracy';
    document.getElementById('typing-reset-btn').style.display = 'none';

    // Reset sample text display
    const displayDiv = document.getElementById('sample-text-display');
    displayDiv.innerHTML = sampleText;
    displayDiv.style.color = '#a0aec0';
}

// Click Counter
let userClicks = 0;
let totalClicks = parseInt(localStorage.getItem('totalClicks')) || 0;

function incrementClick() {
    userClicks++;
    totalClicks++;
    document.getElementById('user-clicks').innerText = userClicks;
    document.getElementById('top-total-clicks').innerText = totalClicks;
    document.getElementById('total-clicks').innerText = totalClicks;
    localStorage.setItem('totalClicks', totalClicks);
}

function onClickImageClick() {
    // Add click animation to image
    const clickImage = document.getElementById('click-image');
    clickImage.classList.remove('click-animation');
    // Trigger reflow to restart animation
    void clickImage.offsetWidth;
    clickImage.classList.add('click-animation');

    // Create +1 floating text
    createPlusOneText();

    // Increment click counter
    incrementClick();
}

function createPlusOneText() {
    const container = document.getElementById('plus-one-container');
    const plusOne = document.createElement('div');
    plusOne.className = 'plus-one-text';
    plusOne.textContent = '+1';

    // Generate random position around the image
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 30; // Random distance from center
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    // Position it randomly around the image center
    plusOne.style.left = `calc(50% + ${x}px)`;
    plusOne.style.top = `calc(50% + ${y}px)`;
    plusOne.style.transform = 'translate(-50%, -50%)';

    container.appendChild(plusOne);

    // Remove the element after animation completes
    setTimeout(() => {
        plusOne.remove();
    }, 1000);
}

// Rock Paper Scissors Game
let playerScore = 0;
let computerScore = 0;

function playRPS(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    const choiceEmoji = {
        rock: '🪨',
        paper: '📄',
        scissors: '✂️',
    };

    document.getElementById('player-choice').innerText =
        choiceEmoji[playerChoice];
    document.getElementById('computer-choice').innerText =
        choiceEmoji[computerChoice];

    let result = '';
    if (playerChoice === computerChoice) {
        result = "It's a Tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You Win! 🎉';
        playerScore++;
    } else {
        result = 'Computer Wins! 💻';
        computerScore++;
    }

    const resultElement = document.getElementById('result-message');
    resultElement.classList.remove('rps-result');
    resultElement.innerText = result;
    // Trigger animation
    void resultElement.offsetWidth;
    resultElement.classList.add('rps-result');

    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
}

// Initialize click counter display
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('top-total-clicks').innerText = totalClicks;

    const form = document.querySelector('form[name="contact"]');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(form);

            // Submit to Netlify
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
            })
                .then(() => {
                    // Show success message after submission
                    showSuccessMessage();
                    // Reset form for next use
                    form.reset();
                })
                .catch((error) => {
                    console.error('Form submission error:', error);
                    // Still show success message even if there's an error
                    showSuccessMessage();
                    form.reset();
                });
        });
    }
});

function showSuccessMessage() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className =
        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.id = 'success-overlay';

    // Create success modal
    const modal = document.createElement('div');
    modal.className =
        'bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 md:p-12 text-center max-w-md w-full mx-4 shadow-2xl animate-bounce-in';
    modal.innerHTML = `
        <div class="mb-6">
            <svg class="w-20 h-20 mx-auto text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
        <h2 class="text-3xl font-bold text-white mb-3">Success!</h2>
        <p class="text-cyan-100 text-lg mb-6">Your message has been submitted successfully. I'll get back to you soon!</p>
        <button onclick="closeSuccessMessage()" class="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:bg-cyan-50 transition transform hover:scale-105">
            Close
        </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

function closeSuccessMessage() {
    const overlay = document.getElementById('success-overlay');
    if (overlay) {
        overlay.remove();
    }
}

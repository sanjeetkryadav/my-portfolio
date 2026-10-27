// ── TIC TAC TOE ─────────────────────────────────────────────────────────────
let currentPlayer = 'X';
let board = ['','','','','','','','',''];
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
let winningIndices = null;

function makeMove(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        const result = checkWin();
        if (result) {
            statusDisplay.innerText = `${currentPlayer} Wins! 🎉`;
            winningIndices = result;
            highlightWinningLine(result);
            triggerConfetti();
            lockBoard();
        } else if (board.every(c => c !== '')) {
            statusDisplay.innerText = 'Draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.innerText = `${currentPlayer}'s Turn`;
        }
    }
}

function checkWin() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
    ];
    for (const cond of wins) {
        if (cond.every(i => board[i] === currentPlayer)) return cond;
    }
    return null;
}

function highlightWinningLine(indices) {
    indices.forEach(i => cells[i].classList.add('winning-cell'));
}

function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
}

function resetGame() {
    board = ['','','','','','','','',''];
    cells.forEach((cell, i) => {
        cell.innerText = '';
        cell.classList.remove('winning-cell');
        cell.onclick = () => makeMove(i);
    });
    currentPlayer = 'X';
    if (statusDisplay) statusDisplay.innerText = "X's Turn";
    winningIndices = null;
}

function lockBoard() {
    cells.forEach(cell => cell.onclick = null);
}

// ── TYPING SPEED TEST ────────────────────────────────────────────────────────
let timer = 0;
let interval;
let isTyping = false;
let testFinished = false;
const sampleText = 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.';
let startTime;
const maxTime = 60;

function checkTyping() {
    if (testFinished) return;
    if (!isTyping) {
        startTime = new Date().getTime();
        isTyping = true;
        timer = 0;
        const resetBtn = document.getElementById('typing-reset-btn');
        if (resetBtn) resetBtn.style.display = 'none';
        interval = setInterval(() => {
            timer++;
            updateTimerDisplay();
            if (timer >= maxTime) { clearInterval(interval); endTypingTest(); }
        }, 1000);
    }
    const input = document.getElementById('typing-input').value;
    const sample = sampleText.substring(0, input.length);
    updateSampleTextDisplay(input);
    document.getElementById('typing-input').style.borderColor =
        input === sample ? '#22c55e' : '#ef4444';
    if (input === sampleText) { clearInterval(interval); endTypingTest(); }
    calculateResults();
}

function updateTimerDisplay() {
    const el = document.getElementById('timer-display');
    if (el) el.innerText = timer;
}

function updateSampleTextDisplay(input) {
    const displayDiv = document.getElementById('sample-text-display');
    if (!displayDiv) return;
    let html = '';
    for (let i = 0; i < sampleText.length; i++) {
        if (i < input.length) {
            html += input[i] === sampleText[i]
                ? `<span style="color:#22c55e;background:rgba(34,197,94,.15)">${sampleText[i]}</span>`
                : `<span style="color:#ef4444;background:rgba(239,68,68,.15)">${sampleText[i]}</span>`;
        } else {
            html += `<span style="color:#64748b">${sampleText[i]}</span>`;
        }
    }
    displayDiv.innerHTML = html;
}

function endTypingTest() {
    testFinished = true;
    const inp = document.getElementById('typing-input');
    const btn = document.getElementById('typing-reset-btn');
    if (inp) inp.disabled = true;
    if (btn) btn.style.display = 'block';
    calculateResults(true);
}

function calculateResults(isFinished = false) {
    const inp = document.getElementById('typing-input');
    if (!inp) return;
    const input = inp.value;
    if (!input.length) return;
    const elapsed = Math.max((new Date().getTime() - startTime) / 1000 / 60, 0.016);
    const wpm = Math.round(input.split(' ').length / elapsed);
    const correct = input.split('').filter((c, i) => c === sampleText[i]).length;
    const acc = Math.round((correct / input.length) * 100) || 0;
    const wpmEl = document.getElementById('wpm-display');
    const accEl = document.getElementById('accuracy-display');
    if (wpmEl) wpmEl.innerText = wpm;
    if (accEl) accEl.innerText = acc + '%';
    if (isFinished && wpm > 35 && acc > 95 && typeof confetti === 'function') {
        confetti({ particleCount: 160, spread: 70, origin: { y: 0.6 } });
    }
}

function resetTypingTest() {
    timer = 0; isTyping = false; testFinished = false;
    clearInterval(interval);
    const inp = document.getElementById('typing-input');
    const btn = document.getElementById('typing-reset-btn');
    const wpm = document.getElementById('wpm-display');
    const acc = document.getElementById('accuracy-display');
    const tim = document.getElementById('timer-display');
    const disp = document.getElementById('sample-text-display');
    if (inp)  { inp.value = ''; inp.disabled = false; inp.style.borderColor = ''; }
    if (btn)  btn.style.display = 'none';
    if (wpm)  wpm.innerText  = '0';
    if (acc)  acc.innerText  = '100%';
    if (tim)  tim.innerText  = '0';
    if (disp) { disp.innerHTML = sampleText; }
}

// ── INTERACTIVE TERMINAL EMULATOR ────────────────────────────────────────────
const TERM_COMMANDS = {
    help: () => [
        '<span class="tc-c">Available commands:</span>',
        '  <span class="tc-y">whoami</span>    &mdash; About Sanjeet',
        '  <span class="tc-y">skills</span>    &mdash; Tech stack',
        '  <span class="tc-y">projects</span>  &mdash; Featured work',
        '  <span class="tc-y">contact</span>   &mdash; Get in touch',
        '  <span class="tc-y">github</span>    &mdash; Open GitHub profile',
        '  <span class="tc-y">date</span>      &mdash; Current date &amp; time',
        '  <span class="tc-y">clear</span>     &mdash; Clear terminal',
    ],
    whoami: () => [
        '<span class="tc-c">Sanjeet Kumar Yadav</span>',
        'Full-Stack Developer &middot; Automation Engineer &middot; AI Enthusiast',
        'Location  <span class="tc-m">India &#x1F1EE;&#x1F1F3;</span>',
        'Status    <span class="tc-g">&#x25CF; Open to Opportunities</span>',
        'Stack     JS &middot; Python &middot; React &middot; Node &middot; TypeScript',
    ],
    skills: () => [
        '<span class="tc-c">Tech Stack</span>',
        '<span class="tc-g">Frontend</span>   React &middot; TypeScript &middot; HTML5 &middot; CSS3 &middot; Tailwind',
        '<span class="tc-g">Backend</span>    Node.js &middot; Python &middot; Express &middot; MongoDB',
        '<span class="tc-g">Automation</span> Playwright &middot; Selenium &middot; discord.py',
        '<span class="tc-g">Tools</span>      Git &middot; VS Code &middot; Linux',
    ],
    projects: () => [
        '<span class="tc-c">Featured Projects</span>',
        '  <span class="tc-y">01</span> Discord Bot           Python &middot; discord.py',
        '  <span class="tc-y">02</span> Portfolio Website      JS &middot; HTML5 &middot; CSS3',
        '  <span class="tc-y">03</span> Web Scraper Framework  TypeScript &middot; Playwright',
        '  <span class="tc-y">04</span> E-Commerce Automation  Python &middot; Selenium',
        '',
        'Scroll to the <span class="tc-c">#projects</span> section &#x2191;',
    ],
    contact: () => [
        '<span class="tc-c">Contact Info</span>',
        'LinkedIn  <span class="tc-m">linkedin.com/in/sanjeet786</span>',
        'GitHub    <span class="tc-m">github.com/sanjeetkryadav</span>',
        'Email     <span class="tc-m">via contact page</span>',
        '',
        '<span class="tc-g">Open to freelance &amp; full-time roles.</span>',
    ],
    date: () => {
        const now = new Date();
        return ['<span class="tc-c">' + now.toLocaleString('en-IN', {
            weekday:'long', year:'numeric', month:'long',
            day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit',
        }) + '</span>'];
    },
    github: () => {
        setTimeout(() => window.open('https://github.com/sanjeetkryadav', '_blank'), 400);
        return ['<span class="tc-g">Opening GitHub profile&#x2026;</span>'];
    },
};

let termHistory = [];
let termHistIdx = -1;

function _termAppend(html, cls) {
    const out = document.getElementById('term-output');
    if (!out) return;
    const div = document.createElement('div');
    div.className = 'term-line' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
}

function termPrint(lines) {
    lines.forEach(l => _termAppend(l === '' ? '&nbsp;' : l));
}

function termEcho(cmd) {
    _termAppend(
        `<span class="term-prompt-inline">&#x279C; ~&nbsp;</span><span class="tc-w">${_esc(cmd)}</span>`,
        'term-echo'
    );
}

function _esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function termKeyDown(e) {
    const inp = document.getElementById('term-input');
    if (!inp) return;
    if (e.key === 'Enter') {
        const raw = inp.value.trim();
        inp.value = '';
        if (!raw) return;
        termHistory.unshift(raw);
        termHistIdx = -1;
        termEcho(raw);
        const cmd = raw.toLowerCase().split(' ')[0];
        if (cmd === 'clear') {
            const out = document.getElementById('term-output');
            if (out) out.innerHTML = '';
        } else if (TERM_COMMANDS[cmd]) {
            termPrint(TERM_COMMANDS[cmd]());
        } else {
            termPrint([
                `<span class="tc-r">command not found: ${_esc(cmd)}</span>`,
                'Type <span class="tc-y">help</span> for available commands.',
            ]);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (termHistIdx < termHistory.length - 1) { termHistIdx++; inp.value = termHistory[termHistIdx]; }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (termHistIdx > 0) { termHistIdx--; inp.value = termHistory[termHistIdx]; }
        else { termHistIdx = -1; inp.value = ''; }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = inp.value.toLowerCase();
        const match = Object.keys(TERM_COMMANDS).find(k => k.startsWith(partial));
        if (match) inp.value = match;
    }
}

// ── CONTACT FORM SUCCESS MODAL ───────────────────────────────────────────────
function showSuccessMessage() {
    const overlay = document.createElement('div');
    overlay.id = 'success-overlay';
    overlay.style.cssText =
        'position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(6px)';

    const modal = document.createElement('div');
    modal.className = 'animate-bounce-in';
    modal.style.cssText =
        'background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:20px;padding:48px;text-align:center;max-width:380px;width:90%;box-shadow:0 0 80px rgba(34,197,94,.35)';
    modal.innerHTML = `
        <div style="font-size:3.5rem;margin-bottom:16px">✅</div>
        <h2 style="color:#fff;font-size:1.8rem;font-weight:900;margin-bottom:10px">Message Sent!</h2>
        <p style="color:rgba(255,255,255,.85);margin-bottom:24px">I'll get back to you as soon as possible.</p>
        <button onclick="closeSuccessMessage()"
                style="background:#fff;color:#16a34a;padding:12px 32px;border-radius:999px;font-weight:700;border:none;cursor:pointer;font-size:.95rem;">
          Close
        </button>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

function closeSuccessMessage() {
    const overlay = document.getElementById('success-overlay');
    if (overlay) overlay.remove();
}

// ── DOM READY ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

    // Terminal badge pills
    document.querySelectorAll('.term-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            const inp = document.getElementById('term-input');
            if (!inp) return;
            inp.value = badge.textContent.trim();
            inp.focus();
            termKeyDown({ key: 'Enter', preventDefault: () => {} });
        });
    });

    // Contact form (contact.html)
    const form = document.querySelector('form[name="contact"]');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            showSuccessMessage();
            form.reset();
        });
    }

    // About page — skill bar animation
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (bars.length) {
        const barObs = new IntersectionObserver(es => {
            es.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.width = e.target.dataset.width;
                    barObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        bars.forEach(bar => barObs.observe(bar));
    }
});

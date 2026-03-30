/* ══════════════════════════════════════════
   QuizMaster Pro — script.js
   ══════════════════════════════════════════ */

// ══════════════════════════════
//  QUESTION BANK
// ══════════════════════════════
const QB = {
  science: [
    { q: "What is the chemical symbol for Gold?",               opts: ["Au","Ag","Gd","Go"],                                                          ans: 0, diff: "easy" },
    { q: "How many bones are in the adult human body?",         opts: ["186","206","226","256"],                                                       ans: 1, diff: "easy" },
    { q: "Which planet has the most moons?",                    opts: ["Jupiter","Saturn","Uranus","Neptune"],                                         ans: 1, diff: "medium" },
    { q: "What is the speed of light in vacuum (approx.)?",     opts: ["3×10⁵ km/s","3×10⁸ m/s","3×10⁶ m/s","3×10⁴ km/s"],                          ans: 1, diff: "medium" },
    { q: "DNA stands for:",                                     opts: ["Deoxyribonucleic Acid","Diribonucleic Acid","Deoxyribose Nuclei Acid","Dezoxyribonucleic Acid"], ans: 0, diff: "easy" },
    { q: "What is the powerhouse of the cell?",                 opts: ["Nucleus","Ribosome","Mitochondria","Golgi Body"],                             ans: 2, diff: "easy" },
    { q: "Which element has atomic number 6?",                  opts: ["Nitrogen","Oxygen","Carbon","Helium"],                                        ans: 2, diff: "medium" },
    { q: "What is Newton's 2nd law expressed as?",              opts: ["F=mv","F=ma","E=mc²","P=mv"],                                                  ans: 1, diff: "hard" },
  ],
  tech: [
    { q: "What does 'HTML' stand for?",                         opts: ["Hyper Text Markup Language","High Tech Modern Language","Hyper Transfer Markup Link","Hyper Text Machine Language"], ans: 0, diff: "easy" },
    { q: "Which language is known as the 'mother of all languages'?", opts: ["Fortran","COBOL","C","Assembly"],                                       ans: 2, diff: "medium" },
    { q: "What does 'CPU' stand for?",                          opts: ["Central Processing Unit","Computer Personal Unit","Core Processor Unit","Control Processing Unit"], ans: 0, diff: "easy" },
    { q: "Who developed the Python programming language?",      opts: ["Google","Microsoft","Guido van Rossum (CWI)","Mozilla"],                       ans: 2, diff: "medium" },
    { q: "What is the binary representation of decimal 10?",    opts: ["1010","1001","1100","0110"],                                                   ans: 0, diff: "medium" },
    { q: "What does 'API' stand for?",                          opts: ["Automated Programming Interface","Application Programming Interface","Advanced Process Integration","Application Protocol Interface"], ans: 1, diff: "easy" },
    { q: "Which sorting algorithm has O(n log n) average time?",opts: ["Bubble Sort","Selection Sort","Merge Sort","Linear Search"],                  ans: 2, diff: "hard" },
    { q: "What does 'RAM' stand for?",                          opts: ["Read Access Memory","Random Access Memory","Rapid Application Memory","Readable Active Memory"], ans: 1, diff: "easy" },
  ],
  history: [
    { q: "In which year did World War II end?",                 opts: ["1943","1944","1945","1946"],                                                   ans: 2, diff: "easy" },
    { q: "Who was the first President of the United States?",   opts: ["John Adams","Thomas Jefferson","George Washington","James Madison"],           ans: 2, diff: "easy" },
    { q: "The Great Wall of China was built during which dynasty?", opts: ["Han Dynasty","Tang Dynasty","Ming Dynasty","Qing Dynasty"],               ans: 2, diff: "medium" },
    { q: "Who wrote 'The Communist Manifesto'?",                opts: ["Lenin & Stalin","Marx & Engels","Trotsky & Mao","Proudhon & Bakunin"],         ans: 1, diff: "medium" },
    { q: "In which year did the Berlin Wall fall?",             opts: ["1987","1988","1989","1990"],                                                   ans: 2, diff: "easy" },
    { q: "The Battle of Waterloo took place in which year?",    opts: ["1812","1815","1819","1821"],                                                   ans: 1, diff: "hard" },
    { q: "Who was the first person to walk on the moon?",       opts: ["Buzz Aldrin","Yuri Gagarin","Neil Armstrong","John Glenn"],                    ans: 2, diff: "easy" },
    { q: "The Renaissance period began in which country?",      opts: ["France","England","Germany","Italy"],                                         ans: 3, diff: "medium" },
  ],
  math: [
    { q: "What is the value of π (pi) to 2 decimal places?",   opts: ["3.12","3.14","3.16","3.18"],                                                   ans: 1, diff: "easy" },
    { q: "What is the square root of 144?",                     opts: ["11","12","13","14"],                                                           ans: 1, diff: "easy" },
    { q: "Triangle has angles 90°, 45°. What is the third?",    opts: ["30°","45°","60°","50°"],                                                       ans: 1, diff: "easy" },
    { q: "What is 15% of 200?",                                 opts: ["20","25","30","35"],                                                           ans: 2, diff: "easy" },
    { q: "Solve: 2x + 6 = 18. What is x?",                      opts: ["4","5","6","7"],                                                              ans: 2, diff: "medium" },
    { q: "What is the Fibonacci sequence after 8?",             opts: ["11","12","13","14"],                                                           ans: 2, diff: "medium" },
    { q: "What is the derivative of sin(x)?",                   opts: ["-cos(x)","cos(x)","-sin(x)","tan(x)"],                                        ans: 1, diff: "hard" },
    { q: "How many sides does a dodecagon have?",               opts: ["10","11","12","13"],                                                           ans: 2, diff: "medium" },
  ],
  geo: [
    { q: "What is the capital of Australia?",                   opts: ["Sydney","Melbourne","Brisbane","Canberra"],                                    ans: 3, diff: "medium" },
    { q: "Which is the largest country by area?",               opts: ["USA","China","Canada","Russia"],                                               ans: 3, diff: "easy" },
    { q: "Which river is the longest in the world?",            opts: ["Amazon","Mississippi","Nile","Yangtze"],                                       ans: 2, diff: "easy" },
    { q: "What is the smallest country in the world?",          opts: ["Monaco","San Marino","Vatican City","Liechtenstein"],                          ans: 2, diff: "medium" },
    { q: "Mount Everest is on the border of which two countries?", opts: ["India & Tibet","Nepal & Tibet","Nepal & India","China & Nepal"],            ans: 1, diff: "medium" },
    { q: "Which ocean is the largest?",                         opts: ["Atlantic","Indian","Arctic","Pacific"],                                        ans: 3, diff: "easy" },
    { q: "What is the capital of Pakistan?",                    opts: ["Karachi","Lahore","Rawalpindi","Islamabad"],                                   ans: 3, diff: "easy" },
    { q: "The Sahara Desert is located in which continent?",    opts: ["Asia","Australia","Africa","South America"],                                   ans: 2, diff: "easy" },
  ]
};

// Mixed = all questions combined
QB.mixed = Object.values(QB).flat();

// ══════════════════════════════
//  STATE
// ══════════════════════════════
let currentUser   = null;
let selectedAvatar = '🦊';
let selectedCat   = 'mixed';
let selectedDiff  = 'easy';
let questions     = [];
let qIndex        = 0;
let answers       = [];
let timerInterval = null;
let timeLeft      = 15;
let answered      = false;
let totalPoints   = 0;

const TIMER_SEC = 15;

// ══════════════════════════════
//  LOCAL STORAGE HELPERS
// ══════════════════════════════
function getUsers()       { return JSON.parse(localStorage.getItem('qm_users')  || '{}'); }
function saveUsers(u)     { localStorage.setItem('qm_users',  JSON.stringify(u)); }
function getStats()       { return JSON.parse(localStorage.getItem('qm_stats')  || '{}'); }
function saveStats(s)     { localStorage.setItem('qm_stats',  JSON.stringify(s)); }

// ══════════════════════════════
//  AUTH FUNCTIONS
// ══════════════════════════════
function doSignup() {
  const name  = document.getElementById('su_name').value.trim();
  const email = document.getElementById('su_email').value.trim().toLowerCase();
  const pass  = document.getElementById('su_pass').value;
  const err   = document.getElementById('su_err');

  if (!name || !email || pass.length < 6 || !email.includes('@')) {
    err.textContent = 'Please fill all fields. Password min 6 chars.';
    err.classList.add('show');
    return;
  }

  const users = getUsers();
  if (users[email]) {
    err.textContent = 'Account already exists. Please sign in.';
    err.classList.add('show');
    return;
  }

  users[email] = { name, pass, avatar: selectedAvatar };
  saveUsers(users);
  err.classList.remove('show');
  loginUser({ name, avatar: selectedAvatar, email });
  showToast('🎉 Account created! Welcome, ' + name + '!');
}

function doLogin() {
  const email = document.getElementById('li_email').value.trim().toLowerCase();
  const pass  = document.getElementById('li_pass').value;
  const err   = document.getElementById('li_err');
  const users = getUsers();

  if (!users[email] || users[email].pass !== pass) {
    err.classList.add('show');
    return;
  }

  err.classList.remove('show');
  loginUser({ ...users[email], email });
}

function demoLogin() {
  const users = getUsers();
  if (!users['demo@quiz.com']) {
    users['demo@quiz.com'] = { name: 'Demo Player', pass: 'demo123', avatar: '🎯' };
    saveUsers(users);
  }
  loginUser({ name: 'Demo Player', avatar: '🎯', email: 'demo@quiz.com' });
  showToast('👋 Logged in as Demo Player!');
}

function loginUser(user) {
  currentUser = user;
  localStorage.setItem('qm_session', JSON.stringify(user));
  updateHomeStats();
  showScreen('screenHome');
}

function logout() {
  currentUser = null;
  localStorage.removeItem('qm_session');
  showScreen('screenLogin');
}

function checkSession() {
  const s = localStorage.getItem('qm_session');
  if (s) {
    currentUser = JSON.parse(s);
    updateHomeStats();
    showScreen('screenHome');
  }
}

// ══════════════════════════════
//  HOME SCREEN
// ══════════════════════════════
function updateHomeStats() {
  if (!currentUser) return;
  document.getElementById('homeAvatar').textContent = currentUser.avatar || '🦊';
  document.getElementById('homeName').textContent   = 'Hey, ' + currentUser.name + ' 👋';

  const stats = getStats();
  const us    = stats[currentUser.email] || { played: 0, best: null, pts: 0 };
  document.getElementById('statPlayed').textContent = us.played;
  document.getElementById('statBest').textContent   = us.best !== null ? us.best + '%' : '—';
  document.getElementById('statPts').textContent    = us.pts;
}

function selectCat(el) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedCat = el.dataset.cat;
}

function selectDiff(el) {
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedDiff = el.dataset.diff;
}

// ══════════════════════════════
//  QUIZ ENGINE
// ══════════════════════════════
function startQuiz() {
  let pool = (QB[selectedCat] || QB.mixed).filter(q =>
    selectedDiff === 'easy'   ? true :
    selectedDiff === 'medium' ? q.diff !== 'easy' :
    q.diff === 'hard'
  );
  if (pool.length < 5) pool = QB[selectedCat] || QB.mixed;

  questions     = shuffle(pool).slice(0, 10);
  qIndex        = 0;
  answers       = [];
  totalPoints   = 0;

  buildProgressBar();
  loadQuestion();
  showScreen('screenQuiz');
}

function buildProgressBar() {
  const bar = document.getElementById('progressBar');
  bar.innerHTML = '';
  questions.forEach((_, i) => {
    const seg = document.createElement('div');
    seg.className = 'progress-seg' + (i === 0 ? ' active' : '');
    seg.id = 'seg' + i;
    bar.appendChild(seg);
  });
}

function loadQuestion() {
  answered = false;
  clearInterval(timerInterval);

  const q = questions[qIndex];

  document.getElementById('qCounter').textContent   = `Q ${qIndex + 1} / ${questions.length}`;
  document.getElementById('qCatLabel').textContent  = q.diff.toUpperCase();
  document.getElementById('questionNum').textContent = `QUESTION ${String(qIndex + 1).padStart(2, '0')}`;
  document.getElementById('questionText').textContent = q.q;

  // Reset feedback & next button
  const fb = document.getElementById('feedbackBar');
  fb.className = 'feedback-bar';
  document.getElementById('btnNext').classList.remove('show');

  // Build options
  const grid   = document.getElementById('optionsGrid');
  const labels = ['A', 'B', 'C', 'D'];
  grid.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-label">${labels[i]}</span><span>${opt}</span><span class="check-icon"></span>`;
    btn.onclick = () => selectAnswer(i, btn);
    grid.appendChild(btn);
  });

  // Start timer
  timeLeft = TIMER_SEC;
  updateTimerUI();
  timerInterval = setInterval(tickTimer, 1000);
}

function tickTimer() {
  timeLeft--;
  updateTimerUI();
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    handleTimeout();
  }
}

function updateTimerUI() {
  const fill = document.getElementById('timerFill');
  const num  = document.getElementById('timerNum');
  const pct  = (timeLeft / TIMER_SEC) * 100;

  fill.style.width = pct + '%';
  num.textContent  = timeLeft;

  fill.className = 'timer-fill' + (timeLeft <= 5 ? ' danger' : timeLeft <= 8 ? ' warn' : '');
  num.className  = 'timer-num'  + (timeLeft <= 5 ? ' danger' : timeLeft <= 8 ? ' warn' : '');
}

function selectAnswer(idx, btn) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const q     = questions[qIndex];
  const correct = idx === q.ans;
  const opts  = document.querySelectorAll('.option-btn');

  opts.forEach(o => (o.disabled = true));

  if (correct) {
    btn.classList.add('correct');
    btn.querySelector('.check-icon').textContent = '✓';
  } else {
    btn.classList.add('wrong');
    btn.querySelector('.check-icon').textContent = '✗';
    opts[q.ans].classList.add('correct-show');
    opts[q.ans].querySelector('.check-icon').textContent = '✓';
  }

  // Calculate points
  const multiplier = selectedDiff === 'hard' ? 30 : selectedDiff === 'medium' ? 20 : 10;
  const pts = correct ? multiplier * Math.ceil(timeLeft / TIMER_SEC * 1.5) : 0;

  answers.push({ q: q.q, chosen: idx, correct: q.ans, status: correct ? 'correct' : 'wrong', pts, opts: q.opts });
  totalPoints += pts;

  // Show feedback
  const fb = document.getElementById('feedbackBar');
  if (correct) {
    fb.textContent = `✓ Correct! +${pts} pts`;
    fb.className   = 'feedback-bar correct show';
    updateSegment(qIndex, 'correct');
  } else {
    fb.textContent = `✗ Wrong! Answer: ${q.opts[q.ans]}`;
    fb.className   = 'feedback-bar wrong show';
    updateSegment(qIndex, 'wrong');
  }

  document.getElementById('btnNext').classList.add('show');
}

function handleTimeout() {
  if (answered) return;
  answered = true;

  const q    = questions[qIndex];
  const opts = document.querySelectorAll('.option-btn');

  opts.forEach(o => (o.disabled = true));
  opts[q.ans].classList.add('correct-show');
  opts[q.ans].querySelector('.check-icon').textContent = '✓';

  answers.push({ q: q.q, chosen: -1, correct: q.ans, status: 'timeout', pts: 0, opts: q.opts });

  const fb = document.getElementById('feedbackBar');
  fb.textContent = `⏰ Time's up! Answer: ${q.opts[q.ans]}`;
  fb.className   = 'feedback-bar timeout show';

  updateSegment(qIndex, 'skipped');
  document.getElementById('btnNext').classList.add('show');
}

function updateSegment(i, cls) {
  const seg = document.getElementById('seg' + i);
  if (seg) { seg.className = 'progress-seg ' + cls; }
}

function nextQuestion() {
  qIndex++;
  if (qIndex >= questions.length) {
    showResults();
    return;
  }
  const seg = document.getElementById('seg' + qIndex);
  if (seg) seg.classList.add('active');
  loadQuestion();
}

// ══════════════════════════════
//  RESULTS
// ══════════════════════════════
function showResults() {
  clearInterval(timerInterval);

  const correct = answers.filter(a => a.status === 'correct').length;
  const wrong   = answers.filter(a => a.status === 'wrong').length;
  const timeout = answers.filter(a => a.status === 'timeout').length;
  const pct     = Math.round((correct / questions.length) * 100);

  // Animate score ring
  const circumference = 2 * Math.PI * 56;
  const ring = document.getElementById('ringFill');
  ring.style.strokeDasharray  = circumference;
  ring.style.strokeDashoffset = circumference;
  ring.style.stroke = pct >= 80 ? '#22d98a' : pct >= 50 ? '#7c6aff' : '#ff4d6a';
  setTimeout(() => { ring.style.strokeDashoffset = circumference * (1 - pct / 100); }, 200);

  document.getElementById('scorePct').textContent = pct + '%';

  // Title based on score
  let title, sub;
  if      (pct >= 90) { title = '🏆 Outstanding!';   sub = 'You aced it! Simply brilliant.'; }
  else if (pct >= 75) { title = '⭐ Excellent!';       sub = 'Great performance. Keep it up!'; }
  else if (pct >= 50) { title = '👍 Good Job!';        sub = 'Above average. Practice more!'; }
  else if (pct >= 30) { title = '📚 Keep Learning!';   sub = 'Review the topics and try again.'; }
  else                { title = '💪 Try Again!';        sub = 'Practice makes perfect!'; }

  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultSub').textContent   = sub;
  document.getElementById('rsCorrect').textContent   = correct;
  document.getElementById('rsWrong').textContent     = wrong;
  document.getElementById('rsTimeout').textContent   = timeout;

  // Review list
  const rl = document.getElementById('reviewList');
  rl.innerHTML = '';
  answers.forEach((a, i) => {
    const div      = document.createElement('div');
    div.className  = 'review-item ' + (a.status === 'correct' ? 'c' : a.status === 'wrong' ? 'w' : 't');
    const yourAns  = a.chosen >= 0 ? a.opts[a.chosen] : '—(Timeout)';
    const corrAns  = a.opts[a.correct];
    div.innerHTML  = `<div class="review-q">Q${i + 1}: ${a.q}</div>
      <div class="review-ans">
        ${a.status === 'correct'
          ? `<span class="correct-ans">✓ ${corrAns}</span>`
          : `<span class="your">✗ ${yourAns}</span> → <span class="correct-ans">✓ ${corrAns}</span>`}
      </div>`;
    rl.appendChild(div);
  });

  // Save stats & leaderboard
  if (currentUser) {
    const stats = getStats();
    const us    = stats[currentUser.email] || { played: 0, best: null, pts: 0 };
    us.played++;
    us.pts  = (us.pts || 0) + totalPoints;
    us.best = us.best === null ? pct : Math.max(us.best, pct);
    stats[currentUser.email] = us;

    const lb = JSON.parse(localStorage.getItem('qm_lb') || '[]');
    lb.push({ name: currentUser.name, avatar: currentUser.avatar || '🦊', score: pct, pts: totalPoints, date: Date.now() });
    lb.sort((a, b) => b.score - a.score || b.pts - a.pts);
    localStorage.setItem('qm_lb', JSON.stringify(lb.slice(0, 20)));

    saveStats(stats);
    updateHomeStats();
  }

  showScreen('screenResults');
  if (pct >= 70) launchConfetti();
  totalPoints = 0;
}

// ══════════════════════════════
//  LEADERBOARD
// ══════════════════════════════
function showLeaderboard() {
  const lb   = JSON.parse(localStorage.getItem('qm_lb') || '[]');
  const list = document.getElementById('lbList');
  list.innerHTML = '';

  if (lb.length === 0) {
    list.innerHTML = '<div style="color:var(--text2);text-align:center;padding:20px">No scores yet. Play to appear here!</div>';
  } else {
    lb.slice(0, 10).forEach((e, i) => {
      const div       = document.createElement('div');
      div.className   = 'lb-item';
      const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      const medal     = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
      div.innerHTML   = `
        <div class="lb-rank ${rankClass}">${medal || '#' + (i + 1)}</div>
        <div class="lb-avatar">${e.avatar || '🎯'}</div>
        <div class="lb-info">
          <div class="lb-name">${e.name}</div>
          <div class="lb-score">${e.score}% • ${e.pts} pts</div>
        </div>
        <div class="lb-pts">${e.pts}</div>`;
      list.appendChild(div);
    });
  }
  showScreen('screenLeaderboard');
}

// ══════════════════════════════
//  PDF DOWNLOAD
// ══════════════════════════════
function downloadPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    const correct = answers.filter(a => a.status === 'correct').length;
    const pct     = Math.round((correct / questions.length) * 100);

    // Header block
    doc.setFillColor(30, 30, 50);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22); doc.setFont('helvetica', 'bold');
    doc.text('QuizMaster Pro — Results Report', 105, 18, { align: 'center' });
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.text(`Player: ${currentUser?.name || 'Player'}  |  Date: ${new Date().toLocaleDateString()}  |  Score: ${pct}%`, 105, 30, { align: 'center' });
    doc.text(`Category: ${selectedCat.toUpperCase()}  |  Difficulty: ${selectedDiff.toUpperCase()}  |  Points: ${answers.reduce((s, a) => s + a.pts, 0)}`, 105, 38, { align: 'center' });

    // Summary boxes
    doc.setTextColor(30, 30, 50);
    const cC   = answers.filter(a => a.status === 'correct').length;
    const cW   = answers.filter(a => a.status === 'wrong').length;
    const cT   = answers.filter(a => a.status === 'timeout').length;
    const boxes = [
      { l: 'Correct', v: cC, c: [34, 217, 138] },
      { l: 'Wrong',   v: cW, c: [255, 77, 106] },
      { l: 'Timeout', v: cT, c: [255, 159, 67] },
      { l: 'Total Qs',v: questions.length, c: [124, 106, 255] }
    ];
    boxes.forEach((b, i) => {
      const x = 15 + i * 48;
      doc.setFillColor(...b.c);
      doc.roundedRect(x, 52, 44, 20, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16); doc.setFont('helvetica', 'bold');
      doc.text(String(b.v), x + 22, 63, { align: 'center' });
      doc.setFontSize(9);  doc.setFont('helvetica', 'normal');
      doc.text(b.l, x + 22, 70, { align: 'center' });
    });

    // Detailed review
    doc.setTextColor(30, 30, 50);
    let y = 82;
    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text('Detailed Review', 15, y);
    y += 8;

    answers.forEach((a, i) => {
      if (y > 265) { doc.addPage(); y = 20; }
      const isC = a.status === 'correct';
      const isT = a.status === 'timeout';
      doc.setFillColor(isC ? 240 : isT ? 255 : 255, isC ? 255 : isT ? 245 : 235, isC ? 245 : isT ? 230 : 230);
      const qLines = doc.splitTextToSize(`Q${i + 1}: ${a.q}`, 170);
      const boxH  = 10 + qLines.length * 5 + 6;
      doc.roundedRect(12, y, 186, boxH, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setTextColor(isC ? 20 : isT ? 180 : 200, isC ? 150 : isT ? 100 : 40, isC ? 80 : isT ? 20 : 20);
      doc.setFont('helvetica', 'bold');
      doc.text(qLines, 16, y + 6);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      const yourAns = a.chosen >= 0 ? `Your: ${a.opts[a.chosen]}` : 'Your: —(Timeout)';
      const corrAns = `Correct: ${a.opts[a.correct]}`;
      doc.text(`${yourAns}   |   ${corrAns}   |   Pts: ${a.pts}`, 16, y + boxH - 3);
      y += boxH + 4;
    });

    // Footer
    doc.setFillColor(30, 30, 50);
    doc.rect(0, 282, 210, 15, 'F');
    doc.setTextColor(180, 180, 200);
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text('Generated by QuizMaster Pro • Keep Learning, Keep Growing!', 105, 291, { align: 'center' });

    doc.save(`QuizMaster_${currentUser?.name || 'Player'}_${Date.now()}.pdf`);
    showToast('📄 PDF downloaded successfully!');
  } catch (e) {
    showToast('⚠️ PDF error: ' + e.message);
  }
}

// ══════════════════════════════
//  UTILITY FUNCTIONS
// ══════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function togglePass(id, el) {
  const inp = document.getElementById(id);
  inp.type  = inp.type === 'password' ? 'text' : 'password';
  el.textContent = inp.type === 'password' ? '👁' : '🙈';
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function launchConfetti() {
  const wrap   = document.getElementById('confettiWrap');
  wrap.innerHTML = '';
  const colors = ['#7c6aff', '#ff6a9b', '#6affcb', '#ffca6a', '#fff'];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % colors.length]};animation-duration:${1.5 + Math.random() * 2}s;animation-delay:${Math.random()}s;transform:rotate(${Math.random() * 360}deg);border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`;
    wrap.appendChild(p);
  }
  setTimeout(() => (wrap.innerHTML = ''), 4000);
}

// ══════════════════════════════
//  THEME TOGGLE
// ══════════════════════════════
document.getElementById('themeToggle').addEventListener('click', () => {
  const h      = document.documentElement;
  const isDark = h.getAttribute('data-theme') === 'dark';
  h.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeLabel').textContent = isDark ? 'Light' : 'Dark';
});

// ══════════════════════════════
//  AVATAR SELECTION
// ══════════════════════════════
document.getElementById('avatarRow').addEventListener('click', e => {
  const opt = e.target.closest('.avatar-opt');
  if (!opt) return;
  document.querySelectorAll('.avatar-opt').forEach(a => a.classList.remove('selected'));
  opt.classList.add('selected');
  selectedAvatar = opt.dataset.av;
});

// ══════════════════════════════
//  KEYBOARD SHORTCUTS
//  A/B/C/D or 1/2/3/4 = answer
//  Enter / Space       = next question
// ══════════════════════════════
document.addEventListener('keydown', e => {
  const screen = document.querySelector('.screen.active')?.id;
  if (screen === 'screenQuiz' && !answered) {
    const map = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
    const idx = map[e.key.toLowerCase()];
    if (idx !== undefined) {
      const btns = document.querySelectorAll('.option-btn');
      if (btns[idx]) btns[idx].click();
    }
  }
  if (screen === 'screenQuiz' && answered && (e.key === 'Enter' || e.key === ' ')) {
    nextQuestion();
  }
});

// ══════════════════════════════
//  INIT — check existing session
// ══════════════════════════════
checkSession();

let currentQ = 0;
let answers = Storage.loadAnswers() || {};

const progressFill = document.getElementById('progressFill');
const questionLabel = document.getElementById('questionLabel');
const sectionLabel = document.getElementById('sectionLabel');
const questionNum = document.getElementById('questionNum');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const hintText = document.getElementById('hintText');
const btnSuivant = document.getElementById('btnSuivant');
const btnPrecedent = document.getElementById('btnPrecedent');
const btnRetour = document.getElementById('btnRetour');
const questionContainer = document.getElementById('questionContainer');

function renderQuestion(index) {
  const q = QUESTIONS[index];
  const total = QUESTIONS.length;

  questionLabel.textContent = `Question ${index + 1} sur ${total}`;
  sectionLabel.textContent = q.section;
  questionNum.textContent = `QUESTION ${index + 1} / ${total}`;
  questionText.textContent = q.text;
  hintText.textContent = q.hint;

  const pct = ((index + 1) / total) * 100;
  progressFill.style.width = pct + '%';

  optionsList.innerHTML = '';
  q.options.forEach(function (opt) {
    const btn = document.createElement('button');
    btn.className = 'quiz-option' + (answers[q.id] === opt.value ? ' selected' : '');
    btn.dataset.value = opt.value;
    btn.innerHTML = `
      <span class="quiz-option-radio">
        <span class="quiz-option-radio-dot"></span>
      </span>
      <span class="quiz-option-text">${opt.label}</span>
    `;

    btn.addEventListener('click', function () {
      answers[q.id] = opt.value;
      Storage.saveAnswers(answers);
      document.querySelectorAll('.quiz-option').forEach(function (b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      updateNav();
    });

    optionsList.appendChild(btn);
  });

  updateNav();
}

function updateNav() {
  const q = QUESTIONS[currentQ];
  const answered = !!answers[q.id];

  if (answered) {
    btnSuivant.style.opacity = '1';
    btnSuivant.style.pointerEvents = 'auto';
  } else {
    btnSuivant.style.opacity = '0.4';
    btnSuivant.style.pointerEvents = 'none';
  }

  if (currentQ > 0) {
    btnPrecedent.style.opacity = '1';
    btnPrecedent.style.pointerEvents = 'auto';
  } else {
    btnPrecedent.style.opacity = '0.4';
    btnPrecedent.style.pointerEvents = 'none';
  }

  const isLast = currentQ === QUESTIONS.length - 1;
  btnSuivant.innerHTML = isLast
    ? 'Voir mes résultats <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
    : 'Suivant <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
}

function animateTransition(cb) {
  questionContainer.style.opacity = '0';
  questionContainer.style.transform = 'translateX(12px)';
  setTimeout(function () {
    cb();
    questionContainer.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    questionContainer.style.opacity = '1';
    questionContainer.style.transform = 'translateX(0)';
    setTimeout(function () {
      questionContainer.style.transition = '';
    }, 200);
  }, 120);
}

btnSuivant.addEventListener('click', function () {
  const isLast = currentQ === QUESTIONS.length - 1;

  if (isLast) {
    // Calcule le profil et redirige vers auth ou résultats
    buildProfile();
    const user = Storage.loadUser();
    if (user) {
      window.location.href = 'results.html';
    } else {
      window.location.href = 'auth.html?from=quiz';
    }
    return;
  }

  animateTransition(function () {
    currentQ++;
    renderQuestion(currentQ);
  });
});

btnPrecedent.addEventListener('click', function () {
  if (currentQ === 0) return;
  animateTransition(function () {
    currentQ--;
    renderQuestion(currentQ);
  });
});

btnRetour.addEventListener('click', function () {
  window.location.href = 'index.html';
});

function buildProfile() {
  const profile = {
    matieres: answers[1] || null,
    matiere_fav: answers[2] || null,
    niveau_maths: answers[3] || null,
    serie: answers[4] || null,
    environnement: answers[5] || null,
    secteur_ci: answers[6] || null,
    activite: answers[7] || null,
    reussite: answers[8] || null,
    modele: answers[9] || null,
    loisirs: answers[10] || null,
    budget: answers[11] || null,
    duree: answers[12] || null,
    mobilite: answers[13] || null,
    contrainte_fam: answers[14] || null,
    priorite: answers[15] || null,
    completedAt: Date.now()
  };

  Storage.saveProfile(profile);
}

renderQuestion(currentQ);
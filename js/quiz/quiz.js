// quiz.js — logique complète du quiz

const Quiz = {
    current: 0,
    answers: {},

    init() {
        this.answers = Storage.loadAnswers();
        this.render();
        this.bindNav();
    },

    render() {
        const q = QUESTIONS[this.current];
        const total = QUESTIONS.length;
        const section = SECTIONS[q.section];

        document.getElementById('questionLabel').textContent = `Question ${q.id} sur ${total}`;
        document.getElementById('sectionLabel').textContent = section.label;
        document.getElementById('questionNum').textContent = `QUESTION ${q.id} / ${total}`;
        document.getElementById('questionText').textContent = q.text;
        document.getElementById('hintText').textContent = section.hint;

        const progress = ((this.current + 1) / total) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        this.renderOptions(q);
        this.updateNav();

        const container = document.getElementById('questionContainer');
        container.classList.remove('question-enter');
        void container.offsetWidth;
        container.classList.add('question-enter');
    },

    renderOptions(q) {
        const list = document.getElementById('optionsList');
        const saved = this.answers[q.id];

        list.innerHTML = q.options.map(opt => `
            <button class="quiz-option ${saved === opt.value ? 'selected' : ''}"
                    data-value="${opt.value}">
                <span class="option-radio"></span>
                <span class="option-label">${opt.label}</span>
            </button>
        `).join('');

        list.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => this.selectOption(btn, q.id));
        });
    },

    selectOption(btn, questionId) {
        document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.answers[questionId] = btn.dataset.value;
        Storage.saveAnswers(this.answers);
        this.updateNav();
    },

    updateNav() {
        const q = QUESTIONS[this.current];
        const hasAnswer = !!this.answers[q.id];
        const isFirst = this.current === 0;
        const isLast = this.current === QUESTIONS.length - 1;

        const btnPrev = document.getElementById('btnPrecedent');
        const btnNext = document.getElementById('btnSuivant');

        btnPrev.style.opacity = isFirst ? '0.4' : '1';
        btnPrev.style.pointerEvents = isFirst ? 'none' : 'auto';

        btnNext.style.opacity = hasAnswer ? '1' : '0.4';
        btnNext.style.pointerEvents = hasAnswer ? 'auto' : 'none';

        if (isLast && hasAnswer) {
            btnNext.innerHTML = `Voir mes résultats <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;
        } else {
            btnNext.innerHTML = `Suivant <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
        }
    },

    bindNav() {
        document.getElementById('btnPrecedent').addEventListener('click', () => {
            if (this.current > 0) {
                this.current--;
                this.render();
            }
        });

        document.getElementById('btnSuivant').addEventListener('click', () => {
            if (this.current < QUESTIONS.length - 1) {
                this.current++;
                this.render();
            } else {
                window.location.href = 'results.html';
            }
        });

        document.getElementById('btnRetour').addEventListener('click', () => {
            if (this.current > 0) {
                this.current--;
                this.render();
            } else {
                window.location.href = 'index.html';
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Quiz.init());
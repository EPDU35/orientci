// results.js — affichage top 5 filières

const FILIERE_LABELS = {
    info_miage:           { nom: 'Informatique & MIAGE',       raison: 'Tes résultats en maths + goût pour la tech correspondent parfaitement.' },
    genie_civil:          { nom: 'Génie Civil / BTP',           raison: 'Fort en sciences appliquées, secteur porteur en CI.' },
    finance_compta:       { nom: 'Finance & Comptabilité',      raison: 'Intérêt pour la gestion + profil analytique solide.' },
    medecine:             { nom: 'Médecine & Santé',             raison: 'Bon niveau sciences mais durée d\'études élevée.' },
    marketing:            { nom: 'Marketing & Commerce',        raison: 'Intérêts compatibles, alternative solide.' },
    droit:                { nom: 'Droit & Sciences Juridiques', raison: 'Profil communicant et analytique, bons débouchés CI.' },
    telecom:              { nom: 'Télécommunications',           raison: 'Secteur en croissance : Orange CI, MTN, CITel.' },
    agronomie:            { nom: 'Agronomie & Agriculture',     raison: 'Secteur stratégique, emplois stables en CI.' },
    lettres_shes:         { nom: 'Lettres, SHS & Éducation',   raison: 'Profil littéraire affirmé, débouchés dans l\'enseignement.' },
    gestion_rh:           { nom: 'Gestion & Ressources Humaines', raison: 'Profil organisateur, demande en entreprise.' },
    architecture:         { nom: 'Architecture & Urbanisme',    raison: 'Mixte créativité + sciences, secteur BTP actif.' },
    pharmacie:            { nom: 'Pharmacie & Biologie',        raison: 'Sciences solides, marché en expansion.' },
    eco_dev:              { nom: 'Économie du Développement',   raison: 'Profil orienté impact et ONG, bourse possible.' },
    transport_logistique: { nom: 'Transport & Logistique',      raison: 'Port d\'Abidjan — secteur clé, formation courte possible.' },
    journalisme:          { nom: 'Journalisme & Communication', raison: 'Aisance rédactionnelle + intérêt médias.' }
};

const Results = {
    init() {
        const answers = Storage.loadAnswers();

        if (!answers || Object.keys(answers).length < 5) {
            this.showNoQuiz();
            return;
        }

        const top5 = Scoring.compute(answers);
        this.render(top5);
    },

    render(top5) {
        const list = document.getElementById('resultsList');

        if (!top5 || top5.length === 0) {
            list.style.display = 'none';
            document.getElementById('noResultsState').style.display = 'block';
            return;
        }

        list.innerHTML = top5.map((item, idx) => {
            const info = FILIERE_LABELS[item.id] || { nom: item.id, raison: '' };
            const isTop = idx === 0;

            return `
                <div class="result-card ${isTop ? 'top-rank' : ''}" style="animation: fadeInUp 0.3s ease both; animation-delay: ${idx * 0.07}s;">
                    <div class="rank-badge">${idx + 1}</div>
                    <div class="result-info">
                        <p class="result-name">${info.nom}</p>
                        <p class="result-reason">${info.raison}</p>
                        <div class="score-bar-track" style="margin-top: 10px;">
                            <div class="score-bar-fill" style="width: 0%;" data-target="${item.score}"></div>
                        </div>
                    </div>
                    <span class="result-score">${item.score}%</span>
                </div>
            `;
        }).join('');

        setTimeout(() => {
            document.querySelectorAll('.score-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.target + '%';
            });
        }, 200);

        const top = top5[0];
        const topInfo = FILIERE_LABELS[top.id];
        if (topInfo) {
            document.getElementById('topBadge').textContent = `Top filière : ${topInfo.nom} (${top.score}%)`;
        }
    },

    showNoQuiz() {
        document.getElementById('resultsList').innerHTML = `
            <div class="empty-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gris)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="currentColor"/>
                </svg>
                <p>Tu n'as pas encore répondu au quiz. Commence par là pour voir tes recommandations.</p>
                <button class="btn-primary" onclick="window.location.href='quiz.html'" style="padding: 13px 24px;">
                    Faire le quiz
                </button>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => Results.init());
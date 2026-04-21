// api.js — connecté au backend YAO (server.js port 3001)
// Route : POST http://localhost:3001/api/chat
// Body  : { message: string, profil: object }
// Resp  : { success: true, reponse: string }

const API = {
    BASE_URL: 'http://localhost:3001',

    // Mapping des valeurs quiz → labels lisibles pour le profil
    MATIERES_MAP: {
        maths_sciences: 'Mathématiques & Sciences',
        lettres_langues: 'Lettres & Langues',
        eco_gestion: 'Économie & Gestion',
        arts: 'Arts & Créativité',
        logique: 'Logique & Problèmes',
        analyse_textes: 'Analyse de textes',
        calcul_gestion: 'Calcul & Gestion',
        creativite: 'Créativité & Design',
        numerique_oui: 'Numérique & Code',
        numerique_quotidien: 'Outils numériques'
    },

    INTERETS_MAP: {
        interet_tech: 'Tech & Numérique',
        interet_finance: 'Finance & Commerce',
        interet_sante: 'Santé & Médecine',
        interet_btp: 'BTP & Génie Civil',
        env_entrepreneuriat: 'Entrepreneuriat',
        secteur_prive: 'Secteur privé',
        secteur_public: 'Fonction publique',
        secteur_ong: 'ONG & International',
        val_innovation: 'Innovation',
        val_impact: 'Impact social'
    },

    BUDGET_MAP: {
        budget_eleve: 2500000,
        budget_moyen: 800000,
        budget_faible: 300000,
        budget_bourse: 0
    },

    DUREE_MAP: {
        duree_2ans: 2,
        duree_3ans: 3,
        duree_5ans: 5,
        duree_long: 7
    },

    async ask(message, results) {
        const answers = Storage.loadAnswers();
        const profil = this.buildProfil(answers, results);

        try {
            const res = await fetch(this.BASE_URL + '/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message.trim(), profil })
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || `Erreur serveur (${res.status})`);
            }

            const data = await res.json();

            if (!data.success) throw new Error(data.error || 'Erreur inconnue');

            return data.reponse;

        } catch (err) {
            if (err.message.includes('fetch') || err.name === 'TypeError') {
                throw new Error('SERVER_DOWN');
            }
            throw err;
        }
    },

    // Construit le profil au format attendu par ai.service.js de YAO
    buildProfil(answers, results) {
        const vals = Object.values(answers);

        const matieres = vals
            .filter(v => this.MATIERES_MAP[v])
            .map(v => this.MATIERES_MAP[v]);

        const interets = vals
            .filter(v => this.INTERETS_MAP[v])
            .map(v => this.INTERETS_MAP[v]);

        const budgetVal = vals.find(v => this.BUDGET_MAP[v] !== undefined);
        const dureeVal  = vals.find(v => this.DUREE_MAP[v]);

        // Ville depuis la réponse mobilité
        let ville = 'Abidjan';
        if (answers[13] === 'mobilite_totale') ville = 'International';
        if (answers[13] === 'mobilite_ci') ville = 'Côte d\'Ivoire';

        // Top filière depuis les résultats
        const top = results && results[0] ? results[0].id.replace(/_/g, ' ') : null;

        return {
            matieres_preferees: matieres.length ? matieres : ['Non renseignées'],
            interets: interets.length ? interets : ['Non renseignés'],
            budget_annuel_fcfa: budgetVal !== undefined ? this.BUDGET_MAP[budgetVal] : null,
            ville_souhaitee: ville,
            duree_max_annees: dureeVal ? this.DUREE_MAP[dureeVal] : null,
            filiere_recommandee: top
        };
    }
};
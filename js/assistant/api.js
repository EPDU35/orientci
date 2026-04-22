// api.js — connecté au backend YAO
// Tout tourne sur le même port (3001) — server.js sert le frontend ET le backend

const API = {
    BASE_URL: '',

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

    FILIERE_LABELS: {
        info_miage: 'Informatique & MIAGE',
        genie_civil: 'Génie Civil / BTP',
        finance_compta: 'Finance & Comptabilité',
        medecine: 'Médecine & Santé',
        marketing: 'Marketing & Commerce',
        droit: 'Droit & Sciences Juridiques',
        telecom: 'Télécommunications',
        agronomie: 'Agronomie',
        lettres_shes: 'Lettres, SHS & Éducation',
        gestion_rh: 'Gestion & Ressources Humaines',
        architecture: 'Architecture & Urbanisme',
        pharmacie: 'Pharmacie & Biologie',
        eco_dev: 'Économie du Développement',
        transport_logistique: 'Transport & Logistique',
        journalisme: 'Journalisme & Communication'
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
                throw new Error(err.error || 'Erreur serveur (' + res.status + ')');
            }

            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Erreur inconnue');
            return data.reponse;

        } catch (err) {
            if (err.name === 'TypeError' || err.message.includes('fetch')) {
                throw new Error('SERVER_DOWN');
            }
            throw err;
        }
    },

    buildProfil(answers, results) {
        const vals = Object.values(answers || {});

        const matieres = vals.filter(v => this.MATIERES_MAP[v]).map(v => this.MATIERES_MAP[v]);
        const interets = vals.filter(v => this.INTERETS_MAP[v]).map(v => this.INTERETS_MAP[v]);

        const budgetVal = vals.find(v => this.BUDGET_MAP[v] !== undefined);
        const dureeVal  = vals.find(v => this.DUREE_MAP[v]);

        let ville = 'Abidjan';
        if (answers[13] === 'mobilite_totale') ville = 'International';
        if (answers[13] === 'mobilite_ci')     ville = "Côte d'Ivoire";

        const topId = results && results[0] ? results[0].id : null;
        const filiere = topId ? (this.FILIERE_LABELS[topId] || topId) : null;

        return {
            matieres_preferees: matieres.length ? matieres : ['Non renseignées'],
            interets: interets.length ? interets : ['Non renseignés'],
            budget_annuel_fcfa: budgetVal !== undefined ? this.BUDGET_MAP[budgetVal] : null,
            ville_souhaitee: ville,
            duree_max_annees: dureeVal ? this.DUREE_MAP[dureeVal] : null,
            filiere_recommandee: filiere
        };
    }
};
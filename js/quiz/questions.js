const SECTIONS = {
    1: { label: 'Matières · Section 1/3', hint: 'Tes matières et ton niveau scolaire pèsent fortement dans ton orientation.' },
    2: { label: 'Intérêts · Section 2/3', hint: 'Tes préférences et ton profil influencent ton futur métier.' },
    3: { label: 'Contraintes · Section 3/3', hint: 'Tes réalités (budget, famille, mobilité) comptent dans les choix.' }
};

const QUESTIONS = [

    // =========================
    // SECTION 1 — MATIÈRES
    // =========================
    {
        id: 1,
        section: 1,
        text: "Quelle est ta série ou orientation actuelle au lycée ?",
        options: [
            { label: "Série C ou D (scientifique)", value: "serie_science" },
            { label: "Série A (littéraire)", value: "serie_litteraire" },
            { label: "Série G (économie/gestion)", value: "serie_gestion" },
            { label: "Autre / Technique", value: "serie_autre" }
        ]
    },
    {
        id: 2,
        section: 1,
        text: "Dans quelles matières es-tu vraiment fort ?",
        options: [
            { label: "Maths / Physique", value: "fort_science" },
            { label: "Français / Philosophie", value: "fort_lettres" },
            { label: "Comptabilité / Économie", value: "fort_gestion" },
            { label: "Je suis moyen partout", value: "fort_moyen" }
        ]
    },
    {
        id: 3,
        section: 1,
        text: "Quel type de travail scolaire préfères-tu ?",
        options: [
            { label: "Résoudre des exercices et calculs", value: "type_calcul" },
            { label: "Rédiger et analyser des textes", value: "type_redaction" },
            { label: "Faire des études de cas / business", value: "type_business" },
            { label: "Créer ou manipuler (dessin, technique)", value: "type_pratique" }
        ]
    },
    {
        id: 4,
        section: 1,
        text: "Ton niveau en informatique aujourd’hui ?",
        options: [
            { label: "Je sais déjà coder ou je suis très à l’aise", value: "info_avance" },
            { label: "Je sais utiliser un ordinateur correctement", value: "info_moyen" },
            { label: "Je me débrouille avec difficulté", value: "info_faible" },
            { label: "Je n’ai presque pas accès à un ordinateur", value: "info_limite" }
        ]
    },
    {
        id: 5,
        section: 1,
        text: "Ton niveau général à l’école est :",
        options: [
            { label: "Excellent (top classe)", value: "niveau_excellent" },
            { label: "Bon", value: "niveau_bon" },
            { label: "Moyen", value: "niveau_moyen" },
            { label: "Difficile", value: "niveau_faible" }
        ]
    },

    // =========================
    // SECTION 2 — INTÉRÊTS
    // =========================
    {
        id: 6,
        section: 2,
        text: "Quel domaine t’attire le plus en Côte d’Ivoire ?",
        options: [
            { label: "Informatique / Télécom / IA", value: "interet_tech" },
            { label: "Finance / Banque / Comptabilité", value: "interet_finance" },
            { label: "Santé / Médecine / Pharmacie", value: "interet_sante" },
            { label: "BTP / Génie civil / Industrie", value: "interet_btp" }
        ]
    },
    {
        id: 7,
        section: 2,
        text: "Quel type de travail te correspond le plus ?",
        options: [
            { label: "Bureau avec ordinateur", value: "travail_bureau" },
            { label: "Terrain / chantier / déplacement", value: "travail_terrain" },
            { label: "Avec des personnes (patients, clients)", value: "travail_social" },
            { label: "Créer mon propre business", value: "travail_business" }
        ]
    },
    {
        id: 8,
        section: 2,
        text: "Pourquoi veux-tu travailler ?",
        options: [
            { label: "Gagner beaucoup d’argent", value: "motivation_argent" },
            { label: "Aider les autres", value: "motivation_social" },
            { label: "Créer et innover", value: "motivation_innovation" },
            { label: "Avoir stabilité et respect", value: "motivation_stable" }
        ]
    },
    {
        id: 9,
        section: 2,
        text: "Quel type de structure te correspond ?",
        options: [
            { label: "Grande entreprise privée (banques, Orange, MTN)", value: "structure_prive" },
            { label: "Fonction publique (État)", value: "structure_public" },
            { label: "Mon entreprise personnelle", value: "structure_entrepreneur" },
            { label: "ONG / international", value: "structure_ong" }
        ]
    },
    {
        id: 10,
        section: 2,
        text: "Ton profil dominant est :",
        options: [
            { label: "Analytique (chiffres, logique)", value: "profil_analytique" },
            { label: "Communicant (parler, convaincre)", value: "profil_communication" },
            { label: "Créatif (idées, design)", value: "profil_creatif" },
            { label: "Organisé (planifier, gérer)", value: "profil_organisation" }
        ]
    },

    // =========================
    // SECTION 3 — CONTRAINTES
    // =========================
    {
        id: 11,
        section: 3,
        text: "Quel type d’établissement peux-tu viser ?",
        options: [
            { label: "Grandes écoles privées (ESATIC, ESG, etc.)", value: "ecole_prive" },
            { label: "Universités publiques (UFHB, etc.)", value: "ecole_public" },
            { label: "BTS / formations courtes", value: "ecole_bts" },
            { label: "Je cherche surtout une bourse", value: "ecole_bourse" }
        ]
    },
    {
        id: 12,
        section: 3,
        text: "Combien d’années d’études es-tu prêt à faire ?",
        options: [
            { label: "2 ans (BTS)", value: "duree_courte" },
            { label: "3 ans (Licence)", value: "duree_moyenne" },
            { label: "5 ans (Master / Ingénieur)", value: "duree_longue" },
            { label: "Très long (Médecine)", value: "duree_tres_longue" }
        ]
    },
    {
        id: 13,
        section: 3,
        text: "Es-tu prêt à quitter ta ville ?",
        options: [
            { label: "Oui, même à l’étranger", value: "mobilite_internationale" },
            { label: "Oui, en Côte d’Ivoire", value: "mobilite_nationale" },
            { label: "Je préfère Abidjan", value: "mobilite_abidjan" },
            { label: "Non", value: "mobilite_limitee" }
        ]
    },
    {
        id: 14,
        section: 3,
        text: "Quelle influence ta famille a sur ton choix ?",
        options: [
            { label: "Je décide seul", value: "famille_libre" },
            { label: "Ils me conseillent", value: "famille_conseille" },
            { label: "Ils imposent un domaine", value: "famille_impose" },
            { label: "Je dois suivre leurs moyens financiers", value: "famille_budget" }
        ]
    },
    {
        id: 15,
        section: 3,
        text: "Ton objectif à long terme ?",
        options: [
            { label: "Cadre dans une grande entreprise", value: "objectif_cadre" },
            { label: "Créer une entreprise", value: "objectif_business" },
            { label: "Devenir expert reconnu", value: "objectif_expert" },
            { label: "Partir à l’étranger", value: "objectif_international" }
        ]
    }
];
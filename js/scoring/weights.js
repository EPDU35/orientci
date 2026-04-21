// weights.js — pondérations et mapping réponses → filières

// Filières disponibles
const FILIERES_IDS = [
    'info_miage',
    'genie_civil',
    'finance_compta',
    'medecine',
    'marketing',
    'droit',
    'telecom',
    'agronomie',
    'lettres_shes',
    'gestion_rh',
    'architecture',
    'pharmacie',
    'eco_dev',
    'transport_logistique',
    'journalisme'
];

// Score par réponse, par filière
// Format: { valeur_reponse: { filiere_id: points } }
const SCORE_MAP = {
    // Matières
    'maths_sciences':    { info_miage: 8, genie_civil: 8, medecine: 7, telecom: 8, architecture: 6, pharmacie: 6 },
    'lettres_langues':   { lettres_shes: 9, droit: 8, journalisme: 8, marketing: 5 },
    'eco_gestion':       { finance_compta: 9, marketing: 8, gestion_rh: 7, eco_dev: 7, transport_logistique: 6 },
    'arts':              { architecture: 8, journalisme: 6, marketing: 5 },

    'maths_excellent':   { info_miage: 6, genie_civil: 6, telecom: 5, medecine: 5, pharmacie: 4 },
    'maths_bon':         { info_miage: 4, genie_civil: 4, finance_compta: 4, telecom: 4 },
    'maths_moyen':       { marketing: 2, gestion_rh: 2, lettres_shes: 2, journalisme: 2 },
    'maths_faible':      { lettres_shes: 3, droit: 3, journalisme: 3, gestion_rh: 2 },

    'francais_tres_bon': { droit: 5, lettres_shes: 5, journalisme: 6, marketing: 3 },
    'francais_correct':  { droit: 3, marketing: 3, gestion_rh: 3 },
    'francais_passable': { info_miage: 1, genie_civil: 1 },
    'francais_difficile':{},

    'logique':           { info_miage: 6, genie_civil: 5, finance_compta: 4, telecom: 5 },
    'analyse_textes':    { droit: 6, lettres_shes: 6, journalisme: 5 },
    'calcul_gestion':    { finance_compta: 6, gestion_rh: 4, eco_dev: 4, transport_logistique: 4 },
    'creativite':        { architecture: 7, journalisme: 5, marketing: 6 },

    'numerique_oui':     { info_miage: 8, telecom: 7, journalisme: 3, marketing: 3 },
    'numerique_quotidien':{ info_miage: 4, telecom: 4, finance_compta: 3 },
    'numerique_peu':     { gestion_rh: 2, lettres_shes: 2 },
    'numerique_non':     { medecine: 1, agronomie: 1, genie_civil: 1 },

    // Intérêts
    'interet_tech':      { info_miage: 9, telecom: 8, genie_civil: 4 },
    'interet_finance':   { finance_compta: 9, marketing: 7, eco_dev: 6, gestion_rh: 5, transport_logistique: 5 },
    'interet_sante':     { medecine: 10, pharmacie: 8 },
    'interet_btp':       { genie_civil: 9, architecture: 8 },

    'env_bureau':        { finance_compta: 5, info_miage: 5, gestion_rh: 5, droit: 5 },
    'env_terrain':       { genie_civil: 6, agronomie: 6, transport_logistique: 5 },
    'env_hopital':       { medecine: 8, pharmacie: 7 },
    'env_entrepreneuriat':{ marketing: 5, eco_dev: 5, gestion_rh: 4 },

    'val_salaire':       { medecine: 5, finance_compta: 5, info_miage: 5, telecom: 5 },
    'val_impact':        { medecine: 5, agronomie: 4, eco_dev: 4, lettres_shes: 3 },
    'val_innovation':    { info_miage: 5, telecom: 5, architecture: 4 },
    'val_prestige':      { droit: 5, medecine: 4, architecture: 4 },

    'secteur_prive':     { info_miage: 4, finance_compta: 5, telecom: 5, marketing: 4 },
    'secteur_public':    { droit: 4, eco_dev: 3, lettres_shes: 3 },
    'secteur_entrepreneuriat':{ marketing: 5, eco_dev: 4, gestion_rh: 3 },
    'secteur_ong':       { eco_dev: 5, lettres_shes: 4, agronomie: 4 },

    'profil_analytique': { info_miage: 5, finance_compta: 5, telecom: 4 },
    'profil_communicant':{ marketing: 6, gestion_rh: 5, journalisme: 5, droit: 4 },
    'profil_creatif':    { architecture: 6, journalisme: 5, marketing: 4 },
    'profil_organisateur':{ gestion_rh: 5, transport_logistique: 4, finance_compta: 4 },

    // Contraintes
    'budget_eleve':      { medecine: 3, architecture: 3, info_miage: 2, droit: 2 },
    'budget_moyen':      { info_miage: 2, finance_compta: 2, gestion_rh: 2, lettres_shes: 2 },
    'budget_faible':     { transport_logistique: 3, agronomie: 3, lettres_shes: 2 },
    'budget_bourse':     { eco_dev: 3, agronomie: 3, lettres_shes: 2 },

    'duree_2ans':        { transport_logistique: 4, gestion_rh: 3, finance_compta: 2 },
    'duree_3ans':        { info_miage: 2, marketing: 2, finance_compta: 2, lettres_shes: 2 },
    'duree_5ans':        { info_miage: 3, genie_civil: 3, telecom: 3, droit: 3 },
    'duree_long':        { medecine: 5, pharmacie: 4, droit: 3 },

    'mobilite_totale':   { medecine: 2, info_miage: 2, genie_civil: 2 },
    'mobilite_ci':       { genie_civil: 1, agronomie: 2, eco_dev: 1 },
    'mobilite_abidjan':  { finance_compta: 2, info_miage: 2, marketing: 2, telecom: 2 },
    'mobilite_non':      { gestion_rh: 1, transport_logistique: 1 },

    'famille_libre':     {},
    'famille_medecine_droit': { medecine: 3, droit: 3 },
    'famille_ingenieur': { genie_civil: 3, info_miage: 3, telecom: 3 },
    'famille_decide':    {},

    'obj_cadre':         { finance_compta: 3, info_miage: 3, gestion_rh: 3 },
    'obj_entrepreneur':  { marketing: 4, eco_dev: 3, gestion_rh: 3 },
    'obj_expert':        { medecine: 3, droit: 3, info_miage: 3, telecom: 3 },
    'obj_diaspora':      { info_miage: 2, medecine: 2, genie_civil: 2 }
};

// Score max théorique par filière (pour normaliser en %)
const MAX_SCORES = {
    info_miage: 70, genie_civil: 55, finance_compta: 65, medecine: 70,
    marketing: 55, droit: 50, telecom: 60, agronomie: 45, lettres_shes: 55,
    gestion_rh: 50, architecture: 60, pharmacie: 45, eco_dev: 45,
    transport_logistique: 40, journalisme: 50
};
// services/ai.service.js (VERSION MODIFIÉE)
// Utilise le nouveau service claude.js

const claudeService = require("./claude");
const config = require("../config/env");

const MODE_DEMO = `Désolé, l'assistant IA est temporairement indisponible. ` +
    `Le quiz, le scoring et le catalogue fonctionnent normalement. ` +
    `Configure la clé ANTHROPIC_API_KEY pour activer l'assistant.`;

const buildSystemPrompt = (profil) => {
    const matieres = profil.matieres_preferees?.join(", ") || "non renseignées";
    const interets = profil.interets?.join(", ") || "non renseignés";
    const budget = profil.budget_annuel_fcfa || "non renseigné";
    const ville = profil.ville_souhaitee || "non renseignée";
    const duree = profil.duree_max_annees || "non renseignée";
    const filiere = profil.filiere_recommandee || "non déterminée";

    return `Tu es OrientCI, un assistant d'orientation scolaire spécialisé pour la Côte d'Ivoire.
Tu aides les lycéens à comprendre leurs résultats et à prendre de bonnes décisions.

Profil de l'utilisateur :
- Filière recommandée : ${filiere}
- Matières préférées : ${matieres}
- Intérêts : ${interets}
- Budget annuel : ${budget} FCFA
- Ville souhaitée : ${ville}
- Durée max d'études : ${duree} ans

Règles strictes :
- Réponds UNIQUEMENT en français, tutoiement obligatoire.
- Maximum 3 paragraphes courts par réponse.
- Cite des établissements ivoiriens réels : UFHB, INP-HB, ESATIC, INGESUP, HEC Abidjan, ENAM.
- Utilise les salaires en FCFA (ex: 250 000 – 800 000 XOF/mois).
- Tu n'inventes pas de recommandations — le moteur de scoring s'en charge.
- Reste ancré dans la réalité du marché ivoirien.`;
};

const sendMessage = async (message, profil = {}) => {
    // Vérifier si l'API est disponible
    if (!config.ANTHROPIC_API_KEY) {
        return MODE_DEMO;
    }

    try {
        // Construire le prompt système avec le profil
        const systemPrompt = buildSystemPrompt(profil);
        
        // Utiliser le service Claude centralisé
        const response = await claudeService.sendMessage(message, systemPrompt);
        
        return response;
        
    } catch (error) {
        console.error("❌ Erreur lors de l'appel à Claude:", error.message);
        
        // En cas d'erreur, retourner un message d'erreur gracieux
        return "Désolé, une erreur s'est produite. L'assistant est temporairement indisponible. " +
               "Le reste du site fonctionne normalement.";
    }
};

module.exports = { sendMessage };
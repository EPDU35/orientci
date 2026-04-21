const config = require("../config/env");

const sendMessage = async (message, profil = {}) => {
    //  SI AUCUNE  CLÉ API TROUVER
    if (!config.ANTHROPIC_API_KEY) {
        return "Désolé, l'assistant IA est temporairement indisponible (clé API manquante). " +
               "Le reste du site (quiz, scoring, résultats, catalogue) fonctionne normalement. " +
               "Tu peux continuer à utiliser OrientCI sans problème.";
    }

    //   (avec clé)
    // Construction du prompt système 
    const systemPrompt = `Tu es OrientCI, un assistant d'orientation scolaire spécialisé dans le contexte ivoirien. Tu aides les lycéens à choisir leur filière.

Voici le profil de l'utilisateur :
- Matières préférées : ${profil.matieres_preferees ? profil.matieres_preferees.join(", ") : "non renseignées"}
- Intérêts : ${profil.interets ? profil.interets.join(", ") : "non renseignés"}
- Budget annuel : ${profil.budget_annuel_fcfa || "non renseigné"} FCFA
- Ville souhaitée : ${profil.ville_souhaitee || "non renseignée"}
- Durée maximale : ${profil.duree_max_annees || "non renseignée"} ans

Tu réponds UNIQUEMENT en français. 
Tu ne génères pas les recommandations de filières (c'est le moteur de scoring). 
Tes réponses font maximum 3 paragraphes.
Tes réponses tiennent compte du marché de l'emploi ivoirien, des établissements comme l'UFHB, l'INP-HB, l'ESATIC, et des salaires en FCFA.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": config.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 500,
            system: systemPrompt,
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        })
    });

    if (!response.ok) {
        throw new Error(`Erreur API Claude (${response.status})`);
    }

    const data = await response.json();
    return data.content[0].text;
};

module.exports = { sendMessage };
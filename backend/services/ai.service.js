const Anthropic = require("@anthropic-ai/sdk");
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
    if (!config.ANTHROPIC_API_KEY) {
        return MODE_DEMO;
    }

    const client = new Anthropic({ apiKey: config.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: buildSystemPrompt(profil),
        messages: [{ role: "user", content: message }]
    });

    return response.content[0].text;
};

module.exports = { sendMessage };
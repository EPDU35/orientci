// api.js — appel au backend Node.js proxy Claude

const API = {
    ENDPOINT: '/api/ai/chat',

    async ask(message, results) {
        const context = this.buildContext(results);

        try {
            const res = await fetch(this.ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, context })
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            return data.reply || 'Réponse non disponible.';
        } catch (err) {
            throw err;
        }
    },

    buildContext(results) {
        if (!results || results.length === 0) {
            return 'L\'utilisateur n\'a pas encore complété le quiz d\'orientation.';
        }

        const labels = {
            info_miage: 'Informatique & MIAGE', genie_civil: 'Génie Civil / BTP',
            finance_compta: 'Finance & Comptabilité', medecine: 'Médecine & Santé',
            marketing: 'Marketing & Commerce', droit: 'Droit & Sciences Juridiques',
            telecom: 'Télécommunications', agronomie: 'Agronomie',
            lettres_shes: 'Lettres, SHS & Éducation', gestion_rh: 'Gestion & Ressources Humaines',
            architecture: 'Architecture & Urbanisme', pharmacie: 'Pharmacie & Biologie',
            eco_dev: 'Économie du Développement', transport_logistique: 'Transport & Logistique',
            journalisme: 'Journalisme & Communication'
        };

        const top = results.map((r, i) => `${i+1}. ${labels[r.id] || r.id} (${r.score}%)`).join(', ');
        return `Profil utilisateur : Top 5 filières recommandées = ${top}. Contexte : marché ivoirien, Côte d'Ivoire.`;
    }
};
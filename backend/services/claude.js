// services/claude.js
// Wrapper pour l'API Claude (Anthropic SDK)
// Ce fichier centralise toutes les interactions avec l'API Claude

const Anthropic = require("@anthropic-ai/sdk");
const config = require("../config/env");

class ClaudeService {
    constructor() {
        // Initialiser le client Anthropic seulement si la clé API est présente
        if (config.ANTHROPIC_API_KEY) {
            this.client = new Anthropic({
                apiKey: config.ANTHROPIC_API_KEY
            });
        } else {
            this.client = null;
            console.warn(" ClaudeService : API key manquante, mode démo activé");
        }
    }

    /**
     * Vérifie si l'API Claude est disponible
     * @returns {boolean}
     */
    isAvailable() {
        return this.client !== null;
    }

    /**
     * Envoie un message à Claude et retourne la réponse
     * @param {string} message - Le message utilisateur
     * @param {string} systemPrompt - Le prompt système pour contextualiser
     * @param {object} options - Options additionnelles (model, maxTokens)
     * @returns {Promise<string>} - La réponse de Claude
     */
    async sendMessage(message, systemPrompt, options = {}) {
        if (!this.client) {
            throw new Error("API Claude non disponible - clé API manquante");
        }

        try {
            const response = await this.client.messages.create({
                model: options.model || "claude-haiku-4-5-20251001",
                max_tokens: options.maxTokens || 500,
                system: systemPrompt,
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            });

            // Extraire le texte de la réponse
            return response.content[0].text;

        } catch (error) {
            console.error(" Erreur API Claude:", error.message);
            throw error;
        }
    }

    /**
     * Envoie un message avec plusieurs tours de conversation
     * @param {Array} messages - Tableau de messages [{role: "user"|"assistant", content: "..."}]
     * @param {string} systemPrompt - Le prompt système
     * @param {object} options - Options additionnelles
     * @returns {Promise<string>} - La réponse de Claude
     */
    async sendConversation(messages, systemPrompt, options = {}) {
        if (!this.client) {
            throw new Error("API Claude non disponible - clé API manquante");
        }

        try {
            const response = await this.client.messages.create({
                model: options.model || "claude-haiku-4-5-20251001",
                max_tokens: options.maxTokens || 500,
                system: systemPrompt,
                messages: messages
            });

            return response.content[0].text;

        } catch (error) {
            console.error("Erreur API Claude (conversation):", error.message);
            throw error;
        }
    }
}

// Exporter une instance unique (singleton)
module.exports = new ClaudeService();
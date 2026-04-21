require("dotenv").config();

const config = {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || null,
    PORT: parseInt(process.env.PORT) || 3001,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5500"
};

console.log("Config chargée — port:", config.PORT);

if (!config.ANTHROPIC_API_KEY) {
    console.warn("ANTHROPIC_API_KEY manquante → assistant IA désactivé, reste du site OK");
}

module.exports = config;
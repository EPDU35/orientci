require("dotenv").config();

module.exports = {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,   
    PORT: process.env.PORT || 3001,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5500"
};

console.log(" Config chargée");
if (!process.env.ANTHROPIC_API_KEY) {
    console.log("  Pas de clé ANTHROPIC_API_KEY → Assistant IA désactivé (mode démo OK)");
}
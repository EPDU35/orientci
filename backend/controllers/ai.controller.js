const aiService = require("../services/ai.service");

const handleChat = async (req, res, next) => {
    try {
        // Protection contre req.body undefined
        const { message, profil = {} } = req.body || {};

        // Validation renforcée
        if (!message || typeof message !== "string" || message.trim() === "") {
            return res.status(400).json({
                success: false,
                error: "Le message est obligatoire et ne peut pas être vide."
            });
        }

        const reponse = await aiService.sendMessage(message, profil);

        res.json({
            success: true,
            reponse: reponse
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { handleChat };
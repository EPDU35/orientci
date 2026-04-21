const aiService = require("../services/ai.service");

const handleChat = async (req, res, next) => {
    try {
        const { message, profil = {} } = req.body || {};

        if (!message || typeof message !== "string" || message.trim() === "") {
            return res.status(400).json({
                success: false,
                error: "Le message est obligatoire et ne peut pas être vide."
            });
        }

        const reponse = await aiService.sendMessage(message.trim(), profil);

        res.json({ success: true, reponse });

    } catch (error) {
        next(error);
    }
};

module.exports = { handleChat };
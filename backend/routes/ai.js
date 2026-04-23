// routes/ai.js
// Route simplifiée pour l'assistant IA
// Ce fichier est utilisé à la place de ai.routes.js

const express = require("express");
const aiController = require("../controllers/ai.controller");

const router = express.Router();

// POST /api/chat - Envoyer un message à l'assistant
router.post("/chat", aiController.handleChat);

module.exports = router;
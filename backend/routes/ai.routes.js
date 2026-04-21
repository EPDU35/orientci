const express = require("express");
const aiController = require("../controllers/ai.controller");

const router = express.Router();

// Route principale pour le chat IA
router.post("/chat", aiController.handleChat);

module.exports = router;
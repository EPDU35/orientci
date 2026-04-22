const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Lire les fichiers JSON
const readJSON = (filename) => {
    const filepath = path.join(__dirname, "../../data", filename);
    if (!fs.existsSync(filepath)) {
        return [];
    }
    const content = fs.readFileSync(filepath, "utf-8");
    return content.trim() ? JSON.parse(content) : [];
};

router.get("/metiers", (req, res) => {
    try {
        const data = readJSON("metiers.json");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur lecture métiers" });
    }
});

router.get("/filieres", (req, res) => {
    try {
        const data = readJSON("filieres.json");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur lecture filières" });
    }
});

router.get("/ecoles", (req, res) => {
    try {
        const data = readJSON("ecoles.json");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur lecture écoles" });
    }
});

module.exports = router;
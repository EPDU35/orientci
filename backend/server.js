const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config/env");
const aiRoutes = require("./routes/ai.routes");
const errorHandler = require("./errorHandler");

const app = express();

app.use(cors({
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Sert le frontend (dossier parent)
app.use(express.static(path.join(__dirname, "..")));

app.use("/api", aiRoutes);

app.get("/test", (req, res) => {
    res.json({ status: "ok", ia: !!config.ANTHROPIC_API_KEY });
});

// Toutes les routes inconnues → index.html (SPA)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.use(errorHandler);

app.listen(config.PORT, () => {
    console.log("Serveur OrientCI lancé → http://localhost:" + config.PORT);
});
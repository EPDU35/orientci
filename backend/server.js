const express = require("express");
const cors = require("cors");
const config = require("./config/env");
const aiRoutes = require("./routes/ai.routes");
const errorHandler = require("./errorHandler"); 

const app = express();

app.use(cors({ origin: config.FRONTEND_URL }));

app.use(express.json());

app.use("/api", aiRoutes);

app.get("/test", (req, res) => res.json({ status: "ok ca fonctionne" }));

app.use(errorHandler);
    
app.listen(config.PORT, () => {
    console.log("Le Serveur est lancé sur le port " + config.PORT);
});
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend Delaine.Makeup está online."
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Delaine.Makeup a funcionar na porta ${PORT}`);
});
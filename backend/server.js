const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste do servidor
app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW() AS current_time");

        res.json({
            success: true,
            message: "Backend Delaine.Makeup está online.",
            database: "connected",
            time: result.rows[0].current_time
        });
    } catch (error) {
        console.error("Erro ao ligar à base de dados:", error);

        res.status(500).json({
            success: false,
            message: "Backend online, mas não foi possível ligar à base de dados."
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Delaine.Makeup a funcionar na porta ${PORT}`);
});
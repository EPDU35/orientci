const errorHandler = (err, req, res, next) => {
    console.error("Erreur serveur :", err.message || err);

    const status = err.status || 500;
    const message = err.message || "Une erreur interne est survenue";

    res.status(status).json({
        success: false,
        error: message
    });
};

module.exports = errorHandler;
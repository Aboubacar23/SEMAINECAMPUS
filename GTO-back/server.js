const app = require("./app");
const { sequelize } =  require("./src/models");

const PORT =   process.env.PORT || 5000;


sequelize.sync().then(() => {
    console.log("Base de données synchronisée !");
    app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
})
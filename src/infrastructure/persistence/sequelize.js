const { Sequelize } = require("sequelize");
const modelDefiners = require("./models");

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    retry: {
        max: 5
    }
});

for (const modelDefiner of modelDefiners) modelDefiner(sequelize);
let { models } = sequelize;
for (const modelName of Object.keys(models)) if (models[modelName]['associate']) models[modelName]['associate'](models);

module.exports = sequelize;
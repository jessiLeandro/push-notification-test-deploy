const models = require("./models");
const Sequelize = require("sequelize");

let sequelize = null;

if (process.env.DATABASE_URL_1) {
  sequelize = new Sequelize(process.env.DATABASE_URL_1, {
    dialect: "postgres",
    define: {
      freezeTableName: true
    }
  });

  const modelInstances = models.map(model => model(sequelize));
  modelInstances.forEach(
    modelInstance =>
      modelInstance.associate && modelInstance.associate(sequelize.models)
  );

  sequelize.sync({ force: true });
} else {
  sequelize = new Sequelize({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    dialect: "postgres",
    // operatorsAliases: false,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      freezeTableName: true,
      paranoid: true
    }
  });

  const modelInstances = models.map(model => model(sequelize));
  modelInstances.forEach(
    modelInstance =>
      modelInstance.associate && modelInstance.associate(sequelize.models)
  );
}

module.exports = sequelize;

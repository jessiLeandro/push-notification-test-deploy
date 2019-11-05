const Sequelize = require("sequelize");

module.exports = sequelize => {
  const subscribe = sequelize.define("subscribe", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },

    endpoint: {
      type: Sequelize.TEXT,
      allowNull: false
    },

    expirationTime: {
      type: Sequelize.STRING
    },

    p256dh: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    auth: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });

  return subscribe;
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    const subscribe = queryInterface.createTable("subscribe", {
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
        allowNull: false
      },

      auth: {
        type: Sequelize.STRING,
        allowNull: false
      },

      createdAt: {
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },

      updatedAt: {
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },

      deletedAt: {
        defaultValue: null,
        type: Sequelize.DATE
      }
    });

    return subscribe;
  },
  down: queryInterface => queryInterface.dropTable("subscribe")
};

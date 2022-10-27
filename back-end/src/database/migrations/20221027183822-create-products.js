"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.VARCHAR,
        unique: true,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      url_image: {
        allowNull: false,
        type: Sequelize.VARCHAR,
        defaultValue: "",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
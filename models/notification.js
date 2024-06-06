"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Subscription extends Model {
    
  }
  Subscription.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      subscriptionId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      subscriptionNetwork: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expired: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "Subscriptions",
      tableName: "SUBSCRIPTIONS",
      timestamps: true,
    }
  );
  return Subscription;
};

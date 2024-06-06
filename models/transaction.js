"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class TransactionDetails extends Model {}
  TransactionDetails.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assetId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      senderAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recieverAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fee: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transactionStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "Transactions",
      tableName: "TRANSACTIONS",
      timestamps: true,
    }
  );
  return TransactionDetails;
};

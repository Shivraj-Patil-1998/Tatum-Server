// "use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class TatumWallet extends Model {
    
  }
  TatumWallet.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      assetId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      privateKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      walletId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available: {
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
      modelName: "TatumWallets",
      tableName: "TATUM_WALLET",
      timestamps: true,
    }
  );
  return TatumWallet;
};

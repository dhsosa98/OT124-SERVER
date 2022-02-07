"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Slides extends Model {
    static associate(models) {
      Slides.belongsTo(models.organization);
    }
  }
  Slides.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "slides",
      tableName: "slides",
      timestamps: true,
      paranoid: true
    }
  );
  return Slides;
};

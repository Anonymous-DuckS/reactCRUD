const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Game extends Model {}

  Game.init({
    // Model attributes are defined here
    game_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    game_Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Venue_ID: {
      type: DataTypes.INTEGER,

      references: {
          model: 'venue',
          key: 'id'
      },
      allowNull: false
    }

  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Game' // We need to choose the model name
  });

  // the defined model is the class itself
  console.log(Game === sequelize.models.Game); // true

}
const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Game_Account extends Model {}

  Game_Account.init({
    // Model attributes are defined here
    user_ID: {
        type: DataTypes.INTEGER,
        
        references: {
            model: 'Users',
            key: 'user_Id'
        },
        allowNull: false,
        primaryKey: true
    },
    game_ID: {
        type: DataTypes.INTEGER,
        
        references: {
            model: 'Games',
            key: 'game_Id'
        },
        allowNull: false,
        primaryKey: true
    },
    game_Played: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      primaryKey: true,
      defaultValue: 0
    },
    account_Credit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pay_Date: {
        type: DataTypes.DATE,
        allowNull: false
    }

  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Game_Account' // We need to choose the model name
  });

  // the defined model is the class itself
  console.log(Game_Account === sequelize.models.Game_Account); // true
  return Game_Account;

}
const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class User extends Model {}

  User.init({
    // Model attributes are defined here
    user_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_Pwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_Type: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    }

  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

  // the defined model is the class itself
  console.log(User === sequelize.models.User); // true
  return User;
}

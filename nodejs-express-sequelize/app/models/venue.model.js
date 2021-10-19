const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

module.exports = (sequelize, Sequelize) => {
  class Venue extends Model {}

  Venue.init({
    // Model attributes are defined here
    venue_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    venue_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    venue_Cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }

  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Venue' // We need to choose the model name
  });

  // the defined model is the class itself
  console.log(Venue === sequelize.models.Venue); // true

}
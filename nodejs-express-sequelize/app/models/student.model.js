const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

module.exports = (sequelize, Sequelize) => {
  class Student extends Model {}

  Student.init({
    // Model attributes are defined here
    student_ID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false
    }

  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Student' // We need to choose the model name
  });

  // the defined model is the class itself
  console.log(Student === sequelize.models.Student); // true

}

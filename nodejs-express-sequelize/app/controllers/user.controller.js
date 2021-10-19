const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_Name) {
    res.status(400).send({
      message: "Content can not be empty!" + req.body.user_Name
    });
    return;
  }

  // Create a User
  const User = {
    user_Name: req.body.user_Name,
    user_Pwd: req.body.user_Pwd ? req.body.user_Pwd : false,
    user_Type: req.body.user_Type
  };

  // Save User in the database
  User.create(User)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const user_ID = req.query.user_ID;
    var condition = user_ID ? { user_ID: { [Op.like]: `%${user_ID}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
};

// Find a single User with an user_ID
exports.findOne = (req, res) => {
    const user_ID = req.params.user_ID;

    User.findByPk(user_ID)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with user_ID=${user_ID}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with user_ID=" + user_ID
        });
      });
};

// Update a User by the user_ID in the request
exports.update = (req, res) => {
    const user_ID = req.params.user_ID;

    User.update(req.body, {
      where: { user_ID: user_ID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with user_ID=${user_ID}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with user_ID=" + user_ID
        });
      });
};

// Delete a User with the specified user_ID in the request
exports.delete = (req, res) => {
    const user_ID = req.params.user_ID;

    User.destroy({
      where: { user_ID: user_ID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with user_ID=${user_ID}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with user_ID=" + user_ID
        });
      });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Users."
          });
        });
};

/*
// Find all user_Pwd Users
exports.findAlluser_Pwd = (req, res) => {
    User.findAll({ where: { user_Pwd: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
*/
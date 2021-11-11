module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Student
    router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);
  
    // Retrieve a single Student with id
    router.get("/:user_ID", users.findOne);
  
    // Update a Student with id
    router.put("/:user_ID", users.update);
  
    // Delete a Student with id
    router.delete("/:user_ID", users.delete);
  
    // Delete all users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };
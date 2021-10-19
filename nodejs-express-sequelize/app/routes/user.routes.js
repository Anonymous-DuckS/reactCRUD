module.exports = app => {
    const Users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Student
    router.post("/", Users.create);
  
    // Retrieve all Users
    router.get("/", Users.findAll);
  
    //-------------------------------------
    // Retrieve all published Users
    //router.get("/published", Users.findAllPublished);
    //-------------------------------------


    // Retrieve a single Student with id
    router.get("/:user_ID", Users.findOne);
  
    // Update a Student with id
    router.put("/:user_ID", Users.update);
  
    // Delete a Student with id
    router.delete("/:user_ID", Users.delete);
  
    // Delete all Users
    router.delete("/", Users.deleteAll);
  
    app.use('/api/Users', router);
  };
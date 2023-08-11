var express = require('express');
var Users = require("../controller/User.controller.js");


var userRouter = new express.Router();
var User = new Users();

// Create a new User
userRouter.post('/create',User.Create);


module.exports = userRouter;
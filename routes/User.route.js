var express = require('express');
var Users = require("../controller/User.controller.js");


var userRouter = new express.Router();
var User = new Users();

// Create a new User
userRouter.post('/create',User.Create);
userRouter.post('/login',User.login);
userRouter.get('/getUser/:token',User.GetUser);
userRouter.post('/updateSettings',User.UpdateSettings);


module.exports = userRouter;
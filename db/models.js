var mongoose = require('mongoose')
var {userSchema} = require('../schema/User')

var Users = mongoose.model('Users',userSchema);

module.exports = {
    Users
}
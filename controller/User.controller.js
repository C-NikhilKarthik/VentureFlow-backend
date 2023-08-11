var bcrypt = require('bcrypt')
var { uniqueEmail } = require('../Utils/user.utils')
var { Users } = require('../db/models');
const { MongoDriverError } = require('mongodb');
class User {
    async Create(req, res) { 

        console.log(req.body)
        const { userName, password, DOB, email } = req.body.data;
    
        try {
            if (uniqueEmail(email)) {
                let Password = await bcrypt.hash(password,10);

                const newUser = await Users.create({
                    password: Password,
                    Username: userName,
                    DOB: DOB,
                    Email: email
                })


                res.status(201).json({
                    flag: true,
                    status: "Success",
                    message: "Successfully created a new User",
                    body:{newUser}
                });

                return;
            }
            else{
                return res.status(409).json({
                    flag: false,
                    status: "OK",
                    message: "User already exists"
                });
            }
        }
        catch (err) { 
            console.log(err);
        }
    }
}

module.exports = User;
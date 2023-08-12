var bcrypt = require('bcrypt')
var { uniqueEmail } = require('../Utils/user.utils')
require('dotenv').config()
const jwt = require("jsonwebtoken");
var { Users } = require('../db/models');
const { MongoDriverError } = require('mongodb');
class User {
    async Create(req, res) {

        const { userName, password, DOB, email } = req.body.data;

        try {
            if (uniqueEmail(email)) {
                let Password = await bcrypt.hash(password, 10);

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
                    body: { newUser }
                });

                return;
            }
            else {
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

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await Users.findOne({ Email: email });
            console.log(user)
            if (!user) {
                return res.status(401).send('Invalid email');
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(401).send('Invalid password');
            }
            const mysecretkey = process.env.SECRET_CODE;
            const payload = {
                Username: user.Username,
                Email: user.Email,
                password: user.password,
            };
            const token = jwt.sign(payload, mysecretkey, { expiresIn: '5d' });
            res.status(200).json({
                flag: true,
                status: "Success",
                message: "Successfully Logged In",
                body: { token }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async GetUser(req, res) {
        const { token } = req.params;
        try{
            const mysecretkey = process.env.SECRET_CODE;
            const decoded = jwt.verify(token, mysecretkey);
            console.log(decoded);
            const email = decoded.Email
            const user = await Users.findOne({ Email: email});
            res.status(200).json({
                flag: true,
                status: "Success",
                message: "Data retrieved",
                body: { user }
            });
        }catch (err){
            console.log(err);
        }
    }

    async UpdateSettings(req, res){
        const { settings,email } = req.body;
        try{
            const result = await Users.findOneAndUpdate({Email:email},{
                settings
            })

            res.status(200).json({
                status: "success",
                message: "Successfully updated the details",
                body:{result}
            });
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = User;
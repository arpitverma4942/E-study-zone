const express = require('express')
const Admin = require('../models/Admin')
const routes = express.Router();

const jwt = require('jsonwebtoken')
routes.post('/adminregister', async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await Admin.findOne({ email: email })
        if (data) {
            return res.json({ msg: "Duplicate Email" })
        }
        const user = await new Admin(req.body);
        user.save()
        res.json({ msg: "Admin registered Successfully" })
    }
    catch (er) {
        console.log(er);
        res.json({ msg: "Sorry try again" })

    }
})


//for login

routes.post('/adminlogin', async (req, res) => {
    try {
        const { email, password } = req.body
        const isExist = await Admin.findOne({ email: email })
        if (!isExist) {
            return res.json({ msg: "Data Not matched" })
        }
        if (isExist.password == password) {
            const token = jwt.sign({ id: isExist._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.json({
                msg: "Login Successfully", data: {
                    token: token,
                    email: isExist.email,
                    id: isExist._id,
                    role: "admin"


                }
            })
        } else {
            res.json({ msg: "Incorrect Password" });
        }
    }
    catch (er) {
        console.log("Sorry try again");
        res.json({ msg: "Sorry try again" })

    }



})

routes.post('/changepassword', async (req, res) => {
    try {
        const { userId, oldPassword, newPassword, confirmPassword } = req.body;

        // check confirm password
        if (newPassword !== confirmPassword) {
            return res.json({ msg: "New password and confirm password do not match" });
        }

        // find user
        const user = await Admin.findById(userId)
        if (!user) {
            return res.json({ msg: "User not found" });
        }

        // check old password 
        if (user.password !== oldPassword) {
            return res.json({ msg: "Old password is incorrect" });
        }

        // update password
        user.password = confirmPassword;
        await user.save();

        res.json({ msg: "Password changed successfully" });
    } catch (er) {
        console.log(er);
        res.json({ msg: "Server error" });
    }
});

module.exports = routes
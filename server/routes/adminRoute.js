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

// ================= NEW ADMIN DASHBOARD STATS ROUTE =================
routes.get("/dashboard-stats", async (req, res) => {
  try {
  
    const totalUsers = await User.countDocuments();

    const totalLearners = await User.countDocuments({ role: "Learner" });

    
    const totalTrainers = await User.countDocuments({ role: "Trainer" });

   
    const totalSkills = await Skill.countDocuments();

    res.json({
      msg: "Stats fetched successfully",
      data: {
        totalUsers,
        totalLearners,
        totalTrainers,
        totalSkills
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while fetching stats" });
  }
});



// ================= GET ALL USERS (With Search & Filter) =================
routes.get("/users", async (req, res) => {
  try {
    const { search, role } = req.query;
    const query = {};

 
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    
    if (role) {
      query.role = role;
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    
    res.json({ msg: "Users fetched successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while fetching users" });
  }
});

// ================= DELETE USER =================
routes.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while deleting user" });
  }
});
// ================= GET ALL CONTENT (With Search) =================
routes.get("/content", async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};

    // अगर सर्च कर रहे हैं तो पहले Skills collection में ढूंढो
    if (search) {
      const matchedSkills = await Skill.find({ 
        skill: { $regex: search, $options: "i" } 
      }).select('_id');

      const skillIds = matchedSkills.map(s => s._id);
      
      // अगर कोई स्किल मैच नहीं हुई तो empty array भेज दो
      if (skillIds.length === 0) {
        return res.json({ msg: "Content fetched successfully", data: [] });
      }

      // जो स्किल्स मैच हुईं, उनके आधार पर Content निकालो
      query.skillId = { $in: skillIds };
    }

    const contentData = await Content.find(query)
      .populate('skillId', 'skill description') // Skill का नाम और description लाओ
      .populate('userId', 'name email')         // Trainer का नाम और email लाओ
      .sort({ createdAt: -1 });

    res.json({ msg: "Content fetched successfully", data: contentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while fetching content" });
  }
});

// ================= DELETE CONTENT =================
routes.delete("/content/:id", async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    
    if (!deletedContent) {
      return res.status(404).json({ msg: "Content not found" });
    }
    
    res.json({ msg: "Content deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while deleting content" });
  }
});

module.exports = routes
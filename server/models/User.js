
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    picture: {
        type: String
    },
    skills: {
        type: String
    },
    role: {
        type: String,
        enum: ["Trainer", "Learner"],
        default: "Learner"
    }

},

    { timestamps: true }
)
module.exports=mongoose.model("User",userSchema)
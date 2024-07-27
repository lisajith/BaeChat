const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, minlength: 3, maxlength: 99},
        email: {type: String, required: true, minlength: 3, maxlength: 199, unique: true},
        password: {type: String, required: true, minlength: 3, maxlength: 999},
    },
    {
        timestamps : true,
    }
);

const userModel = mongoose.model("User", userSchema)

module.exports = userModel
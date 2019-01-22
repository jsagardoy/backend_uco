const mongoose = require("mongoose");

const loginSchema = mongoose.Schema(
    {
        user: String,
        password: String,
        rol: String,
    }
)

module.exports = mongoose.model('users', loginSchema, 'users');
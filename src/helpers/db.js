const config = require('../../config.json');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/ucoDB',{
    useCreateIndex: true,
    useNewUrlParser: true
  });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.schema')
};
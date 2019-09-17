const config = require('../../config.json');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://user:12345@cluster0-ohrxc.mongodb.net/ucoDB?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true
  });

/* mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/ucoDB',{
    useCreateIndex: true,
    useNewUrlParser: true
  }); */
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.schema')
};
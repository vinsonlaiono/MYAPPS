const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restfulTask', { useNewUrlParser: true });
var UserSchema = new mongoose.Schema({
    access_token: {type: String},
    first_name: { type: String, required: [true, 'Task title length must be greater than 2'], minlength: 2 },
    last_name: { type: String, required: [true, 'Description title length must be greater than 2'], minlength: 2 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    jobs: []
}, { timestamps: true });
mongoose.model('User', UserSchema);
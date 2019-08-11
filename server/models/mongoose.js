const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restfulTask', { useNewUrlParser: true });
var JobSchema = new mongoose.Schema({
    job_search_source: { type : String },
    job_id : { type : String },
    status : { type : String },

})

var UserSchema = new mongoose.Schema({
    full_name: { type: String, required: [true, 'Task title length must be greater than 2'], minlength: 2 },
    avatar_url : {type: String},
    location : { type: String},
    job_title: { type :  String },
    email: { type: String, required: true },
    access_token: { type: String, required: true },
    jobs: [JobSchema]
}, { timestamps: true });

mongoose.model('User', UserSchema);
mongoose.model('Job', JobSchema);
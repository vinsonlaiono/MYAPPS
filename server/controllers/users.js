const User = require('../models/UserSchema')

module.exports = {
    'getAllUsers' : function(req, res){
        User.findAll()
        .then(users => {
            console.log("All users:", JSON.stringify(users, null, 4));
            res.json({users})
        })
        .catch( err => {
            console.log("Something went wrong: ", JSON.stringify(err, null, 4));
            res.json({err})
        })
    },
    'createNewUser' : function(req, res){
        user = new User()
        user.first_name = req.body['first_name']
        user.last_name = req.body['last_name']
        user.email = req.body['email']
        user.password = req.body['password']
    
        user.save()
        .then( user => {
            res.json({ 
                "message": "successfully created a new User", 
                "user" : user 
            })
        })
        .catch( err => {
            console.log("error")
        })
    }
}
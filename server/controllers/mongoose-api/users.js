const mongoose = require('mongoose')
const User = mongoose.model('User')


module.exports = {
    'getAllUsers' : function(req, res){
        User.find()
        .then(users => {
            console.log("All users:", JSON.stringify(users, null, 4));
            res.json({users})
        })
        .catch( err => {
            console.log("Something went wrong: ", JSON.stringify(err, null, 4));
            res.json({err})
        })
    },
    'getOneUser': function(req, res){
        User.findById(req.params.id, (err, user) => {
            if(err){
                console.log({'message': 'Error', 'err':err})
                res.json({'message': 'Error', 'err':err})
            } else {
                console.log({'message': 'Success', 'user':user})
                res.json({'message': 'Success', 'user':user})
            }
        })
    },
    'deletOneUser' : function(req, res){
        User.deleteOne({id: req.params.id}, (err, user) => {
            console.log(err)
            console.log(user)
            res.json({"message": "Success", 'user':user})
        })
    },
    'createNewUser' : function(req, res){               // Create a new user in the mongodb create session data

        if(req.session.user_id){
            console.log("Session exist")
        } else {
            console.log("need to create a user")
        }

        acc_token = req.params.acc_token;
        console.log(`Access_token: ${acc_token}`);        
        console.log(`Post data for user: ${req.body}`);        
        
        res.json({
            'message': 'Creating a new user:'
        })
        
    }
}
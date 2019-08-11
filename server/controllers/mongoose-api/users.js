const User = require('../../models/mongoose')


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
    'createNewUser' : function(req, res){               // Create a new user in the mongodb create session data
        acc_token = req.params.acc_token;
        console.log(`Access_token: ${acc_token}`);        
        console.log(`Post data for user: ${req.body}`);        
        
        res.json({
            'message': 'Creating a new user:'
        })
        
    }
}
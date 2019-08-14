const axios = require('axios')
const ENV = require('../config/env')


const mongoose = require('mongoose'),
      User = mongoose.model('User'),
      passport = require('passport'),
      jwt = require('jsonwebtoken');
      url = require('url')

const client_id = ENV.client_id
const client_secret = ENV.secret

// PASSPORT MIDDLEWARE

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "durantula";
passport.use(new JwtStrategy(opts, (jwt_payload, next) => {
    User.findOne({id: jwt_payload._id}, (err, user) => {
        if (err) {
            return next(err, false);
        }
        if (user) {
            return next(null, user);
        } else {
            return next(null, false);
        }
    })
}))

module.exports = {
    'authenticate' : function(req, res){
        console.log("*****************************************************************************************************************");

        console.log("Request Object from Github OATH: ", req.url);
        console.log("Request Object from Github OATH: ", req.url);
        console.log("URL code from Github OATH: ", req.query.code);
        let code = req.query.code;
        let url = 'https://github.com/login/oauth/access_token';
        let params = {
            'client_id':client_id,
            'client_secret': client_secret,
            'code': code
        }
        console.log("Post request URL: ", url);
        console.log("Post request parameters: ",params);
        let headers = {
            headers : {
                'Accept': 'application/json'
            }
        }
        axios({
            method: 'post',
            url: url,
            params: params,
            headers:headers.headers,
        })
        .then((response) => {
            console.log("ACCESS TOKEN FOR USER: " + response.data['access_token'])
            const access_token = response.data.access_token;
            // res.redirect('/apps/profile/'+access_token)     // this redirects to profilepage with access token
            let headers ={
                'Authorization' : `token ${access_token}`
            }
            axios({
                method: 'get',
                url: 'https://api.github.com/user',
                headers: headers
            })
            .then( user => {
                // create user in database
                console.log("Creating a new user", user.data);

                let newUser = new User();
                newUser.full_name = user.data.name;
                newUser.avatar_url = user.data.avatar_url;
                newUser.access_token = access_token;
                newUser.save()
                .then(user=> {
                    console.log("Session ID of the current user logged in: ", req.session.user_id)
                    console.log("NewUser created: ", newUser);
                    var payload = { id: user.id };
                    var token = jwt.sign(payload, opts.secretOrKey, { expiresIn: 604800 });
                    req.session.user_id = newUser._id;
                    req.session.jwt_token = token;
                    console.log({ 
                        "Message": "Successfully created a new Account", 
                        "User": user, 
                        "token": token  
                    });

                    // res.redirect(`/apps/profile/${newUser._id}`);   // redirect to reoute to create a user
                    res.redirect(`/apps/profile/${newUser._id}/${token}`);   // redirect to reoute to create a user
                })
                .catch(err=> console.log(err))

                

            })
            .catch( err => {
                //something went wrong with get user data
                console.log("Something went wrong with creating a new user", err)
                res.redirect(`/apps/profile/${access_token}`);   // redirect to reoute to create a user
            })
        })
        .catch(err => {
            console.log(err)
        });
    },
    'authenticateUser': function(req, res){
        if(req.session.user_id){
            User.findById(req.session.user_id)
            .then( user => {
                console.log(user)
                res.json({'message':'Success', 'user' : user})
            })
            .catch( err => {
                res.json({ 'message' : 'Error', 'err' : err})
            })
        } else {
            res.json({ 'message' : 'Error', 'err' : 'No User has been Authenticated'})
        }
    }, 
    'secret' : function(req, res){
        res.json({
            Authorized: true,
            Status: "Token Successfully used",
            message: "Success! You can not see this without a token"
        });
    }

}
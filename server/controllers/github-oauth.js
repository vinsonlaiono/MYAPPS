const axios = require('axios')
const client_id = 'a303fa5e19523e6c9c0b'
const client_secret = '0682cb5e68c2836d7a25f96d51676c1777d58aba'

module.exports = {
    'authenticate' : function(req, res){
        console.log("******************************************************************************************************************");

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
            res.redirect('/apps/profile/'+access_token)
        
        })
        .catch(err => {
            console.log(err)
        });
    }
}
const error = require('../utils/errors');

const check = {
    own: function(req,role){
        return decodeHeader(req,role);
    }
}

function getToken(auth,role){
    if(!auth){
        throw error("Error in Credentials",403);
    }
    console.log({
        role
    })
    if(auth.indexOf(role) === -1){
        throw error('user is not available',401);
    }
    return true;
}

function decodeHeader(req,role){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization,role);
    // return token;
}
module.exports = {
    check
}

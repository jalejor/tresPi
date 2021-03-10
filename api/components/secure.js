const auth = require('../../auth');

module.exports = function checkAuth(action){
    function middleware(req,res,next){
        switch(action){
            case 'admin':
                auth.check.own(req,'admin');
                next();
            break;

            case 'customer':
                auth.check.own(req,'customer');
                next();
            break;

            default:
                next();
        }
    }

    return middleware;
}
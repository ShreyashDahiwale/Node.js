const {validateToken} = require('../services/authentication');

function checkForAuthentication(tokenValue){
    return (req, res, next) => {
        const token = req.cookies[tokenValue] || null;   
        if(!token) {
            return next();
        }
        try {
            const decoded = validateToken(token);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json({error: 'Invalid token'});
        }
        return next();
    };
}

module.exports = {
    checkForAuthentication
}
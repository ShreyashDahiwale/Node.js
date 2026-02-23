const jwt = require('jsonwebtoken');

const secretKey = "Ju$tC0de@4321";


function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        profileImageURL: user.profileImageURL
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}


function validateToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = {
    generateToken,
    validateToken
}
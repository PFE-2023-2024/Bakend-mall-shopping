const jwt = require('jsonwebtoken');

function authentificate(req, res, next) {
    const authHeader = req.headers('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized, Access Denied' });
    }
    
    try {
        const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decodedToken.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized, Access Denied' });
    }
};

module.exports = authentificate
const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            success: false,
            msg: "Access denied. Token not provided."
        });
    }

    try {

        const bearer = token.split(' ');
        const bearerToken = bearer[1];

        const decodedData = jwt.verify(bearerToken, process.env.ACCESS_SECRET_TOKEN);

        req.user = decodedData.user;
        
    } 
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid token. Please provide a valid token for authentication.'
        });
    }

    return next();

};

module.exports = verifyToken;
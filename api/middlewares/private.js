const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = async (req, res, next) => {
    // Compatibility: token accepted from cookie, custom header, or Authorization header.
    let token = req.cookies.token || req.headers['x-access-token'] || req.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token){
        return res.status(401).json('token_not_found');
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
               req.decoded = decoded;

                // Sliding session: issue a fresh token on every valid request
                // and return it in the Authorization response header.
                const expiresIn = 24 * 60 * 60; // 24h
                const newToken = jwt.sign(
                    {
                        user: decoded.user,
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn,
                    }
                );

                res.header('Authorization', 'Bearer ' + newToken);

                next();
            }
        });
    } else {
        return res.status(401).json('token_required');
    }
}

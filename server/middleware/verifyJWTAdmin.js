const jwt = require('jsonwebtoken')

const verifyJWTAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded ) => {
            console.log("decoded", decoded);
            console.log("err", err);
            console.log("decoded.role", decoded.role);
            
            if (err|| decoded.roles !== 'Admin')
                return res.status(403).json({ message: "Forbidden" })
            req.user = decoded
            next()
        }
    )

}

module.exports = verifyJWTAdmin
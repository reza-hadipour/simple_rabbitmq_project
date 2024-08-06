const jwt = require('jsonwebtoken');

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        
        if(!token) return res.json("Authorization failed.");

        if(jwt.verify(token,"SecretK3Y")){
            const {email , userId} =  jwt.decode(token);
            req.user = {
                userId,
                email
            };
            next();
        }else{
            return res.json("Token is not valid.")
        }

    } catch (error) {
        next(error);
    }
}


module.exports = isAuthenticated;
const User = require('../models/user');
const jwt = require('jsonwebtoken');

export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'exampleSecret');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('Please authenticate.');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401)
        return error;
    }

}
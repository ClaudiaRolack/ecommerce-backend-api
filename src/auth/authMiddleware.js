const authorizationMiddleware = (roles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!roles.includes(user.rol)) {
            return res.status(403).json({ error: 'No permissions' });
        }

        next();
    };
};

module.exports = { authorizationMiddleware }
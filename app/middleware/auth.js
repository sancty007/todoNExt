export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer mockToken') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

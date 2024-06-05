const validateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { validateToken };

const validateToken = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = { validateToken };
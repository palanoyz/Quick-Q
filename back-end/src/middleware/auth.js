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
    }
};

const isLogin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            return res.status(401).json({ message: "You are already logged in" });
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { validateToken, isLogin };
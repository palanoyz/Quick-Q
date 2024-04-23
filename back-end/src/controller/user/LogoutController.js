const logoutController = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout success" });
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = { logoutController }
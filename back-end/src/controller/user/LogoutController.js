const logoutController = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout success" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { logoutController }
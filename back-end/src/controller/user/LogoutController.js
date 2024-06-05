const logoutController = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout success" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

module.exports = { logoutController }
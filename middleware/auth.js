import { apiKeyCache } from "../controller/userController.js";

const authUser = async (req, res, next) => {
    const apiKey = req.query.apiKey;
    console.log('Current apiKeyCache:', apiKeyCache);
    try {
        if (!apiKey) {
            return res.json({
                success: false,
                message: 'Thiếu apiKey'
            });
        }
        const userData = apiKeyCache[apiKey];
        if (!userData) {
            return res.json({
                success: false,
                message: 'apiKey không hợp lệ hoặc hết hạn'
            });
        }
        req.user = { userId: userData.userId, email: userData.email }
        next();
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
export default authUser


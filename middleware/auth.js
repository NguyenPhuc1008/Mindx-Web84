const authUser = async (req, res) => {
    const apiKey = req.query.apiKey;
    try {
        if (!apiKey) {
            return res.json({
                success: false,
                message: 'Thiếu apiKey'
            });
        }
        if (!apiKeyCache[apiKey]) {
            return res.json({
                success: false,
                message: 'apiKey không hợp lệ hoặc hết hạn'
            });
        }
        req.user = apiKeyCache[apiKey];
        next();
    } catch (error) {
        res.json({
            success: false,
            message: 'Lỗi xác thực apiKey'
        });
    }
};
export default authUser


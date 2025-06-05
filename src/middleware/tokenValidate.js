const { sendError, sendResponse, decodeJwtToken } = require("../helpers/helper");

async function validateToken(req, res, next) {
    try {
        let tokenData = req.headers.authorization;

        if (!tokenData) {
            const sendResponseData = {
                status: 400,
                message: "Token is required",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }
        let token = tokenData.split(" ")[1];

        let decoded = decodeJwtToken(token);

        if (!decoded.status) {
            const sendResponseData = {
                status: 400,
                message: decoded.message,
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }

        req.email = decoded.decoded.email;
        req.user_id = decoded.decoded.user_id;
        req.token = token;

        next();
    } catch (e) {
        let sendErrorData = {
            status: 500,
            message: "Failed to logout",
            error: e.message || e,
        };

        return sendError(sendErrorData, res);
    }
}

module.exports = { validateToken };
const { dbWriter, dbReader } = require("../config/dbConfig");
const { sendError, sendResponse, decrypt, createJwtToken } = require("../helpers/helper");

async function login(req, res) {
    try {
        const { email, password } = req.body;

        let user = await dbReader.users.findOne({
            where: { email: email }
        });

        if (!user) {
            const sendResponseData = {
                status: 400,
                message: "User not found",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }
        user = JSON.parse(JSON.stringify(user));

        let decryptedPassword = decrypt(user.password);

        if (decryptedPassword !== password) {
            const sendResponseData = {
                status: 400,
                message: "Password is incorrect",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }

        let storedDataInToken = {
            user_id: user.user_id,
            email: user.email,
        };
        let token = createJwtToken(storedDataInToken);

        if (!token.status) {
            const sendResponseData = {
                status: 400,
                message: token.message,
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }

        await dbWriter.users.update({
            token: token.token,
        }, {
            where: {
                user_id: user.user_id,
            },
        });

        const sendResponseData = {
            status: 200,
            message: "Login successful",
            data: {
                token: token.token,
            },
        };

        return sendResponse(sendResponseData, res);
    } catch (e) {
        let sendErrorData = {
            status: 500,
            message: "Failed to login",
            error: e.message || e,
        };

        return sendError(sendErrorData, res);
    }
}

async function logout(req, res) {
    try {
        let user_id = req.user_id;

        let clearToken = await dbWriter.users.update({
            token: null,
        }, {
            where: {
                user_id: user_id,
            },
        });

        if (clearToken && clearToken.length) {
            const sendResponseData = {
                status: 200,
                message: "Logout successful",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        } else {
            const sendResponseData = {
                status: 400,
                message: "Failed to logout",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }
    } catch (e) {
        let sendErrorData = {
            status: 500,
            message: "Failed to logout",
            error: e.message || e,
        };

        return sendError(sendErrorData, res);
    }
}

module.exports = { login, logout };
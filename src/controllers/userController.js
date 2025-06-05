const { dbWriter, dbReader } = require("../config/dbConfig");
const { generateUniqueId, encrypt, sendError, sendResponse } = require("../helpers/helper");

async function getUser(req, res) {
    try {
        let user_id = req.user_id;
        let user = await dbReader.users.findOne({
            where: { user_id: user_id }
        });

        if (user) {
            user = JSON.parse(JSON.stringify(user));

            let sendResponseData = {
                status: 200,
                message: "Success",
                data: user,
            };

            return sendResponse(sendResponseData, res);
        } else {
            const sendResponseData = {
                status: 200,
                message: "No data found",
                data: [],
            };

            return sendResponse(sendResponseData, res);
        }
    } catch (e) {
        let sendErrorData = {
            status: 500,
            message: "Failed to get user data",
            error: e.message || e,
        };

        return sendError(sendErrorData, res);
    }
}

async function saveUser(req, res) {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!password) {
            const sendResponseData = {
                status: 400,
                message: "Password is required",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }

        let uniqueId = generateUniqueId();

        let createUser = await dbWriter.users.create({
            user_id: uniqueId.id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: encrypt(password)
        });

        if (!createUser) {
            const sendResponseData = {
                status: 400,
                message: "User not saved properly",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        } else {
            const sendResponseData = {
                status: 200,
                message: "Success",
                data: createUser,
            };

            return sendResponse(sendResponseData, res);
        }
    } catch (e) {
        let sendErrorData = {
            status: 500,
            message: "Failed to create user",
            error: e.message || e,
        };

        return sendError(sendErrorData, res);
    }
}

async function updateUser(req, res) {
    try {
        let user_id = req.user_id;
        const { first_name, last_name, email } = req.body;

        let updateUser = await dbWriter.users.update({
            first_name: first_name,
            last_name: last_name,
            email: email
        }, {
            where: { user_id: user_id }
        });

        if (!updateUser && !updateUser.length) {
            const sendResponseData = {
                status: 400,
                message: "User not updated properly",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        } else {
            const sendResponseData = {
                status: 200,
                message: "Success",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }
    } catch (e) {
        let sendErrorData = {
            status: 500,
            message: "Failed to update user",
            error: e.message || e,
        };

        return sendError(sendErrorData, res);
    }
}

async function deleteUser(req, res) {
    try {
        const { user_id } = req.params;

        let deleteUser = await dbWriter.users.destroy({ where: { user_id: user_id } });

        if (!deleteUser && !deleteUser.length) {
            const sendResponseData = {
                status: 400,
                message: "User not deleted properly",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        } else {
            const sendResponseData = {
                status: 200,
                message: "Success",
                data: null,
            };

            return sendResponse(sendResponseData, res);
        }
    } catch (e) {
        let sendErrorData = {
            status: 500,
            message: "Failed to delete user",
            error: e.message || e,
        };

        return sendError(sendErrorData, res);
    }
}

module.exports = { getUser, saveUser, updateUser, deleteUser };
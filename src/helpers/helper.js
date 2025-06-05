const { v4: uuidv4 } = require('uuid');
const { secretKey, appConfig } = require("../config/appConfig");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

function generateUniqueId() {
    try {
        const id = uuidv4();

        return { status: true, id: id };
    } catch (e) {
        return { status: false, message: e.message };
    }
};

function encrypt(data) {
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encrypted;
}

function decrypt(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

function createJwtToken(data) {
    try {
        const token = jwt.sign(data, secretKey);
        return { status: true, message: "Success", token: token };
    } catch (e) {
        return { status: false, message: e.message };
    }
}

function decodeJwtToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { status: true, message: "Success", decoded: decoded };
    } catch (e) {
        return { status: false, message: e.message };
    }
}

function validateSchema(schema) {
    try {
        return (req, res, next) => {
            const { error } = schema.validate(req.body);

            if (!error) {
                return next();
            } else {
                const { details } = error;
                const message = details.map((i) => i.message.replace(/['"]+/g, "")).join(",");

                return res.status(400).json({ error: message });
            }
        };
    } catch (error) {
        throw new Error(catchError.HelperFunctionErrorMessage);
    }
}

function sendError(response, res) {
    if (appConfig.node_env === "development" || appConfig.node_env === "local") {
        return res.status(response.status).send({ status_code: response.status, message: response.message, data: response.error });
    } else {
        return res.status(response.status).send({ status_code: response.status, message: "Something went wrong" });
    }
}

function sendResponse(response, res) {
    return res.status(response.status).send({ status_code: response.status, message: response.message, data: response.data });
}

module.exports = { generateUniqueId, encrypt, decrypt, createJwtToken, decodeJwtToken, validateSchema, sendError, sendResponse };
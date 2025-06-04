const { v4: uuidv4 } = require('uuid');
const { secretKey } = require("../config/appConfig");
const CryptoJS = require("crypto-js");

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
        return { status: true, token: token };
    } catch (e) {
        return { status: false, message: e.message };
    }
}

function decodeJwtToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { status: true, decoded: decoded };
    } catch (e) {
        return { status: false, message: e.message };
    }
}

module.exports = { generateUniqueId, encrypt, decrypt, createJwtToken, decodeJwtToken };
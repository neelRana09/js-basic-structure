const { dbWriter, dbReader } = require("../config/dbConfig");
const { generateUniqueId, encrypt } = require("../helpers/helper");

async function getUser(req, res) {
    try {
        let user = await dbReader.users.findAll({});

        if (user && user.length) {
            user = JSON.parse(JSON.stringify(user));

            return res.status(200).json({ message: "Data found", data: user });
        } else {
            return res.status(200).json({ message: "No data found" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

async function saveUser(req, res) {
    try {
        const { user_id, first_name, last_name, email, password } = req.body;

        if (user_id) {
            let updateUser = await dbWriter.users.update({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            }, { where: { user_id: user_id } });

            if (!updateUser && !updateUser.length) {
                return res.status(400).json({ message: "Something went wrong" });
            } else {
                return res.status(200).json({ message: "User updated successfully" });
            }
        } else {
            let uniqueId = generateUniqueId();

            let createUser = await dbWriter.users.create({
                user_id: uniqueId.id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: encrypt(password)
            });

            if (!createUser) {
                return res.status(400).json({ message: "Something went wrong" });
            } else {
                return res.status(200).json({ message: "User created successfully", data: createUser });
            }
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { user_id } = req.params;

        let deleteUser = await dbWriter.users.destroy({ where: { user_id: user_id } });

        if (!deleteUser && !deleteUser.length) {
            return res.status(400).json({ message: "Something went wrong" });
        } else {
            return res.status(200).json({ message: "User deleted successfully" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

module.exports = { getUser, saveUser, deleteUser };
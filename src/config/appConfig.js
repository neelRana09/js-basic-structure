let appConfig = {
    node_env: "development",
    port: 5000,
    db_host_reader: "localhost",
    db_host_writer: "localhost",
    db_port: 3306,
    db_name: "test-db-app",
    db_username: "root",
    db_password: "",
};

let secretKey = "secretKey";

module.exports = { appConfig, secretKey };
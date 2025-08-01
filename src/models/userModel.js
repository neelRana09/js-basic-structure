module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        user_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        token: DataTypes.TEXT,
        first_name: DataTypes.STRING(60),
        last_name: DataTypes.STRING(60),
        email: DataTypes.STRING(60),
        password: DataTypes.STRING(60),
    }, {
        tableName: 'users',
        timestamps: false,
        underscored: false,
    });

    User.associate = (models) => {
        // Define associations here if needed
        // User.belongsTo(models.items, {
        //     foreignKey: 'user_id',
        //     targetKey: 'item_id'
        // });
    };

    return User;
};

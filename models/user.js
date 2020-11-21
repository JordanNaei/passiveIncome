module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("iPhones", {
        createdAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
            field: 'updated_at',
        },
        model: DataTypes.STRING,
        asin_n: DataTypes.STRING,
        upc_n: DataTypes.STRING,
        capacity: DataTypes.STRING,
    });
    return User;
};



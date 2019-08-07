const sequelize = require('./sequalize')
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: "Email already exists"
        },
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: { msg: "Invalid first name" },
            notEmpty: true
        }
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: { msg: "Invalid last name" },
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},
    { timestamps: true }
)

module.exports = User
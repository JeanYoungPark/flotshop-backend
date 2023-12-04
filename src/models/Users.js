import { database } from "#core/db.js"
import { Sequelize } from "sequelize";

export const Users = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    zipcode: {
        type: Sequelize.STRING
    },
    address_2: {
        type: Sequelize.STRING
    },
    phone_2: {
        type: Sequelize.STRING
    },
    agree_term: {
        type: Sequelize.STRING
    },
    agree_email: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
});

const UserDetails = database.define('user_details', {
    age: {
      type: sequelize.INTEGER,
    },
    gender: {
      type: sequelize.STRING,
    },
  });
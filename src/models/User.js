import { database } from "#core/db.js"
import { Sequelize } from "sequelize";

export const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.STRING(10)
    },
    password: {
        type: Sequelize.STRING(100)
    },
    name: {
        type: Sequelize.STRING(10)
    },
    email: {
        type: Sequelize.STRING(50)
    },
    isAdmin: {
        type: Sequelize.ENUM('Y', 'N'),
        defaultValue: 'N'
    },
    reg_date: {
        type: Sequelize.DATE,
    },
    upd_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, {
    tableName: 'user',
    timestamps: false,
});

export const UserDetail = database.define('user_detail', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_en: {
        type: Sequelize.STRING(10),
    },
    zipcode: {
        type: Sequelize.STRING(10),
    },
    address_1: {
        type: Sequelize.STRING(100),
    },
    address_2: {
        type: Sequelize.STRING(100),
    },
    phone_1: {
        type: Sequelize.STRING(11),
    },
    phone_2: {
        type: Sequelize.STRING(11),
    },
    agree_term: {
        type: Sequelize.ENUM('Y', 'N'),
        defaultValue: 'Y',
    },
    agree_poilcy: {
        type: Sequelize.ENUM('Y', 'N'),
        defaultValue: 'Y',
    },
    agree_sms: {
        type: Sequelize.ENUM('Y', 'N'),
        defaultValue: 'N',
    },
    agree_email: {
        type: Sequelize.ENUM('Y', 'N'),
        defaultValue: 'N',
    },
    gender: {
      type: Sequelize.STRING,
    },
    birth: {
        type: Sequelize.DATE,
    },
    city: {
        type: Sequelize.STRING(50),
    },
    pet_name: {
        type: Sequelize.STRING(10),
    },
    pet_weight: {
        type: Sequelize.INTEGER(),
        precision: 3,
    },
    recommender_id: {
        type: Sequelize.STRING(10),
    },
    reg_date: {
        type: Sequelize.DATE,
    },
    upd_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    timestamps: false,
});
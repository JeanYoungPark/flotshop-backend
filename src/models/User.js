import { database } from "#root/db"
import { Sequelize } from "sequelize";
import { Session } from "#model/Session";

export const User = database.define('users', {
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
    is_admin: {
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
    timestamps: false,
});

User.association = models => {
    User.hasMany(models.UserDetail, { foreignKey: 'id', sourceKey: 'id'})
    User.hasOne(models.Session, {foreignKey: 'id', sourceKey: 'id'})
}

export const UserDetail = database.define('users_detail', {
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

UserDetail.association = models => {
    UserDetail.belongsTo(models.User, {foreignKey: 'id', sourceKey: 'id'})
}

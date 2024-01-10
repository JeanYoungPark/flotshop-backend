import { database } from "#root/db"
import { Sequelize } from "sequelize";

export const Option = database.define('options', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    reg_date: {
        type: Sequelize.DATE,
    },
    upd_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, {
    timestamps: false
})

export const OptionDetail = database.define('options_detail', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    option_id: {
        type: Sequelize.INTEGER,
    },
    title: {
        type: Sequelize.STRING,
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
    freezeTableName: true
})

Option.hasMany(OptionDetail, {as: 'children', foreignKey: 'option_id'});
OptionDetail.belongsTo(Option, {foreignKey: 'option_id'});
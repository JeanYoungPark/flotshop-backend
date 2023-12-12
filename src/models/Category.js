import { database } from "#core/db"
import { Sequelize } from "sequelize";

export const Category = database.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: { type: Sequelize.STRING(20) },
    reg_date: { type: Sequelize.DATE },
    upd_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, { timestamps: false })

export const CategoryDetail = database.define('category_detail', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: { type: Sequelize.INTEGER },
    title: { type: Sequelize.STRING(20) },
    reg_date: { type: Sequelize.DATE },
    upd_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, { timestamps: false })
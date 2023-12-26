import { database } from "#root/db"
import { Sequelize } from "sequelize";
import { Product } from "#model/Product";

export const Category = database.define('categories', {
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

export const CategoryDetail = database.define('categories_detail', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: Sequelize.INTEGER,
    },
    title: { type: Sequelize.STRING(20) },
    reg_date: { type: Sequelize.DATE },
    upd_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, { timestamps: false, freezeTableName: true })

Category.hasMany(CategoryDetail, {as: 'children', foreignKey: 'category_id'});
CategoryDetail.belongsTo(Category, {foreignKey: 'category_id'});
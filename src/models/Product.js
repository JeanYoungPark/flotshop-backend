import { database } from "#core/db"
import { Sequelize } from "sequelize";
import { CategoryDetail } from "#model/Category";

export const Product = database.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING(10)
    },
    price: {
        type: Sequelize.NUMBER(8)
    },
    option: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    likes: {
        type: Sequelize.NUMBER(5),
        defaultValue: 0
    }, 
    is_new: {
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

// Product.belongsTo(CategoryDetail, {foreignKey: 'category_id'});
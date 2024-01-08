import { database } from "#root/db"
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
    option_id: {
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

export const ProductImg = database.define('products_img', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: Sequelize.INTEGER,
    },
    img_name: {
        type: Sequelize.STRING
    },
    image_hash: {
        type: Sequelize.STRING
    },
    img_path: {
        type: Sequelize.STRING
    },
    img_size: {
        type: Sequelize.NUMBER(10),
    },
    img_format: {
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
    freezeTableName: true,
    timestamps: false,
})

Product.hasMany(ProductImg, {as: 'children', foreignKey: 'product_id'});
ProductImg.belongsTo(Product, {foreignKey: 'product_id'})
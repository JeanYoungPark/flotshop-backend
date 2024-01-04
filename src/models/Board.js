import { database } from "#root/db"
import { Sequelize } from "sequelize";

export const BoardImgTemp = database.define('boards_img_temp', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
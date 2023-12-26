import { database } from "#root/db"
import { Sequelize } from "sequelize";

export const Session = database.define('sessions', {
    id: {
        type: Sequelize.STRING(10),
        primaryKey: true
    },
    session_id: {
        type: Sequelize.STRING(100),
        
    },
    created_at: {
        type: Sequelize.DATE,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    expired_at: {
        type: Sequelize.DATE
    }
},{
    timestamps: false,
} );

Session.associate = models => {
    Session.belongsTo(models.User, {foreignKey: 'id', targetKey: 'id'})
}
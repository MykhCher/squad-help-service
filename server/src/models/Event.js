

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Events', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'My Event',
        },
        eventTime: {
            type: DataTypes.DATE,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        elapsed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        timestamps: true
    });

    Event.associate = function (models) {
        Event.belongsTo(models.Users, { foreignKey: 'user_id', targetKey: 'id' });
    };
  
    return Event;
  };
  
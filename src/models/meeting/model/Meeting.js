module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define(
    "Meeting",

    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        
      },
    },
  );

  return Meeting;
};

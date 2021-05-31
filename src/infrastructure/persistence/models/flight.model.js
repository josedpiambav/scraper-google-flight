const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    // Model definition
	const Flight = sequelize.define("flight", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
        origin: {
            allowNull: false,
            type: DataTypes.STRING
        },
        destination: {
            allowNull: false,
            type: DataTypes.STRING
        },
        status: {
            allowNull: false,
            type: DataTypes.ENUM("SCHEDULE", "PROCESSING", "COMPLETED")
        }
	});

    // Relations definition
    Flight.associate = ({ itinerary }) => {
        Flight.hasMany(itinerary);
    };

    return Flight;

};
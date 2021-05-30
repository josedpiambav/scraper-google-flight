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
        }
	});

    // Relations definition
    Flight.associate = ({ itinerary }) => {
        Flight.hasMany(itinerary);
    };

    return Flight;

};
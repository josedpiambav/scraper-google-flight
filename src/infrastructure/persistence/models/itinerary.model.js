const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    // Model definition
	const Itinerary = sequelize.define("itinerary", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
        date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        price: {
            allowNull: false,
            type: DataTypes.STRING
        }
	});

    // Relations definition
    Itinerary.associate = ({ flight }) => {
        Itinerary.belongsTo(flight);
    };

    return Itinerary;
    
};
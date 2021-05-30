const sequelize = require("./sequelize");

const databaseConnection = async() => {

	console.log("Checking database connection...");

	try {

		await sequelize.authenticate();
        await sequelize.sync();
		console.log("Connection has been established successfully");

	} catch (e) {

		console.log("Unable to connect to the database");
        console.log(e.message);
        process.exit(1);

	}

}

module.exports = {
    databaseConnection
}
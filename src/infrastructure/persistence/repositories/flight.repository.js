const { v4 } = require("uuid");
const { models: { flight: flightModel } } = require("../sequelize");

class FlightRepository {

    constructor() {}

    async list() {

        let flights = [];

        try {

            flights = await flightModel.findAll();
            
        } catch (e) {

            console.log("Error in infrastructure/persistence/repositories/flight");
            console.log(e.message);
            
        }

        return flights;

    }

    async retrieve({ flightId }) {

        let flight;

        try {

            flight = await flightModel.findByPk(flightId);
            if (!flight) flight = undefined;
            
        } catch (e) {

            console.log("Error in infrastructure/persistence/repositories/flight");
            console.log(e.message);
            
        }

        return flight;

    }

    async create({ origin, destination }) {

        let flight;

        try {

            flight = await flightModel.create({
                id: v4(),
                origin,
                destination
            });

        } catch(e) {

            console.log("Error in infrastructure/persistence/repositories/flight");
            console.log(e.message);

        }

        return flight;

    }

}

module.exports = new FlightRepository;
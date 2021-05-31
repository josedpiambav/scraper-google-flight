const { flightRepository } = require("../../infrastructure/persistence/repositories");

class CreateFlight {

    constructor() {}

    async handler({ origin, destination }) {

        let flight;

        try {

            flight = await flightRepository.create({ origin, destination, status: "SCHEDULE" });

        } catch(e) {

            console.log("Error in domain/flight/createFlight");
            console.log(e.message);

        }

        return { flight };

    }

}

module.exports = new CreateFlight;
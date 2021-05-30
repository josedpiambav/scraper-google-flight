const { flightRepository, itineraryRepository } = require("../../infrastructure/persistence/repositories");

class RetrieveFligth {

    constructor() {}

    async handle({ flightId }) {

        let flight, itineraries;

        try {

            flight = await flightRepository.retrieve({ flightId });
            if (flight) itineraries = await itineraryRepository.listByFlightId({ flightId });
            
        } catch (e) {

            console.log("Error in domain/scraper/listFlights");
            console.log(e.message);
            
        }

        return { flight, itineraries };

    }

}

module.exports = new RetrieveFligth;
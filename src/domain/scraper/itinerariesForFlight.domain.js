const { flightRepository, itineraryRepository } = require("../../infrastructure/persistence/repositories");
const { itinerariesForFlight } = require("../../infrastructure/simulation");

class ItinerariesForFlight {

    constructor() {}

    async handle({ origin, destination }) {

        let flight, itineraries;

        try {

            itineraries = await itinerariesForFlight({ origin, destination });
            flight = await flightRepository.create({ origin, destination });
            itineraries = itineraries.map(itinerary => Object.assign(itinerary, { ...itinerary, flightId: flight.id }));
            await itineraryRepository.createBulk(itineraries);

        } catch(e) {

            console.log("Error in domain/scraper/itinerariesForFlight");
            console.log(e.message);

        }

        return { flight, itineraries };

    }

}

module.exports = new ItinerariesForFlight;
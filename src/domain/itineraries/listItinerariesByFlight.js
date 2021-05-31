const { itineraryRepository } = require("../../infrastructure/persistence/repositories");

class ItinerariesFligthsByFlight {

    constructor() {}

    async handler({ flightId }) {

        let itineraries = [];

        try {

            itineraries = await itineraryRepository.list({ where: { flightId }});
            
        } catch (e) {

            console.log("Error in domain/itineraries/listItinerariesByFlight");
            console.log(e.message);
            
        }

        return { itineraries };

    }

}

module.exports = new ItinerariesFligthsByFlight;
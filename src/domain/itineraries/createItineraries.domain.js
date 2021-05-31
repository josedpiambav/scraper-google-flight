const { flightRepository, itineraryRepository } = require("../../infrastructure/persistence/repositories");
const { itinerariesForFlight } = require("../../infrastructure/simulation");

class CreateItineraries {

    constructor() {}

    async handler() {

        let itineraries = [], flightSchedule;

        try {

            let flightsSchedule = await flightRepository.list({ where: { status: "SCHEDULE" } });

            if (flightsSchedule.length > 0) {

                ([ flightSchedule ] = flightsSchedule);
                let { id: flightId, origin, destination } = flightSchedule;

                flightSchedule.status = "PROCESSING";
                await flightSchedule.save();

                (itineraries = await itinerariesForFlight({ origin, destination }));

                if (itineraries.length > 0) {
                    
                    flightSchedule.status = "COMPLETED";
                    itineraries = itineraries.map((itinerary) => Object.assign({}, { ...itinerary, flightId }));

                } else flightSchedule.status = "SCHEDULE";

                await flightSchedule.save();

                await itineraryRepository.createBulk(itineraries);

            }
            
        } catch (e) {

            console.log("Error in domain/itineraries/createItineraries");
            console.log(e.message);
            
        }

        return { itineraries };

    }

}

module.exports = new CreateItineraries;
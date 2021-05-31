const { listItinerariesByFlight } = require("../../domain/itineraries");

class ItinerariesController {

    constructor() {}

    async list(req, res) {

        try {
            
            const { flightId } = req.params;
            const itineraries = await listItinerariesByFlight.handler({ flightId });
            res.json(itineraries).status(200);

        } catch (e) {

            console.log("Error in controllers/api/itineraries");
            console.log(e.message);
            res.status(500);
            
        }

    }

}

module.exports = new ItinerariesController;
const { listFlights, createFlight } = require("../../domain/flights");

class FlightsController {

    constructor() {}

    async list(req, res) {

        try {
            
            const flights = await listFlights.handler();
            res.json(flights).status(200);

        } catch (e) {

            console.log("Error in controllers/api/flight");
            console.log(e.message);
            res.status(500);
            
        }

    }

    async create(req, res) {

        try {
            
            const { origin, destination } = req.body;
            const flight = await createFlight.handler({ origin, destination });
            res.json(flight).status(200);

        } catch (e) {

            console.log("Error in controllers/api/flight");
            console.log(e.message);
            res.status(500);
            
        }

    }

}

module.exports = new FlightsController;
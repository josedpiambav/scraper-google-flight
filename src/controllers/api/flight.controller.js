const { listFlights, retrieveFlight } = require("./../../domain/flight");

class FlightController {

    constructor() {}

    async list(req, res) {

        try {
            
            const flights = await listFlights.handle();
            res.json(flights).status(200);

        } catch (e) {

            console.log("Error in controllers/api/flight");
            console.log(e.message);
            res.status(500);
            
        }

    }

    async retrieve(req, res) {

        try {
            
            const { flightId } = req.params;
            const { flight, itineraries } = await retrieveFlight.handle({ flightId });
            if (!flight) res.json({ flight: "Flight not exists" }).status(404);
            res.json({ flight, itineraries }).status(200);

        } catch (e) {

            console.log("Error in controllers/api/flight");
            console.log(e.message);
            res.status(500);
            
        }

    }

}

module.exports = new FlightController;
const { itinirariesForFlight } = require("../../domain/scraper");

class ScraperController {

    constructor() {}
    
    async create(req, res) {

        try {
            
            const { origin, destination } = req.body;
            const flight = await itinirariesForFlight.handle({ origin, destination });
            res.json(flight).status(200);

        } catch (e) {

            console.log("Error in controllers/api/scraper");
            console.log(e.message);
            res.status(500);
            
        }

    }

}

module.exports = new ScraperController;
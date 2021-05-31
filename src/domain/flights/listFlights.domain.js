const { flightRepository } = require("../../infrastructure/persistence/repositories");

class ListFligths {

    constructor() {}

    async handler() {

        let flights = [];

        try {

            flights = await flightRepository.list({});
            
        } catch (e) {

            console.log("Error in domain/scraper/listFlights");
            console.log(e.message);
            
        }

        return { flights };

    }

}

module.exports = new ListFligths;
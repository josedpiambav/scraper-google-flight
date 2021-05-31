const { CronJob } = require('cron');
const { createItineraries } = require("../domain/itineraries");

class ItinerariesCronJob {

    constructor() {}

    async handler() {

        try {
            
            await createItineraries.handler();

        } catch (e) {

            console.log("Error in cronjob/itineraries");
            console.log(e.message);
            
        }

    }

}

module.exports = new CronJob('0 */1 * * * *', async() => new ItinerariesCronJob().handler());
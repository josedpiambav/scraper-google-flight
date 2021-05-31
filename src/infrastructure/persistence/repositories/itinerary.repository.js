const { v4 } = require("uuid");
const { models: { itinerary: itineraryModel } } = require("../sequelize");

class ItineraryRepository {

    constructor() {}

    async list({ where }) {

        let itineraries = [];

        try {

            itineraries = await itineraryModel.findAll({ where });

        } catch(e) {

            console.log("Error in infrastructure/persistence/repositories/itinerary");
            console.log(e.message);

        }

        return itineraries;

    }

    async createBulk(itineraries) {

        itineraries = itineraries.map(itinerary => Object.assign(itinerary, { ...itinerary, id: v4() }));

        try {

            await itineraryModel.bulkCreate(itineraries);

        } catch(e) {

            console.log("Error in infrastructure/persistence/repositories/itinerary");
            console.log(e.message);
            itineraries = undefined;

        }

        return itineraries;

    }

}

module.exports = new ItineraryRepository;
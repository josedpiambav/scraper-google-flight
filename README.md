# Scraper Google Flight

Platform designed to obtain fares of flights published on the website https://google.com/travel/flights (GoogleFlight)

Implements Docker containers to build the necessary infrastructure: a PostgresSQL (v13) service for data persistence and a NodeJS (v14) service with ExpressJS and Puppeteer, as well as exposing routes for a website (developed with a Handlebars) and an API.

## 🚀 Usage

After cloning the repository, having Docker on your machine and configured the `.env` you can run `docker compose up` to deploy the application.

## 🔮 Future

TODO

- [ ] Implement validations in backend and frontend to improve user interaction.
- [ ] Implement a framework such as Angular, React, Vue or Svelte for the frontend.

## OSS used

- [PostgresSQL](https://www.postgresql.org/)
- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com)
- [Puppeeteer](https://pptr.dev/)
- [Handlerbars](https://handlebarsjs.com/)
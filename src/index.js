require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const handlebars = require('express-handlebars');

// Import main router
const { httpRouter } = require("./routes");

// Import database connection
const { databaseConnection } = require("./infrastructure/persistence");

// Declare server
const httpServer = express();

// Sets view engine
httpServer.engine("hbs", handlebars({
    defaultLayout: "index", 
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials")
}));
httpServer.set("view engine", "hbs");
httpServer.set("views", path.join(__dirname, "views"));
httpServer.use(express.static(path.join(__dirname, "public")));

// Available CORS
httpServer.use(cors());

// Sets parser
httpServer.use(express.urlencoded({ extended: false }));
httpServer.use(express.json());

// Sets main router
httpServer.use(httpRouter);

(async() => {

    await databaseConnection();
    httpServer.listen(process.env.PORT, process.env.HOST);
    console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);

})();
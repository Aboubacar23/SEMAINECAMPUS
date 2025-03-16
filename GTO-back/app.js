const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const errorMiddleware = require("./src/middleware/errorMiddleware");


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes)
app.use(errorMiddleware);


module.exports = app;
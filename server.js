global.__basedir = __dirname;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const expressWinston = require('express-winston');
const winston = require('winston');
const routes = require('./routes');
const schedule = require('node-schedule');
const jobs = require('./controller/BTC/index');
// const models = require("./models/index")
// const {sequelize, TatumWallet, Subscriptions, Transactions} =  models;


dotenv.config();
const app = express();

// async function createEuroTemplatesTable() {
//   try {
//    await Transactions.sync({ force: true }); // Use { force: true } to drop existing table and recreate
//   console.log("EuroTemplates table created successfully");
//   } catch (error) {
//     console.error("Error creating EuroTemplates table:", error);
//   } finally {
//     await sequelize.close(); // Close the Sequelize connection when done
//   }
// }
// createEuroTemplatesTable();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
}));



// Routes
app.use('/', routes);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



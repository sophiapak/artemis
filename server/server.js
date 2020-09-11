const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const artemisController = require('./controllers/artemisControllers');

// this allows our input values from our form to be available in req.body
app.use(express.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

// Sends the Client the Artemis Homepage (Logo with Interactive Buttons)
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// Sends the Client a table if Client has been found in the db
app.post('/find', artemisController.getClient, (req, res) => {
  res.status(200).json(res.locals.foundClient);
});

app.get('/breed', artemisController.getBreeds, (req, res) => {
	res.status(200).json(res.locals.allBreeds);
});

app.get('/owners', artemisController.getOwners, (req, res) => {
	res.status(200).json(res.locals.allOwners);
});

// Sends the Client a success message if Client has been added to the db
app.post('/add', artemisController.addOwner, artemisController.addPet, artemisController.sendClient, (req, res) => {
	res.status(200).json(res.locals.sendClient);
});

// Sends the Client a success message if Client has been found and deleted from the db
// app.post('/delete', artemisController.deleteClient, (req, res) => {
// });

// 404 HANDLER FOR UNKNOWN ROUTES
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

// LISTENING TO SERVER
app.listen(3000, () => {
  console.log('artemis server is running on port 3000');
});
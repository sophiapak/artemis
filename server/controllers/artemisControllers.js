/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const db = require('../db/artemisDB');
const { query } = require('express');

const artemisController = {};

artemisController.getClient = (req, res, next) => {
  // retrieving the information from req.body
  // find within our sql db
  // store our filtered table in res.locals
  const { petName } = req.body;
  const { ownerName } = req.body;
  const clientTable = `
		SELECT
		p.pet_id AS id,
		p.name,
		p.gender,
		p.spayneuter,
		p.birthday,
		b.breedname,
		p.color,
		p.insurancecard,
		o.firstname,
		o.lastname,
		o.mailingaddress,
		o.city,
		o.state,
		o.zipcode,
		o.firstphonenum,
		o.secondphonenum,
		i.company
		
		FROM pet p

		FULL OUTER JOIN owner o ON p.owner_id = o.owner_id
		FULL OUTER JOIN insurance i ON p.insurance_id = i.insurance_id
		FULL OUTER JOIN breed b ON p.breed_id = b.breed_id

		WHERE p.name=$1 AND o.lastname=$2
	`;
  // $1 = petName & $2 = ownerName
  const queryParams = [petName, ownerName];

  db.query(clientTable, queryParams)
    .then(result => {
      res.locals.foundClient = result.rows[0];
      return next();
    })
    .catch((err) => {
      console.error(err.stack, 'Sorry! Client not found!');
    });
};

artemisController.getBreeds = (req, res, next) => {
  const breedTable = `
		SELECT
		b.breedname
		
		FROM breed b
	`;

  db.query(breedTable)
    .then(result => {
      // console.log('BREEDS RESULT.ROWS[0]: ', result.rows);
      const listBreeds = [];
      result.rows.forEach(obj => {
        listBreeds.push(obj.breedname);
      });
      res.locals.allBreeds = listBreeds;
      // console.log('LISTBREEDS: ', listBreeds);
      return next();
    })
    .catch((err) => {
      console.error(err.stack, 'Sorry! Client not found!');
    });
};

artemisController.getOwners = (req, res, next) => {
  const ownerTable = `
		SELECT 
		firstname || ' ' || lastname AS name,
		owner_id AS ownerId
		FROM owner
	`;

  db.query(ownerTable)
    .then(result => {
      console.log('OWNERS RESULT.ROWS: ', result.rows);
      res.locals.allOwners = result.rows;
      return next();
    })
    .catch((err) => {
      console.error(err.stack, 'Sorry! Owner not found!');
    });
};

artemisController.addOwner = (req, res, next) => {
  console.log('CONTROLLER ADD OWNER REQ.BODY: ', req.body);
  // if the owner already exists in the database
  if (req.body.ownerExisting !== "") return next();

  let { ownerFirstName, ownerLastName, ownerAddress, ownerCity, ownerState, ownerZipcode, ownerFirstPhoneNum, ownerSecondPhoneNum } = req.body;

  // parsing all the string values from input fields into integers to follow Schema guidelines
  ownerZipcode = parseInt(ownerZipcode);

  const addOwnerString = `
		INSERT INTO owner(firstname, lastname, mailingaddress, city, state, zipcode, firstphonenum, secondphonenum)
		VALUES($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING owner_id AS ownerId, lastname
	`;

  const queryParamsOwner = [ownerFirstName, ownerLastName, ownerAddress, ownerCity, ownerState, ownerZipcode, ownerFirstPhoneNum, ownerSecondPhoneNum];

  // if a new owner
  db.query(addOwnerString, queryParamsOwner)
    .then(result => {
      console.log('RESULT.ROWS.OWNERID: ', result.rows[0].ownerid);
			res.locals.newOwnerId = result.rows[0].ownerid;
			res.locals.newOwnerName = result.rows[0].lastname;
      return next();
    })
    .catch((err) => {
      console.error(err.stack, 'Sorry! Owner was not added!');
    });
};

artemisController.addPet = (req, res, next) => {
  console.log('CONTROLLER ADD PET REQ.BODY: ', req.body);
  let { petName, petGender, petSpayNeuter, petBirthday, petBreed, petColor, ownerExisting, insCompany, petInsuranceCard } = req.body;

  // parsing all the string values from input fields into integers to follow Schema guidelines
  petBreed = parseInt(petBreed);
  insCompany = (insCompany === "") ? null : parseInt(insCompany);
  ownerExisting = (ownerExisting === "") ? res.locals.newOwnerId : parseInt(ownerExisting);

  const addPetString = `
		INSERT INTO pet
		(name, gender, spayneuter, birthday, breed_id, color, owner_id, insurance_id, insurancecard)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING name
	`;

  const queryParamsPet = [petName, petGender, petSpayNeuter, petBirthday, petBreed, petColor, ownerExisting, insCompany, petInsuranceCard];

  db.query(addPetString, queryParamsPet)
    .then(result => {
			console.log('Pet has been added to the database');
			res.locals.newPetName = result.rows[0].name;
			res.locals.sendOwnerId = ownerExisting;
      // res.locals.newOwner = result;
      return next();
    })
    .catch((err) => {
      console.error(err.stack, 'Sorry! Pet was not added!');
    });
};

artemisController.sendClient = (req, res, next) => {
	const { sendOwnerId } = res.locals;
  const { newPetName } = res.locals;
  const clientTable = `
		SELECT
		p.pet_id AS id,
		p.name,
		p.gender,
		p.spayneuter,
		p.birthday,
		b.breedname,
		p.color,
		p.insurancecard,
		o.firstname,
		o.lastname,
		o.mailingaddress,
		o.city,
		o.state,
		o.zipcode,
		o.firstphonenum,
		o.secondphonenum,
		i.company
		
		FROM pet p

		FULL OUTER JOIN owner o ON p.owner_id = o.owner_id
		FULL OUTER JOIN insurance i ON p.insurance_id = i.insurance_id
		FULL OUTER JOIN breed b ON p.breed_id = b.breed_id

		WHERE p.name=$1 AND o.owner_id=$2
	`;
  // $1 = petName & $2 = ownerName
  const queryParams = [newPetName, sendOwn];

  db.query(clientTable, queryParams)
    .then(result => {
      res.locals.sendClient = result.rows[0];
      return next();
    })
    .catch((err) => {
      console.error(err.stack, 'Sorry! Client not found!');
    });
};
// artemisController.deleteClient = (req, res, next) => {
// };

module.exports = artemisController;
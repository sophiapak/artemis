import React, { Component } from 'react';
import Display from './components/Display.jsx';
import axios from 'axios';

class App extends Component {
	constructor() {
		super()
		this.state = {
			petName: '',
			ownerName: '',
			client: {},
			addClient: {
				petName: '',
				petGender: '',
				petSpayNeuter: '',
				petBirthday: '',
				petBreed: '',
				petColor: '',
				ownerExisting: '',
				ownerFirstName: '',
				ownerLastName: '',
				ownerAddress: '',
				ownerCity: '',
				ownerState: '',
				ownerZipcode: '',
				ownerFirstPhoneNum: '',
				ownerSecondPhoneNum: '',
				insCompany: '',
				petInsuranceCard: '',
			},
			addContainer: false,
			breeds: [],
			owners: [],
		}

		this.onChangePetName = this.onChangePetName.bind(this);
		this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.addComponent = this.addComponent.bind(this);
		this.hideComponent = this.hideComponent.bind(this);
		this.breedOptions = this.breedOptions.bind(this);
		this.addSubmit = this.addSubmit.bind(this);
		this.changePetName = this.changePetName.bind(this);
		this.changePetGender = this.changePetGender.bind(this);
		this.changePetSpayNeuter = this.changePetSpayNeuter.bind(this);
		this.changePetBirthday = this.changePetBirthday.bind(this);
		this.changePetBreed = this.changePetBreed.bind(this);
		this.changePetColor = this.changePetColor.bind(this);
		this.changeOwnerExisting = this.changeOwnerExisting.bind(this);
		this.changeOwnerFirstName = this.changeOwnerFirstName.bind(this);
		this.changeOwnerLastName = this.changeOwnerLastName.bind(this);
		this.changeOwnerAddress = this.changeOwnerAddress.bind(this);
		this.changeOwnerCity = this.changeOwnerCity.bind(this);
		this.changeOwnerState = this.changeOwnerState.bind(this);
		this.changeOwnerZipcode = this.changeOwnerZipcode.bind(this);
		this.changeOwnerFirstPhoneNum = this.changeOwnerFirstPhoneNum.bind(this);
		this.changeOwnerSecondPhoneNum = this.changeOwnerSecondPhoneNum.bind(this);
		this.changeInsCompany = this.changeInsCompany.bind(this);
		this.changePetInsuranceCard = this.changePetInsuranceCard.bind(this);

	}

	componentDidMount() {
		axios.get('/breed')
			.then((result) => {
				// console.log('RESULT.DATA: ', result.data)
					this.setState({
						breeds: result.data,
					})
			})
			.catch((err) => {
				console.log('Error in App axios get request: ', err);
			});

		axios.get('/owners')
			.then((result) => {
				console.log('RESULT.DATA: ', result.data)
					this.setState({
						owners: result.data,
					})
			})
			.catch((err) => {
				console.log('Error in App axios get request: ', err);
			});
	}

	onChangePetName(e) {
		this.setState({ petName: e.target.value })
	}

	onChangeOwnerName(e) {
		this.setState({ ownerName: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()

		const clientObject = {
			petName: this.state.petName,
			ownerName: this.state.ownerName,
		};

		// console.log('CLIENTOBJECT: ', clientObject)

		axios.post('/find', clientObject)
			.then((result) => {
				if (typeof result.data === 'string') {
					this.setState({
						componentDisplay: 'OFF',
						petName: '',
						ownerName: '',
						addContainer: false,
					})
				}
				if (typeof result.data === 'object') {
					this.setState({
						client: result.data,
						componentDisplay: 'ON',
						petName: '',
						ownerName: '',
						addContainer: false,
					})
				}
				// console.log('CLIENT DATA: ', typeof result.data)
				// console.log('COMPONENTDISPLAY: ', this.state.componentDisplay)
			})
			.catch((err) => {
				console.log('Error in App axios post request: ', err);
			})
	}

	addComponent(e) {
		this.setState({
			addContainer: !this.state.addContainer,
		})
	}

	hideComponent(e) {
		this.setState({
			addContainer: false,
		})
	}

	breedOptions() {
		return this.state.breeds.map((breed, index) => {
			return (
			<option value={index + 1}>{breed}</option>
			)
		})
	}

	ownerOptions() {
		return this.state.owners.map((owner) => {
			return (
			<option value={owner.ownerid}>{owner.name}</option>
			)
		})
	}

	changePetName(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				petName: e.target.value,
			},
		});
	}

	changePetGender(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				petGender: e.target.value,
			},
		});
	}

	changePetSpayNeuter(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				petSpayNeuter: e.target.value,
			},
		});
	}

	changePetBirthday(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				petBirthday: e.target.value,
			},
		});
	}
	
	changePetBreed(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				petBreed: e.target.value,
			},
		});
	}

	changeOwnerExisting(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerExisting: e.target.value,
			},
		});
	}


	changePetColor(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				petColor: e.target.value,
			},
		});
	}

	changeOwnerFirstName(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerFirstName: e.target.value,
			},
		});
	}

	changeOwnerLastName(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerLastName: e.target.value,
			},
		});
	}

	changeOwnerAddress(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerAddress: e.target.value,
			},
		});
	}

	changeOwnerCity(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerCity: e.target.value,
			},
		});
	}

	changeOwnerState(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerState: e.target.value,
			},
		});
	}

	changeOwnerZipcode(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerZipcode: e.target.value,
			},
		});
	}

	changeOwnerFirstPhoneNum(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerFirstPhoneNum: e.target.value,
			},
		});
	}

	changeOwnerSecondPhoneNum(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				ownerSecondPhoneNum: e.target.value,
			},
		});
	}

	changeInsCompany(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				insCompany: e.target.value,
			},
		});
	}

	changePetInsuranceCard(e) {
		this.setState({ 
			addClient: {
				...this.state.addClient,
				petInsuranceCard: e.target.value,
			},
		});
	}


	addSubmit(e) {
		e.preventDefault()

		const addClientObject = this.state.addClient;

		console.log('ADDCLIENTOBJECT: ', addClientObject)

		axios.post('/add', addClientObject)
			.then((result) => {
				this.setState({
					client: result.data,
					componentDisplay: 'ON',
					addContainer: false,
				})
				
				console.log('POST REQUEST RESULT: ', result)
			})
			.catch((err) => {
				console.log('Error in App axios post request: ', err);
			})
	}

	render() {
		return (
			<div id="mainContainer">
				<div id="searchBar">
					<form id="interactiveContainer" onSubmit={this.onSubmit}>
						<input className="searchField" name='petName' type='text' placeholder="Pet's Name" value={this.state.petName} onChange={this.onChangePetName} />
						<input className="searchField" name='ownerName' type='text' placeholder="Owner's Last Name" value={this.state.ownerName} onChange={this.onChangeOwnerName} />
						<input id='search' type="submit" value='Search' onClick={this.hideComponent} />
					</form>
				</div>
				
				<a id="addOption" href="#" onClick={this.addComponent}>ADD CLIENT</a>

				{(this.state.componentDisplay === 'ON') ?
					<Display
						petId={this.state.client.id}
						petName={this.state.client.name}
						petGender={this.state.client.gender}
						petSpayNeuter={this.state.client.spayneuter}
						petBirthday={this.state.client.birthday}
						petBreed={this.state.client.breedname}
						petColor={this.state.client.color}
						petInsuranceCard={this.state.client.insurancecard}
						ownerFirstName={this.state.client.firstname}
						ownerLastName={this.state.client.lastname}
						ownerAddress={this.state.client.mailingaddress}
						ownerCity={this.state.client.city}
						ownerState={this.state.client.state}
						ownerZipcode={this.state.client.zipcode}
						ownerFirstPhoneNum={this.state.client.firstphonenum}
						ownerSecondPhoneNum={this.state.client.secondphonenum}
						insCompany={this.state.client.company}
					/> : null
				}

				{(this.state.componentDisplay === 'OFF') ?
					<div id="notFoundNotice">
						<p>CLIENT DOES NOT EXIST</p>
					</div> : null
				}

				{(this.state.addContainer === true) ? 
					<div id="addBar">
						<form id="addContainer" onSubmit={this.addSubmit}>
							<input className="searchField" name='petName' type='text' placeholder="Pet's Name" onChange={this.changePetName}/>
							<select name="petGender" className="dropDown" onChange={this.changePetGender}>
								<option value="" disabled selected>Pet's Gender</option>
								<option value="M">M</option>
								<option value="F">F</option>
							</select>
							<select name="petSpayNeuter" className="dropDown" onChange={this.changePetSpayNeuter}>
								<option value="" disabled selected>Spayed/Neutered</option>
								<option value="Y">Y</option>
								<option value="N">N</option>
							</select>
							<input className="searchField" name='birthday' type='text' placeholder="Pet's Birthday (YYYY-MM-DD)" onChange={this.changePetBirthday}/>
							<select name="petBreed" className="dropDown" onChange={this.changePetBreed}>
								<option value="" disabled selected>Breed</option>
								{this.breedOptions()}
							</select>
							<input className="searchField" name='petColor' type='text' placeholder="Color" onChange={this.changePetColor}/>
							<select name="insCompany" className="dropDown" onChange={this.changeInsCompany}>
								<option value="" disabled selected>Insurance Company</option>
								<option value="1">Nationwide</option>
								<option value="2">Healthy Paws</option>
								<option value="3">Embrace</option>
								<option value="4">Pets Best</option>
								<option value="5">Petplan</option>
								<option value="">Not Insured</option>
							</select>
							<input className="searchField" name='petInsuranceCard' type='text' placeholder="Insurance Card Number" onChange={this.changePetInsuranceCard}/>
							<select name="existingOwner" className="dropDown" onChange={this.changeOwnerExisting}>
								<option value="" disabled selected>Add Pet to Existing Owner</option>
								{this.ownerOptions()}
							</select>
							<input className="searchField" name='ownerFirstName' type='text' placeholder="Owner's First Name" onChange={this.changeOwnerFirstName}/>
							<input className="searchField" name='ownerLastName' type='text' placeholder="Owner's Last Name" onChange={this.changeOwnerLastName}/>
							<input className="searchField" name='ownerAddress' type='text' placeholder="Mailing Address" onChange={this.changeOwnerAddress}/>
							<input className="searchField" name='ownerCity' type='text' placeholder="City" onChange={this.changeOwnerCity}/>
							<select name="states" className="dropDown" onChange={this.changeOwnerState}>
								<option value="" disabled selected>State</option>
								<option value="AL">Alabama</option>
								<option value="AK">Alaska</option>
								<option value="AZ">Arizona</option>
								<option value="AR">Arkansas</option>
								<option value="CA">California</option>
								<option value="CO">Colorado</option>
								<option value="CT">Connecticut</option>
								<option value="DE">Delaware</option>
								<option value="DC">District Of Columbia</option>
								<option value="FL">Florida</option>
								<option value="GA">Georgia</option>
								<option value="HI">Hawaii</option>
								<option value="ID">Idaho</option>
								<option value="IL">Illinois</option>
								<option value="IN">Indiana</option>
								<option value="IA">Iowa</option>
								<option value="KS">Kansas</option>
								<option value="KY">Kentucky</option>
								<option value="LA">Louisiana</option>
								<option value="ME">Maine</option>
								<option value="MD">Maryland</option>
								<option value="MA">Massachusetts</option>
								<option value="MI">Michigan</option>
								<option value="MN">Minnesota</option>
								<option value="MS">Mississippi</option>
								<option value="MO">Missouri</option>
								<option value="MT">Montana</option>
								<option value="NE">Nebraska</option>
								<option value="NV">Nevada</option>
								<option value="NH">New Hampshire</option>
								<option value="NJ">New Jersey</option>
								<option value="NM">New Mexico</option>
								<option value="NY">New York</option>
								<option value="NC">North Carolina</option>
								<option value="ND">North Dakota</option>
								<option value="OH">Ohio</option>
								<option value="OK">Oklahoma</option>
								<option value="OR">Oregon</option>
								<option value="PA">Pennsylvania</option>
								<option value="RI">Rhode Island</option>
								<option value="SC">South Carolina</option>
								<option value="SD">South Dakota</option>
								<option value="TN">Tennessee</option>
								<option value="TX">Texas</option>
								<option value="UT">Utah</option>
								<option value="VT">Vermont</option>
								<option value="VA">Virginia</option>
								<option value="WA">Washington</option>
								<option value="WV">West Virginia</option>
								<option value="WI">Wisconsin</option>
								<option value="WY">Wyoming</option>
							</select>
							<input className="searchField" name='ownerZipcode' type='text' placeholder="Zipcode" onChange={this.changeOwnerZipcode}/>
							<input className="searchField" name='ownerFirstPhoneNum' type='text' placeholder="Primary Phone Number" onChange={this.changeOwnerFirstPhoneNum}/>
							<input className="searchField" name='ownerSecondPhoneNum' type='text' placeholder="Secondary Phone Number" onChange={this.changeOwnerSecondPhoneNum}/>

							<input id='search' type="submit" value='Add' />
						</form>
					</div> : null
				}
			</div>
		);
	}

	// render() {
	// 	return (
	// 		<div>
	// 			<div>
	// 				<form id="interactiveContainer" method='post' action='/find'>
	// 					<input className="searchField" name='petName' type='text' placeholder="Pet's Name" />
	// 					<input className="searchField" name='ownerName' type='text' placeholder="Owner's Last Name" />
	// 					<input id='search' type='submit' value='Search' />
	// 				</form>
	// 			</div>
	// 			{ !(this.state.componentDisplay === false) ? <Display client={this.state.client} /> : null }
	// 		</div>
	// 	);
	// }
};

export default App;
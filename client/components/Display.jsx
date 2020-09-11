import React from 'react';

const Display = (props) => {
	const clientData = 1;
	return (
	<div id="displayContent">
		<table id="resultTable">
			<tbody>
				<tr>{renderTableHeader()}</tr>
				{renderTableBody(props)}
			</tbody>
		</table>
	</div>
	);
};

const renderTableHeader = () => {
	const headerElement = ['ID', "Name", 'Gender', 'Spayed/Neutered', 'Birthday', 'Breed', 'Color', 'Insurance Card', "Owner's First Name", "Owner's Last Name", "Mailing Address", "City", "State", "Zipcode", "Primary Phone Number", "Secondary Phone Number", "Insurance Company"];

	return headerElement.map((element, index) => {
		return (
			<th key={index}>{element.toUpperCase()}</th>
		)
	});
};

const renderTableBody = (props) => {
	const { petId, petName, petGender, petSpayNeuter, petBirthday, petBreed, petColor, petInsuranceCard, ownerFirstName, ownerLastName, ownerAddress, ownerCity, ownerState, ownerZipcode, ownerFirstPhoneNum, ownerSecondPhoneNum, insCompany } = props;

	return (
		<tr key={petId}>
			<td>{petId}</td>
			<td>{petName}</td>
			<td>{petGender}</td>
			<td>{petSpayNeuter}</td>
			<td>{petBirthday}</td>
			<td>{petBreed}</td>
			<td>{petColor}</td>
			<td>{petInsuranceCard}</td>
			<td>{ownerFirstName}</td>
			<td>{ownerLastName}</td>
			<td>{ownerAddress}</td>
			<td>{ownerCity}</td>
			<td>{ownerState}</td>
			<td>{ownerZipcode}</td>
			<td>{ownerFirstPhoneNum}</td>
			<td>{ownerSecondPhoneNum}</td>
			<td>{insCompany}</td>
		</tr>
	)
};

export default Display;
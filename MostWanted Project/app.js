// PRO TIP: To quickly navigate to a function, right click on its name and select "Go to Definition"

function app(people) {
	//debugger;
	// let searchResults = people.map(p => p.occupation);
	// let uniqueResults = [...new Set(searchResults)];
	// alert(uniqueResults);
	displayWelcome();
	runSearchAndMenu(people);
	return exitOrRestart(people);
}

function displayWelcome() {
	alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
	const searchResults = searchPeopleDataSet(people);

	if (searchResults.length > 1) {
		displayPeople('Search Results', searchResults);
	} else if (searchResults.length === 1) {
		const person = searchResults[0];
		mainMenu(person, people);
	} else {
		alert('No one was found in the search.');
	}
}

function searchPeopleDataSet(people) {
	const searchTypeChoice = validatedPrompt(
		'Please enter in what type of search you would like to perform.',
		['id', 'name', 'trait'],
	);

	let results = [];
	switch (searchTypeChoice) {
		case 'id':
			results = searchById(people);
			break;
		case 'name':
			results = searchByName(people);
			break;
		case 'trait':			
			results = searchByTraits(people);
			break;
		// default:
		// 	return searchPeopleDataSet(people);
	}

	return results;
}

function searchById(people) {
	//const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
	//const idToSearchForInt = parseInt(idToSearchForString);
	const idToSearchForInt = 888201200;
	const idFilterResults = people.filter((person) => person.id === idToSearchForInt);
	return idFilterResults;
}

function searchByName(people) {
	const firstNameToSearchFor = prompt(
		'Please enter the the first name of the person you are searching for.',
	);
	const lastNameToSearchFor = prompt(
		'Please enter the the last name of the person you are searching for.',
	);
	const fullNameSearchResults = people.filter(
		(person) =>
			person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
			person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase(),
	);
	return fullNameSearchResults;
}

function searchByTraits(people) {
	const traitToSearch = validatedPrompt(
		'Please enter trait type to add to your search:\nGender->(1),  Height->(2),  Eye_Color->(3)  or Occupation->(4)',
		['1', '2', '3', '4', 'exit'],
	);

	let results = [];
	switch (traitToSearch) {
		case '1':
			results = searchByGender(people);
			break;
		case '2':
			results = searchByHeight(people);
			break;
		case '3':
			results = searchByEyeColor(people);
			break;
		case '4':
			results = searchByOccupation(people);
			break;
		case 'exit':
			return;
		// default:
		// 	return searchByTraits(people);
	}
	
	return results;
}

function searchByGender(people) {	
	const genderToSelect = validatedPrompt(
		'Please enter gender to search for or back to return to traits menu', 
		['male', 'female', 'back'],
	);
	
	switch(genderToSelect) {
		case 'male':		
		case 'female':
			const genderSearchResults = people.filter((p) => p.gender === genderToSelect);
			return genderSearchResults;						
		case 'back':
			return searchByTraits(people);
		// default:
		// 	return searchByGender(people);			
	}
}

function searchByHeight(people) {
	const heightToSearchString = prompt('Please enter the height(inches) of the person you are searching for.  Results will display anyone within 3 inches of your entry.');
	const heightToSearchInt = parseInt(heightToSearchString);
	
	const heightFilterResults = people.filter(
		(p) => 
			p.height < heightToSearchInt + 3 &&
			p.height > heightToSearchInt - 3
	);
	return heightFilterResults;		
}

function searchByEyeColor(people) {
	const eyeColorSelection = validatedPrompt(
		'Please enter eye color to search for or back to return to traits menu',
		['black', 'blue', 'brown', 'green', 'hazel'],
	);

	switch(eyeColorSelection) {
		case 'black':			
		case 'blue':
		case 'brown':			
		case 'green':
		case 'hazel':
			const eyeColorSearchResults = people.filter((p) => p.eyeColor === eyeColorSelection);
			return eyeColorSearchResults;
		case 'back':
			return searchByTraits(people);
		// default:
		// 	return searchByEyeColor(people);
	}
}

function searchByOccupation(people) {
	const occupationSelection = validatedPrompt(
		'Please enter occupation from list to search or back to return to traits menu',
		['programmer','assistant','landscaper','nurse','student','architect','doctor','politician'],
	);

	switch(occupationSelection) {
		case 'programmer':			
		case 'assistant':
		case 'landscaper':			
		case 'nurse':
		case 'student':
		case 'architect':			
		case 'doctor':
		case 'politician':
			const occupationSearchResults = people.filter((p) => p.occupation === occupationSelection);
			return occupationSearchResults;
		case 'back':
			return searchByTraits(people);
	}
}

function mainMenu(person, people) {
	const mainMenuUserActionChoice = validatedPrompt(
		`Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
		['info', 'family', 'descendants', 'quit'],
	);

	switch (mainMenuUserActionChoice) {
		case 'info':
			//! TODO
			displayPersonInfo(person);
			break;
		case 'family':
			//! TODO
			// let personFamily = findPersonFamily(person, people);
			// displayPeople('Family', personFamily);
			break;
		case 'descendants':
			//! TODO
			// let personDescendants = findPersonDescendants(person, people);
			// displayPeople('Descendants', personDescendants);
			break;
		case 'quit':
			return;
		default:
			alert('Invalid input. Please try again.');
	}

	return mainMenu(person, people);
}

function displayPersonInfo(person){
	
	let personInfo =
	 `
	 id:  ${person.id}
	 Name:  ${person.lastName}, ${person.firstName}
	 Gender:  ${person.gender}
	 D.O.B:  ${person.dob}
	 Height:  ${person.height}in  Weight: ${person.weight}lbs
	 EyeColor:  ${person.eyeColor}
	 Occupation:  ${person.occupation}`;

	
	alert(personInfo);
}

function displayPeople(displayTitle, peopleToDisplay) {
	const formatedPeopleDisplayText = peopleToDisplay
		.map((person) => `${person.firstName} ${person.lastName}`)
		.join('\n');
	alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
	acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

	const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
		.map((aa) => `\n-> ${aa}`)
		.join('')}`;

	const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

	if (acceptableAnswers.includes(userResponse)) {
		return userResponse;
	} else {
		alert(
			`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
				.map((aa) => `\n-> ${aa}`)
				.join('')} \n\nPlease try again.`,
		);
		return validatedPrompt(message, acceptableAnswers);
	}
}

function exitOrRestart(people) {
	const userExitOrRestartChoice = validatedPrompt('Would you like to exit or restart?', [
		'exit',
		'restart',
	]);

	switch (userExitOrRestartChoice) {
		case 'exit':
			return;
		case 'restart':
			return app(people);
		default:
			alert('Invalid input. Please try again.');
			return exitOrRestart(people);
	}
}

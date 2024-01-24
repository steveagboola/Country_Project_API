console.log("This is index.js");


// Call the pageLoader function to load the page
pageLoader();

// Function to set all of the events and initial setup
function pageLoader() {
    console.log('Setting up our Country Information page');

    let countryForm = document.getElementById('country-form');
    countryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let countryName = document.getElementById('country-name').value.trim();
        if (countryName) {
            fetchCountryData(countryName);
        }
    });
}

function fetchCountryData(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => displayCountryData(data[0]))
        .catch(error => displayError(error.message));
}

function displayCountryData(country) {
    const countryInfoDiv = document.getElementById('country-info');
    countryInfoDiv.innerHTML = `
${country.name.common}
        <img src="${country.flags.svg}" alt="Flag">
        ${country.coatOfArms.svg ? `<img src="${country.coatOfArms.svg}" alt="Coat of Arms">` : ''}

        Currencies: ${Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')}
        Capital: ${country.capital}
        Languages: ${Object.values(country.languages).map(lang => lang).join(', ')}
    `;
}
        



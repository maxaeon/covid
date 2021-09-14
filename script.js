
// https://api.covidactnow.org/v2/states.json?apiKey=YOUR_KEY_HERE

var baseURL                 = 'https://api.covidactnow.org/v2';
var apiKey                  = '?apiKey=15bb291f94e449c7973d0131c7989297';
var nationalData            = '/country/US.json';
var statesData              = '/states.json';
var countiesData            = '/counties.json';
var singleCountyData        = '/county/{fips}.json';
var inputText               = document.getElementById('input-text');
var submitBtn               = document.getElementById('submit');
var cases                   = document.getElementById('cases');
var deaths                  = document.getElementById('state-deaths');
var deathsHeader            = document.getElementById('deaths-header');
var hospitalizations        = document.getElementById('state-hospitalizations');
var hospitalizationHeader   = document.getElementById('hospitalization-header');
var icuData                 = document.getElementById('icu-data');
var icuHeader               = document.getElementById('icu-header');
var hospitalBedData         = document.getElementById('hospital-bed-data');
var vaccineData             = document.getElementById('vaccine-data');
var vaccineHeader           = document.getElementById('vaccine-header');
var totalNationalCases      = document.getElementById('national-total-cases');
var totalNationalNewCases   = document.getElementById('national-new-cases');
var nationalFullyVaccinated = document.getElementById('fully-vaccinated');
var nationalSingleDose      = document.getElementById('single-dose');
var nationalHospitalization = document.getElementById('hospitalizations');
var nationalDeaths          = document.getElementById('deaths');
var dropdown                = document.getElementById('dropdown');
var dropdownMenu            = document.getElementById('dropdown-menu');
var dataCards               = document.getElementById('data-cards');
var selectBtn               = document.getElementById('select-button');
var selectText              = document.getElementsByClassName('select');
var dropdownContent         = document.getElementsByClassName('dropdown-content');
var continentDeaths         = document.getElementById('continent-deaths');
var continentCases          = document.getElementById('continent-cases');

// US states and abbreviations.
var usStates = [
    { name: 'ALABAMA', abbreviation: 'AL'},
    { name: 'ALASKA', abbreviation: 'AK'},
    { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
    { name: 'ARIZONA', abbreviation: 'AZ'},
    { name: 'ARKANSAS', abbreviation: 'AR'},
    { name: 'CALIFORNIA', abbreviation: 'CA'},
    { name: 'COLORADO', abbreviation: 'CO'},
    { name: 'CONNECTICUT', abbreviation: 'CT'},
    { name: 'DELAWARE', abbreviation: 'DE'},
    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
    { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
    { name: 'FLORIDA', abbreviation: 'FL'},
    { name: 'GEORGIA', abbreviation: 'GA'},
    { name: 'GUAM', abbreviation: 'GU'},
    { name: 'HAWAII', abbreviation: 'HI'},
    { name: 'IDAHO', abbreviation: 'ID'},
    { name: 'ILLINOIS', abbreviation: 'IL'},
    { name: 'INDIANA', abbreviation: 'IN'},
    { name: 'IOWA', abbreviation: 'IA'},
    { name: 'KANSAS', abbreviation: 'KS'},
    { name: 'KENTUCKY', abbreviation: 'KY'},
    { name: 'LOUISIANA', abbreviation: 'LA'},
    { name: 'MAINE', abbreviation: 'ME'},
    { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
    { name: 'MARYLAND', abbreviation: 'MD'},
    { name: 'MASSACHUSETTS', abbreviation: 'MA'},
    { name: 'MICHIGAN', abbreviation: 'MI'},
    { name: 'MINNESOTA', abbreviation: 'MN'},
    { name: 'MISSISSIPPI', abbreviation: 'MS'},
    { name: 'MISSOURI', abbreviation: 'MO'},
    { name: 'MONTANA', abbreviation: 'MT'},
    { name: 'NEBRASKA', abbreviation: 'NE'},
    { name: 'NEVADA', abbreviation: 'NV'},
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
    { name: 'NEW JERSEY', abbreviation: 'NJ'},
    { name: 'NEW MEXICO', abbreviation: 'NM'},
    { name: 'NEW YORK', abbreviation: 'NY'},
    { name: 'NORTH CAROLINA', abbreviation: 'NC'},
    { name: 'NORTH DAKOTA', abbreviation: 'ND'},
    { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
    { name: 'OHIO', abbreviation: 'OH'},
    { name: 'OKLAHOMA', abbreviation: 'OK'},
    { name: 'OREGON', abbreviation: 'OR'},
    { name: 'PALAU', abbreviation: 'PW'},
    { name: 'PENNSYLVANIA', abbreviation: 'PA'},
    { name: 'PUERTO RICO', abbreviation: 'PR'},
    { name: 'RHODE ISLAND', abbreviation: 'RI'},
    { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
    { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
    { name: 'TENNESSEE', abbreviation: 'TN'},
    { name: 'TEXAS', abbreviation: 'TX'},
    { name: 'UTAH', abbreviation: 'UT'},
    { name: 'VERMONT', abbreviation: 'VT'},
    { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
    { name: 'VIRGINIA', abbreviation: 'VA'},
    { name: 'WASHINGTON', abbreviation: 'WA'},
    { name: 'WEST VIRGINIA', abbreviation: 'WV'},
    { name: 'WISCONSIN', abbreviation: 'WI'},
    { name: 'WYOMING', abbreviation: 'WY' }
]

// Listening to a change in state.
dropdown.addEventListener('change', function(e) {
    var selectedState = dropdown.value;
    var locationInput = selectedState.toUpperCase().trim();
    for (var i = 0; i < usStates.length; i++) {
        if (locationInput === usStates[i].name) {
            // get state abbreviation
            var stateAbbr = usStates[i].abbreviation;
            // Showing the data cards to the web page
            dataCards.classList.remove('is-hidden');    
            getStateData(stateAbbr, selectedState);
        }
    }
})

// Fetching national data from API.
function getNationalData() {
    fetch(baseURL + nationalData + apiKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            renderNationalData(data);
            return data;
        })
}

// Rendering national data to the webpage.
function renderNationalData(data) {
    totalNationalCases.innerText      = data.actuals.cases.toLocaleString('en-US');
    totalNationalNewCases.innerText   = data.actuals.newCases.toLocaleString('en-US');
    nationalFullyVaccinated.innerText = data.actuals.vaccinationsCompleted.toLocaleString('en-US');
    nationalSingleDose.innerText      = data.actuals.vaccinationsInitiated.toLocaleString('en-US');
    nationalHospitalization.innerText = data.actuals.hospitalBeds.currentUsageTotal.toLocaleString('en-US');
    nationalDeaths.innerText          = data.actuals.deaths.toLocaleString('en-US');
}

// Fetching state data from API.
function getStateData(state, stateName) {
    fetch(baseURL + '/state/' + state + '.timeseries.json' + apiKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            renderStateData(data, stateName);
            return data;
        })
}

// Rendering state data to the webpage.
function renderStateData(data, stateName) {
    icuHeader.innerText             = stateName;
    vaccineHeader.innerText         = stateName;
    hospitalizationHeader.innerText = stateName;
    deathsHeader.innerText          = stateName;

    icuData.innerText = 'There are ' + (data.actuals.icuBeds.capacity - data.actuals.icuBeds.currentUsageTotal).toLocaleString('en-US') + ' ICU bed(s) available.';
    vaccineData.innerText = data.actuals.vaccinesAdministered.toLocaleString('en-US') + ' COVID-19 vaccinations have been administered.';
    deaths.innerText = data.actuals.deaths.toLocaleString('en-US') + ' people have died from COVID-19.';
    hospitalizations.innerText = Math.round((data.actuals.hospitalBeds.currentUsageCovid / data.actuals.hospitalBeds.capacity) * 100)+'% of hospitalizations are COVID-19 cases.';
}

// Fetching continent data from API.
function getContinentData() {

    fetch("https://covid-api.mmediagroup.fr/v1/cases?continent=North America")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        renderContinentData(data);
    })

}

// Render continent data.
function renderContinentData(data) {
    var continentCasesArray  = [];
    var continentDeathsArray = [];
    for (var country in data) {
        continentCasesArray.push(data[country]['All']['confirmed']);
        continentDeathsArray.push(data[country]['All']['deaths']);
    }

    var continentCasesCount  = 0;
    var continentDeathsCount = 0;

    // Getting sum of continent cases.
    for (var i = 0; i < continentCasesArray.length; i++) {
        continentCasesCount += continentCasesArray[i];
        console.log(continentCasesCount);
        continentCases.innerText = continentCasesCount.toLocaleString('en-US');
    }

    // Getting sum of continent deaths.
    for (var i = 0; i < continentDeathsArray.length; i++) {
        continentDeathsCount += continentDeathsArray[i];
        continentDeaths.innerText = continentDeathsCount.toLocaleString('en-US');
    }
}

// Calling function to display US national data.
getNationalData();
// Calling function to display North America data.
getContinentData()



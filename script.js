
// https://api.covidactnow.org/v2/states.json?apiKey=YOUR_KEY_HERE

var baseURL          = 'https://api.covidactnow.org/v2';
var apiKey           = '?apiKey=15bb291f94e449c7973d0131c7989297';
var statesData       = '/states.json';
var singleStateData  = '/state/{state}.json';
var countiesData     = '/counties.json';
var singleCountyData = '/county/{fips}.json';
var inputText        = document.getElementById('input-text');
var submitBtn        = document.getElementById('submit');
var cases            = document.getElementById('cases');
var icuData          = document.getElementById('icu-data');
var hospitalBedData  = document.getElementById('hospital-bed-data');
var vaccineData      = document.getElementById('vaccine-data');
var nationCasesData  = document.getElementById('nation-cases');

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

submitBtn.addEventListener('click', function() {
    if (inputText.value) {
        var locationInput = inputText.value.toUpperCase().trim();
        // check if locationInput is in usStates array
        for (var i = 0; i < usStates.length; i++) {
            if (locationInput === usStates[i].name) {
                // get state abbreviation
                var stateAbbr = usStates[i].abbreviation;
                getStateData(stateAbbr);
            }
        }
    } else {
        console.log('no location entered');
    }
    
});

function getStateData(state) {
    fetch(baseURL + '/state/' + state + '.json' + apiKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            getStateCases(data);
            getStateHospitalizations(data);
            getStateVaccinesCompleted(data);
            getStateVaccinesInitiated(data);
            getStateVaccinesDistributed(data);
            getStateVaccinesAdministered(data);
            return data;
        })

}

function getStateCases(state) {
    var pTag = document.createElement('p');
    pTag.innerText = 'You have had ' + state.actuals.cases.toLocaleString('en-US') + ' cases in your area.';
    cases.appendChild(pTag);
}

function getStateHospitalizations(state) {
    console.log(state.actuals.icuBeds.capacity.toLocaleString('en-US'));
}

function getStateVaccinesCompleted(state) {
    var pTag = document.createElement('p');
    pTag.innerText = 'Vaccinations completed ' + state.actuals.vaccinationsCompleted.toLocaleString('en-US');
    vaccineData.appendChild(pTag);
}

function getStateVaccinesInitiated(state) {
    var pTag = document.createElement('p');
    pTag.innerText = 'Vaccinations initiated ' + state.actuals.vaccinationsInitiated.toLocaleString('en-US');
    vaccineData.appendChild(pTag);
}

function getStateVaccinesDistributed(state) {
    var pTag = document.createElement('p');
    pTag.innerText = 'Vaccinations distributed ' + state.actuals.vaccinesDistributed.toLocaleString('en-US');
    vaccineData.appendChild(pTag);
}

function getStateVaccinesAdministered(state) {
    var pTag = document.createElement('p');
    pTag.innerText = 'Vaccinations administered ' + state.actuals.vaccinesAdministered.toLocaleString('en-US');
    vaccineData.appendChild(pTag);
    console.log(state.annotations.vaccinesAdministered.sources[0].name);
}

// Array of data we want to output
    // cases

    // hospitalizations
        // hospitalBeds capacity
        // currentUsageTotal
        // currentUsageCovid

        //icuBeds
            // capacity
            // currentUsageTotal
            // currentUsageCovid

    // vaccinations
        // vaccinationsInitiated
        // vaccinationsCompleted
        // vaccinesAdministered

    // deaths

// Identify user location using IP to suggest location data


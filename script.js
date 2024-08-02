// Load the JSON data
let data = [];
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(json => {
        data = json;
        console.log('Data loaded:', data); // Log the loaded data
    })
    .catch(error => console.error('Error loading data:', error));

const suburbInput = document.getElementById('suburb-input');
const suggestions = document.getElementById('suggestions');
const result = document.getElementById('result');
const zone = document.getElementById('zone');
const run = document.getElementById('run');
const postcode = document.getElementById('postcode');

suburbInput.addEventListener('input', function() {
    const input = suburbInput.value.toLowerCase();
    console.log('Input:', input); // Log the input value
    suggestions.innerHTML = '';

    if (input.length === 0) {
        result.style.display = 'none';
        return;
    }

     const matchedSuburbs = data.filter(item => 
        item.Suburb.toLowerCase().startsWith(input) || (item.Postcode && item.Postcode.toString().startsWith(input))
    );
    console.log('Matched Suburbs:', matchedSuburbs); // Log the matched suburbs
    
    if (matchedSuburbs.length === 0) {
        const noResult = document.createElement('div');
        noResult.innerHTML = `
            No suburb matched. Note:
            <br>GOS postcode: 2250 to 2263
            <br>NTL postcode: 2264 to 2327
            <br>WOL postcode: 2500 to 2533
        `;        
        suggestions.appendChild(noResult);
    } else {
        matchedSuburbs.forEach(suburb => {
            const suggestion = document.createElement('div');
            suggestion.textContent = `${suburb.Suburb} (${suburb.Postcode})`;
            suggestion.addEventListener('click', () => {
                suburbInput.value = suburb.Suburb;
                zone.textContent = suburb.Zone;
                run.textContent = suburb.Run;
                postcode.textContent = suburb.Postcode;
                result.style.display = 'block';
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(suggestion);
        });
    }
});

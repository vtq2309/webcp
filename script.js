document.addEventListener('DOMContentLoaded', () => {
    let data = [];
    
    // Tải dữ liệu từ file data.json
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            data = json;
            console.log('Data loaded:', data); // Ghi lại dữ liệu đã tải
        })
        .catch(error => console.error('Error loading data:', error));

    const suburbInput = document.getElementById('suburb-input');
    const suggestions = document.getElementById('suggestions');
    const result = document.getElementById('result');
    const suburbName = document.getElementById('suburb');
    const zone = document.getElementById('zone');
    const run = document.getElementById('run');
    const postcode = document.getElementById('postcode');

    // Lắng nghe sự kiện khi người dùng nhập vào input
    suburbInput.addEventListener('input', function() {
        const input = suburbInput.value.toLowerCase();
        console.log('Input:', input);
        suggestions.innerHTML = '';

        if (input.length === 0) {
            suggestions.style.display = 'none';
            result.style.display = 'none';
            return;
        }

        const matchedSuburbs = data.filter(item => 
            item.Suburb.toLowerCase().startsWith(input) || (item.Postcode && item.Postcode.toString().startsWith(input))
        );
        console.log('Matched Suburbs:', matchedSuburbs);

        if (matchedSuburbs.length === 0) {
            suggestions.style.display = 'block';
            const noResult = document.createElement('div');
            noResult.innerHTML = `
                No suburb matched. Note:
                <br>GOS postcode: 2250 to 2263
                <br>NTL postcode: 2264 to 2327
                <br>WOL postcode: 2500 to 2533
            `;        
            suggestions.appendChild(noResult);
        } else {
            suggestions.style.display = 'block';
            matchedSuburbs.forEach(suburbItem => {
                const suggestion = document.createElement('div');
                suggestion.textContent = `${suburbItem.Suburb} (${suburbItem.Postcode})`;
                suggestion.addEventListener('click', () => {
                    suburbInput.value = '';
                    suburbName.textContent = suburbItem.Suburb;
                    zone.textContent = suburbItem.Zone;
                    run.textContent = suburbItem.Run;
                    postcode.textContent = suburbItem.Postcode;
                    result.style.display = 'block';
                    suggestions.innerHTML = '';
                    suggestions.style.display = 'none';
                });
                suggestions.appendChild(suggestion);
            });
        }
    });

    // Sự kiện click cho logo, tải lại file index.html
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'index.html'; // Điều hướng tới file index.html
        });
    }
});

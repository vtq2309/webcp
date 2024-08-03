document.addEventListener('DOMContentLoaded', () => {
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
            console.log('Data loaded:', data); // Ghi lại dữ liệu đã tải
        })
        .catch(error => console.error('Error loading data:', error));

    const suburbInput = document.getElementById('suburb-input');
    const suggestions = document.getElementById('suggestions');
    const result = document.getElementById('result');
    const suburbName = document.getElementById('suburb'); // Đổi tên biến để không bị trùng với dữ liệu
    const zone = document.getElementById('zone');
    const run = document.getElementById('run');
    const postcode = document.getElementById('postcode');

    suburbInput.addEventListener('input', function() {
        const input = suburbInput.value.toLowerCase();
        console.log('Input:', input); // Ghi lại giá trị đầu vào
        suggestions.innerHTML = '';

        if (input.length === 0) {
            suggestions.style.display = 'none'; // Ẩn hộp gợi ý khi không có nội dung nhập vào
            result.style.display = 'none';
            return;
        }

        const matchedSuburbs = data.filter(item => 
            item.Suburb.toLowerCase().startsWith(input) || (item.Postcode && item.Postcode.toString().startsWith(input))
        );
        console.log('Matched Suburbs:', matchedSuburbs); // Ghi lại các vùng ngoại ô khớp

        if (matchedSuburbs.length === 0) {
            suggestions.style.display = 'block'; // Hiển thị hộp gợi ý khi có kết quả khớp
            const noResult = document.createElement('div');
            noResult.innerHTML = `
                No suburb matched. Note:
                <br>GOS postcode: 2250 to 2263
                <br>NTL postcode: 2264 to 2327
                <br>WOL postcode: 2500 to 2533
            `;        
            suggestions.appendChild(noResult);
        } else {
            suggestions.style.display = 'block'; // Hiển thị hộp gợi ý khi có kết quả khớp
            matchedSuburbs.forEach(suburbItem => { // Đổi tên biến ở đây để không bị trùng với biến suburb
                const suggestion = document.createElement('div');
                suggestion.textContent = `${suburbItem.Suburb} (${suburbItem.Postcode})`;
                suggestion.addEventListener('click', () => {
                    suburbInput.value = ''; // Xóa ô nhập liệu
                    suburbName.textContent = suburbItem.Suburb; // Hiển thị tên vùng ngoại ô
                    zone.textContent = suburbItem.Zone;
                    run.textContent = suburbItem.Run;
                    postcode.textContent = suburbItem.Postcode;
                    result.style.display = 'block';
                    suggestions.innerHTML = '';
                    suggestions.style.display = 'none'; // Ẩn hộp gợi ý sau khi chọn gợi ý
                });
                suggestions.appendChild(suggestion);
            });
        }
    });
});

// Khai báo các biến để lưu trữ các phần tử HTML cần thiết
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Tự động click khi ấn phím Enter
let myText = document.getElementById("my-text");
let btn = document.getElementById("btn");

myText.addEventListener("keyup", e => {
    e.preventDefault();
    if (e.keyCode === 13) {
        btn.click();
    }
});

// Thêm sự kiện click cho nút tìm kiếm
search.addEventListener('click', () => {

    // Khai báo khóa API của OpenWeatherMap và giá trị nhập vào bởi người dùng
    const APIKey = '95cbedf96ba34371fbd80cb197de0314';
    const city = document.querySelector('.search-box input').value;

    // Nếu người dùng không nhập giá trị cho thành phố, hàm sẽ kết thúc và không làm gì cả
    if (city === '')
        return;

    // Gửi yêu cầu đến API của OpenWeatherMap với URL được xây dựng từ giá trị của thành phố và khóa API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            // Nếu mã trả về là '404', hiển thị thông báo lỗi 404 và ẩn các hộp chi tiết thời tiết
            if (json.cod === '404') {
                container.style.height = '400px';
                const image404 = document.querySelector('.weather-box img');
                
                image404.src = 'images/cat.jpg';
                weatherBox.style.display = '';
                weatherDetails.style.display = 'none';
                error404.style.display = '';
                error404.classList.add('fadeIn');
                return;
            }

            // Ẩn thông báo lỗi 404 và hiển thị các hộp chi tiết thời tiết
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Cập nhật các giá trị cho các phần tử HTML như hình ảnh, nhiệt độ, mô tả, độ ẩm và tốc độ gió
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});



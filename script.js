document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "ce3ac548d34f429449d2e30099507263";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

    const searchField = document.querySelector(".searchBox input");
    const searchButton = document.querySelector(".searchBox button");
    const image = document.getElementById("weather-pic");

//Takes city parameter and constructs a URL to fetch weather data for specified city and includes API key
    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();

            console.log(data);

            document.getElementById("city").innerHTML = data.name;
            document.getElementById("description").innerHTML = data.weather[0].description;
            document.getElementById("current-temp").innerHTML = Math.round(data.main.temp) + "°";
            document.querySelector(".temp-low").innerHTML = Math.round(data.main.temp_min) + "°";
            document.querySelector(".temp-high").innerHTML = Math.round(data.main.temp_max) + "°";
            document.getElementById("humidity-percentage").innerHTML = data.main.humidity + "%";
            document.getElementById("wind-speed").innerHTML = Math.round(data.wind.speed) + " mph";

//Sets Image depending on what weather description is given for specific place in input
            switch (data.weather[0].main) {
                case 'Clear':
                    image.setAttribute('src', "images/sun.png");
                    break;
                case 'Rain':
                    image.setAttribute('src', "images/rain.png");
                    break;
                case 'Clouds':
                    image.setAttribute('src', "images/cloudy.png");
                    break;
                case 'Mist':
                    image.setAttribute('src', "images/mist.png");
                    break;
                case 'Snow':
                    image.setAttribute('src', "images/snowy.png");
                    break;
                case 'Drizzle':
                    image.setAttribute('src', "images/drizzle.png");
                    break;
                default:
                    image.removeAttribute('src');
            }
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    };
//Searches place typed in input after search button is clicked
    searchButton.addEventListener("click", searchCity);
//Listens for when 'Enter' key is press following functions are performed
    searchField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchCity();
            clearInput();
        }
    });
//Searches place that was typed in input
    function searchCity() {
        checkWeather(searchField.value);
    };
//Clears input after place is entered
    function clearInput() {
        document.querySelector(".searchBox input").value = "";
    }

});
/*
document.addEventListener("DOMContentLoaded", function () {
    searchField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchCity();
        }
    })
});
*/
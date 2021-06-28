const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

//anonymous function call Event listener function on keypress
const searchInputBox = document.getElementById('inputbox');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weatherbody').style.display = "block";
    }

});



//Get weather reports 
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);

}


//Show weather report
function showWeatherReport(weather){
    console.log(weather)
    let city=document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minmax = document.getElementById('min-max');
    minmax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType=document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date= document.getElementById('date');
    let todayDate = new Date();
    date.innerHTML = dateManage(todayDate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('Images/sunny.jpg')";
    }
    else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('Images/cloudy.jpg')";
    }
    else if (weatherType.textContent == 'Haze' || weatherType.textContent == 'Mist' ) {
        document.body.style.backgroundImage = "url('Images/haze.jpg')";
    }
    else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('Images/rain.jpg')";
    }
    else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('Images/snow.jpg')";
    }
    else if (weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('Images/thunderstorm.jpg')";
    }
    else{
        document.body.style.backgroundImage = "url('Images/clearday.jpg')";
    }

}

// Date manage function
function dateManage(n){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", " Friday", "Saturday"];

    let months= ["January", "Feburary", "March", "April", "May", "June", "July", "August","September","November","December"];
    
    let year= n.getFullYear();
    let month = months[n.getMonth()];
    let date = n.getDate();
    let day = days[n.getDay()];
    return `${date} ${month} (${day}), ${year}`;

}
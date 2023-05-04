let resutlt = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
let body = document.querySelector("body");

// Displays background color based on temperature
function setBackground(temp) {
    console.log("Temp is ---:  " + temp);
    if (temp > 30) {
      body.style.backgroundColor = '#FF6000';
    } else if (temp > 20 && temp <= 30) {
      body.style.backgroundColor = '#FF6D60';
    } else if (temp <= 20) {
      body.style.backgroundColor = '#19A7CE';
    }else {
      body.style.backgroundColor = '#516395';
    }
}

//displays output using the data from api
function displayOutput(apiData) {
  resutlt.innerHTML = `
  <h2>${apiData.name}</h2>
  <h4 class="weather">${apiData.weather[0].main}</h4>
  <h4 class="desc">${apiData.weather[0].description}</h4>
  <img src="https://openweathermap.org/img/w/${apiData.weather[0].icon}.png">
  <h1>${apiData.main.temp} &#176;</h1>
  <div class="temp-container">
    <div>
      <h4 class="title">min</h4>
      <h4 class="temp">${apiData.main.temp_min}</h4>
    </div>
    <div>
      <h4 class="title">max</h4>
      <h4 class="temp">${apiData.main.temp_max}</h4>
    </div>
  </div>
  `;
  setBackground(apiData.main.temp);
}

//to fetch data from api and calls displayOutput function
let getWeather = () => {
  let cityValue = cityRef.value;

  //If input field is empty
  if (cityValue == 0) {
    resutlt.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    body.style.backgroundColor = '#516395';
  }
  //If input field is NOT empty
  else {
    // URL for openWeather api
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    //Clear the input fiel
    cityRef.value = "";

    fetch(url).then((resp) => resp.json())
      // If city name is valid
      .then((data) => { 
        //data object is pass there so that function can access data from api
        displayOutput(data);
      })
      // If city name is not valid
      .catch(() => {
        resutlt.innerHTML = `<h3 class="msg">City not found</h3>`;
        body.style.backgroundColor = '#516395';
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);

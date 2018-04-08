'use strict'

function getWeather(lat, lng) {
    console.log('this is the lat and lng' , lat, lng)
    return new Promise((resolve, reject)=> {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=e1d89c2995c3a3bd3a54f45240f32b3b`)
        .then(function (res) {
         resolve({weatherLocation:res.data.name,
             tempMin:res.data.main.temp_min,
             tempMax:res.data.main.temp_max,
             description: res.data.weather[0].description,
             wind:res.data.wind.speed });
        });
    })
   
};

export default {
    getWeather: getWeather
}
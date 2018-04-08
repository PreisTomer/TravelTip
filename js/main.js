'use strict';

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'

let lng = -1;
let lat = -1;


let templat = getParameterByName( 'lat', location.href);
let templng = getParameterByName( 'lng', location.href);

if(templat) lat = parseFloat(templat);
if(templng) lng = parseFloat(templng);



locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {

    if( lat == -1 ) {
        locService.getPosition()
            .then(pos => {
                lat = pos.coords.latitude;
                lng = pos.coords.longitude;
                render();
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    } else {
        render();
    }
}


function render( ) {
    mapService.initMap(lat, lng)
        .then(
            () => {
                mapService.addMarker({ lat: lat, lng: lng });

                weatherService.getWeather(lat, lng)
                    .then(data => {
                        document.querySelector('.weatherLocation').innerHTML = 'Weather Location: ' + data.weatherLocation;
                        document.querySelector('.temp').innerHTML = 'Temp: from ' + parseInt(data.tempMin - 270) + 'C° to ' + parseInt(data.tempMax - 270) + 'C°';
                        document.querySelector('.description').innerHTML ='Description: ' + data.description;
                        document.querySelector('.wind').innerHTML = 'Wind Speed: ' + data.wind + 'm/s';
                    });

                locService.getFormattedAddress(lat, lng)
                    .then(address => {
                        console.log(address);
                        document.querySelector('.location').innerHTML = address;
                    })
                    .catch(err => {
                        console.log('err!!!', err);
                    })
            }
            
        );
}

function setMapBySearchAddress(address) {
    locService.getAddressCoords(address)
        .then(coords => {
            lat = coords.lat;
            lng = coords.lng
            render();
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.searchButton').addEventListener('click', (ev) => {
    if (document.querySelector('.search').value.length > 0) {
        setMapBySearchAddress(document.querySelector('.search').value);
    }
})


document.querySelector('.my_location').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            render();
        })
        .catch(err => {
            console.log('err!!!', err);
        })
})


document.querySelector('.copy').addEventListener('click', (ev) => {
    document.querySelector('.clipboard').value = location.origin + `?lat=${lat}&lng=${lng}`;
    document.querySelector('.clipboard').select();
    document.execCommand('copy');
    alert('The url address with lat and lng was copied successfuly!')
})


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


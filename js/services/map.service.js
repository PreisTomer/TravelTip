import { GoogleMapsApi } from './gmap.class.js';

var map;
let geocoder;
const gmapApi = new GoogleMapsApi();

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        console.log('Map!', map);
    });
}

function getCoords( address = "haifa") {
    return gmapApi.load().then(() => {
        var geocoder = new google.maps.Geocoder();
        //address = "jerusalem";
        geocoder.geocode( { 'address': address}, function(results, status) {
            var coords =  { lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng() };
            console.log( coords );
            return new Promise((resolve, reject)=>{
                coords;
            })
        });
    });

}
function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
}



export default {
    initMap,
    addMarker,
    getCoords
}


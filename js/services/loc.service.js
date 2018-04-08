// ES6 Object shorthand syntax:
// var x = 9;
// var y = 8;

// var obj = {x, y};
// console.log('obj', obj);



var locs = [{lat: 11.22, lng: 22.11}]

function getLocs() {
    return Promise.resolve(locs);
}

/*function getLocs() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(locs);
        }, 2000)
    });

}*/

function getAddressCoords( address ) {
    return new Promise(( resolve, reject) => {
        let urlApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAFXzBpPPtt_S6Njrx-0bADhxdyi0Ego7s`
        axios.get(urlApi)
            .then(function (res) {
                let coords = res.data.results[0].geometry.location;
                resolve( coords );
            });
    });
}

function getFormattedAddress( lat, lng ) {
    return new Promise(( resolve, reject) => {
        let urlApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&key=AIzaSyAFXzBpPPtt_S6Njrx-0bADhxdyi0Ego7s`
        axios.get(urlApi)
            .then(function (res) {
                let formattedAddress =  res.data.results[0].formatted_address;
                resolve( formattedAddress );
            });
    });
}

function getPosition() {
    console.log('Getting Pos');
    
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



export default {
    getLocs :getLocs,
    getPosition: getPosition,
    getAddressCoords: getAddressCoords,
    getFormattedAddress: getFormattedAddress
}
window.addEventListener('load', function() {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    //alert("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude );
    window.location.href = "./psql/near/cargaTuTarjeta/"+position.coords.latitude+"/"+position.coords.longitude+"/1000";
}


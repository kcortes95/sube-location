window.addEventListener('load', function() {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(redirectToPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function redirectToPosition(position) {
    window.location.href = "./psql/near/cargaTuTarjeta/"+position.coords.latitude+"/"+position.coords.longitude+"/1000";
}


window.addEventListener('load', function() {
    getLocation();
    buttonSearch();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(redirectToPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function redirectToPosition(position) {
    window.location.href = "./psql/"+position.coords.latitude+"/"+position.coords.longitude+"/1000?map=true";
}

function buttonSearch(){
    $( "#submitButton" ).click(function() {
        alert( "Handler for .click() called." );
    });
}

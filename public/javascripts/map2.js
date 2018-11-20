window.addEventListener('load', function() {
    buttonSearch();
});

function buttonSearch(){
    $( "#submitButton" ).click(function() {

        var lat = $('#lattext').val();
        var long = $('#longtext').val();
        var isMongo = $('#inputMongo').is(':checked');
        var isPsql = $('#inputPsql').is(':checked');

        alert(lat + " " + long + " " + isMongo + " " + isPsql);
        if(isPsql){
            window.location.href = "/psql/"+lat+"/"+long+"/500?map=true";
        }

        if(isMongo){
            window.location.href = "/mongo/"+lat+"/"+long+"/500?map=true";
        }

    });
}

window.addEventListener('load', function() {
    loadData();
});

function loadData(){
    $.getJSON('http://localhost:3000/kevin', function(data) {
        console.log(data);
        fillDataVis(data);
    });
}

function fillDataVis(jsonfile){
    var newlabels = jsonfile.map(function(e) {
        return e.ip;
    });

    var newdata = jsonfile.map(function(e) {
        return e.count_tot;
    });

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
            labels: newlabels,
            datasets: [
                {
                    label: "Cantidad de request",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    data: newdata
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Cantidad de request por IP'
            }
        }
    });
}
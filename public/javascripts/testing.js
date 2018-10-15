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
        type: 'bar',
        data: {
            labels: newlabels,
            datasets: [
                {
                    label: "Cantidad de request",
                    backgroundColor: [  "#fa983a","#eb2f06","#1e3799","#3c6382","#38ada9",
                                        "#f6b93b","#e55039","#4a69bd","#60a3bc","#78e08f",
                                        "#fad390", "#f8c291","#6a89cc","#82ccdd","#b8e994",
                                        "#e58e26","#b71540","#0c2461","#0a3d62","#079992"
                                    ],
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
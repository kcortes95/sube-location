window.addEventListener('load', function() {
    test2();
});

var jsonfile2 = {
    "jsonarray": [
        {
            "name": "Africa",
            "value": 2478
        },
        {
            "name": "Asia",
            "value": 5267
        },
        {
            "name": "Europe",
            "value": 734
        },
        {
            "name": "Latin America",
            "value": 784
        },
        {
            "name": "Norte America",
            "value": 433
        },
    ]
};


var newlabels = jsonfile.jsonarray.map(function(e) {
    return e.name;
});

var newdata = jsonfile.jsonarray.map(function(e) {
    return e.value;
});

var ctx = document.getElementById("myChart");
var myChart = new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
        labels: newlabels,
        datasets: [
            {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: newdata
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
        }
    }
});

function test(){
    $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback', function(data) {
        console.log(data);
    });
}

function test2(){
    $.getJSON('http://localhost:3000/kevin', function(data) {
        console.log(data);
    });
}

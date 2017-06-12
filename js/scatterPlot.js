var similarity = [];
var similarity2 = [];
var similarity3 = [];
var similarity4 = [];
var rowLabelNames = [];

function d3scatterPlot(drawMeHere){
    // $("#drawingCanvas").html("");
    // $("#colorScaleDiv").hide();
    var file = document.getElementById('fileSelector').value;
    d3.json(file, function (data) {

        function bubble(book_1, book_2, sim) {
            this.x = book_1;
            this.y = book_2;
            this.z = sim;
        }

        for (var i = 0; i < data.rowlabels.length; i++) {
            for (var j = 0; j < data.rowlabels.length; j++) {
                if (data.arr[i][j] <= 0.25) {
                    similarity.push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > 0.25 && data.arr[i][j] <= 0.5) {
                    similarity2.push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > 0.5 && data.arr[i][j] <= 0.75) {
                    similarity3.push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > 0.75 && data.arr[i][j] < 1) {
                    similarity4.push(new bubble(i, j, data.arr[i][j]));
                }
            }
            rowLabelNames.push(data.rowlabels[i]);
        }

        var obj = {name: "0-25%", data: similarity, color: "green", turboThreshold: 100000};
        var obj2 = {name: "26-50%", data: similarity2, color: "yellow", turboThreshold: 100000};
        var obj3 = {name: "51-75%", data: similarity3, color: "orange", turboThreshold: 100000};
        var obj4 = {name: "76-100%", data: similarity4, color: "red", turboThreshold: 100000};

        Highcharts.chart(drawMeHere, {
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                panning: true,
                panKey: 'shift'
            },
            title: {
                text: "Data visualization"
            },
            subtitle: {
                text: 'Books'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Book'
                },
                labels: {
                    formatter: function () {
                        return rowLabelNames[this.value];
                    }
                }
            },
            zAxis: {
                title: {
                    enabled: true
                }
            },
            yAxis: {
                title: {
                    enabled: true,
                    text: 'Book'
                },
                labels: {
                    formatter: function () {
                        return rowLabelNames[this.value];
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return 'Book 1:  ' + rowLabelNames[this.x] + '<br>' +
                        'Book 2: ' + rowLabelNames[this.y] + '<br>' +
                        'Value: ' + data.arr[this.x][this.y];
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                floating: true,
                backgroundColor: (Highcharts.theme) || '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [obj, obj2, obj3, obj4]
        });
    });
}







var bookData;
var originalData;

function bubble(book_1, book_2, sim) {
    this.x = book_1;
    this.y = book_2;
    this.z = sim;
}

function drawData(all) {
    var similarity = [[], [], [], []];
    var rowLabelNames = [];
    var list = [];
    d3.json("sim2.json", function (data) {
        var select = document.getElementById("select");
        var select_2 = document.getElementById("select_2");
        originalData = data;

        if (!all) {
            data = bookData;
        }

        for (var i = 0; i < data.rowlabels.length; i++) {
            for (var j = 0; j < data.arr[i].length; j++) {
                if (data.arr[i][j] <= 0.25) {
                    similarity[0].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > 0.25 && data.arr[i][j] <= 0.5) {
                    similarity[1].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > 0.5 && data.arr[i][j] <= 0.75) {
                    similarity[2].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > 0.75) {
                    similarity[3].push(new bubble(i, j, data.arr[i][j]));
                }
            }
            if (all) {
                rowLabelNames.push(data.rowlabels[i]);
            } else {
                var n = data.rowlabels[i].author + " " + data.rowlabels[i].title + " " + data.rowlabels[i].part;
                rowLabelNames.push(n);
            }

            if (all) {
                var author = data.rowlabels[i].split("_");
                var a = author[0] + " " + author[1];
                if ($.inArray(a, list) == -1) {
                    list.push(a);
                }
            }
        }

        if (all) {
            for (var k = 0; k < list.length; k++) {
                select.options[select.options.length] = new Option(list[k], list[k]);
                select_2.options[select.options.length] = new Option(list[k], list[k]);
            }
        }

        var obj = {name: "0-25% similarity", data: similarity[0], color: "#3333FF", turboThreshold: 100000};
        var obj2 = {name: "26-50% similarity", data: similarity[1], color: "#66B2FF", turboThreshold: 100000};
        var obj3 = {name: "51-75% similarity", data: similarity[2], color: "#FFB266", turboThreshold: 100000};
        var obj4 = {name: "76-100% similarity", data: similarity[3], color: "#FF3333", turboThreshold: 100000};

        Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                panning: true,
                panKey: 'shift'
            },
            title: {
                text: "Similarity's visualization"
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
                        'Similarity: ' + data.arr[this.x][this.y];
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

function changeBook() {
    var val = document.getElementById("select").value;
    var val_2 = document.getElementById("select_2").value;

    var names = val.split(" ");
    var names_2 = val_2.split(" ");
    bookData = filterByMultipleBooks(splitTitleFromAuthorForObject(originalData), [names[1], names_2[1]]);
    drawData(false);
}







var bookData;
var originalData;

function bubble(book_1, book_2, sim) {
    this.x = book_1;
    this.y = book_2;
    this.z = sim;
}

function datadraw_scatter_plot(all, placeholder, range, fileSelector, colorSelector, cb1, cb2, cb3) {
    var similarity = [[], [], [], []];
    var rowLabelNames = [];
    var file = document.getElementById(fileSelector).value;
    var minValue = $("#"+range).slider("values", 0)/100;
    var maxValue = $("#"+range).slider("values", 1)/100;
    var v1 = (maxValue - minValue) / 7 + minValue;
    var v2 = (maxValue - minValue) / 7 * 2 + minValue;
    var v3 = (maxValue - minValue) / 7 * 3 + minValue;
    var v4 = (maxValue - minValue) / 7 * 4 + minValue;
    var v5 = (maxValue - minValue) / 7 * 5 + minValue;
    var v6 = (maxValue - minValue) / 7 * 6 + minValue;
    d3.json(file, function (data) {
        originalData = data;

        if (!all) {
            data = bookData;
        }

        for (var i = 0; i < data.rowlabels.length; i++) {
            for (var j = 0; j < data.arr[i].length; j++) {
                if (data.arr[i][j] >= minValue && data.arr[i][j] <= v1) {
                    similarity[0].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > v1 && data.arr[i][j] <= v2) {
                    similarity[1].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > v2 && data.arr[i][j] <= v3) {
                    similarity[2].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > v3 && data.arr[i][j] <= v4) {
                    similarity[2].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > v4 && data.arr[i][j] <= v5) {
                    similarity[2].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > v5 && data.arr[i][j] <= v6) {
                    similarity[2].push(new bubble(i, j, data.arr[i][j]));
                } else if (data.arr[i][j] > v6 && data.arr[i][j] <= maxValue) {
                    similarity[3].push(new bubble(i, j, data.arr[i][j]));
                }
            }
            if (all) {
                rowLabelNames.push(data.rowlabels[i]);
            } else {
                var n = data.rowlabels[i].author + " " + data.rowlabels[i].title + " " + data.rowlabels[i].part;
                rowLabelNames.push(n);
            }
        }

        var obj = {name: Math.round(minValue*100) + "-" + Math.round(v1*100) + "% similarity",  data: similarity[0], color: "#3333FF", turboThreshold: 100000};
        var obj2 = {name: Math.round(v1*100) + "-" + Math.round(v2*100) + "% similarity",       data: similarity[1], color: "#66B2FF", turboThreshold: 100000};
        var obj3 = {name: Math.round(v2*100) + "-" + Math.round(v3*100) + "% similarity",       data: similarity[2], color: "#8CB2D8", turboThreshold: 100000};
        var obj4 = {name: Math.round(v3*100) + "-" + Math.round(v4*100) + "% similarity",       data: similarity[2], color: "#B2B2B2", turboThreshold: 100000};
        var obj5 = {name: Math.round(v4*100) + "-" + Math.round(v5*100) + "% similarity",       data: similarity[2], color: "#D8B28C", turboThreshold: 100000};
        var obj6 = {name: Math.round(v5*100) + "-" + Math.round(v6*100) + "% similarity",       data: similarity[2], color: "#FFB266", turboThreshold: 100000};
        var obj7 = {name: Math.round(v6*100) + "-" + Math.round(maxValue*100) + "% similarity", data: similarity[3], color: "#FF3333", turboThreshold: 100000};

        Highcharts.chart(placeholder, {
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
            series: [obj, obj2, obj3, obj4, obj5, obj6, obj7]
        });
    });
}

function datadraw_changeBook(placeholder, fileSelector) {
    var val = document.getElementById("datadraw_filterbooks_select").value;
    var val_2 = document.getElementById("datadraw_filterbooks_select_2").value;

    var names = val.split(" ");
    var names_2 = val_2.split(" ");
    bookData = filterByMultipleBooks(splitTitleFromAuthorForObject(originalData), [names[1], names_2[1]]);
    datadraw_scatter_plot(false, placeholder, null, fileSelector);
}
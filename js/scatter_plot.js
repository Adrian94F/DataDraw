function bubble(book_1, book_2, sim) {
    this.x = book_1;
    this.y = book_2;
    this.z = sim;
}

function datadraw_scatter_plot(placeholder, range, fileSelector, colorSelector, cb1, cb2, cb3, cb4) {
    var similarity = [[], [], [], []];
    data= window.datadraw_data;

    var v0 = $("#"+range).slider("values", 0)/100;
    var v7 = $("#"+range).slider("values", 1)/100;
    var v1 = (v7 - v0) / 7 + v0;
    var v2 = (v7 - v0) / 7 * 2 + v0;
    var v3 = (v7 - v0) / 7 * 3 + v0;
    var v4 = (v7 - v0) / 7 * 4 + v0;
    var v5 = (v7 - v0) / 7 * 5 + v0;
    var v6 = (v7 - v0) / 7 * 6 + v0;

    for (var i = 0; i < data.rowlabels.length; i++) {
        for (var j = 0; j < data.arr[i].length; j++) {
            if (data.arr[i][j] >= v0 && data.arr[i][j] <= v1) {
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
            } else if (data.arr[i][j] > v6 && data.arr[i][j] <= v7) {
                similarity[2].push(new bubble(i, j, data.arr[i][j]));
            }
        }
    }

    var obj1 = {name: Math.round(v0*100) + "-" + Math.round(v1*100) + "% similarity", data: similarity[0], color: "#3333FF", turboThreshold: 100000};
    var obj2 = {name: Math.round(v1*100) + "-" + Math.round(v2*100) + "% similarity", data: similarity[1], color: "#66B2FF", turboThreshold: 100000};
    var obj3 = {name: Math.round(v2*100) + "-" + Math.round(v3*100) + "% similarity", data: similarity[2], color: "#8CB2D8", turboThreshold: 100000};
    var obj4 = {name: Math.round(v3*100) + "-" + Math.round(v4*100) + "% similarity", data: similarity[2], color: "#B2B2B2", turboThreshold: 100000};
    var obj5 = {name: Math.round(v4*100) + "-" + Math.round(v5*100) + "% similarity", data: similarity[2], color: "#D8B28C", turboThreshold: 100000};
    var obj6 = {name: Math.round(v5*100) + "-" + Math.round(v6*100) + "% similarity", data: similarity[2], color: "#FFB266", turboThreshold: 100000};
    var obj7 = {name: Math.round(v6*100) + "-" + Math.round(v7*100) + "% similarity", data: similarity[3], color: "#FF3333", turboThreshold: 100000};

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
                    return data.rowlabels[this.value];
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
                    return data.rowlabels[this.value];
                }
            }
        },
        tooltip: {
            formatter: function () {
                return 'Book 1:  ' + data.rowlabels[this.x] + '<br>' +
                'Book 2: ' + data.rowlabels[this.y] + '<br>' +
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
        series: [obj1, obj2, obj3, obj4, obj5, obj6, obj7]
    });
}
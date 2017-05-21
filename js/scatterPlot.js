var similarity = [];
var similarity2 = [];
var similarity3 = [];
var similarity4 = [];
var rowLabelNames = [];
var bookData;
var originalData;
var currentBook = [];

function bubble(book_1, book_2, sim) {
    this.x = book_1;
    this.y = book_2;
    this.z = sim;
}

d3.json("sim2.json", function (data) {
    var select = document.getElementById("select");
    originalData = data;

    for (var i = 0; i < data.rowlabels.length; i++) {
        for (var j = 0; j < data.arr[i].length; j++) {
            if (data.arr[i][j] <= 0.25) {
                similarity.push(new bubble(i, j, data.arr[i][j]));
            } else if (data.arr[i][j] > 0.25 && data.arr[i][j] <= 0.5) {
                similarity2.push(new bubble(i, j, data.arr[i][j]));
            } else if (data.arr[i][j] > 0.5 && data.arr[i][j] <= 0.75) {
                similarity3.push(new bubble(i, j, data.arr[i][j]));
            } else if (data.arr[i][j] > 0.75) {
                similarity4.push(new bubble(i, j, data.arr[i][j]));
            }
        }
        rowLabelNames.push(data.rowlabels[i]);
        select.options[select.options.length] = new Option(data.rowlabels[i], data.rowlabels[i]);
    }

    var obj = {name: "0-25% similarity", data: similarity, color: "#3333FF", turboThreshold: 100000};
    var obj2 = {name: "26-50% similarity", data: similarity2, color: "#66B2FF", turboThreshold: 100000};
    var obj3 = {name: "51-75% similarity", data: similarity3, color: "#FFB266", turboThreshold: 100000};
    var obj4 = {name: "76-100% similarity", data: similarity4, color: "#FF3333", turboThreshold: 100000};

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

function changeBook() {
    var val = document.getElementById("select").value;
    var names = val.split("_");
    similarity = [];
    similarity2 = [];
    similarity3 = [];
    similarity4 = [];
    rowLabelNames = [];
    currentBook = [];

    bookData = JSON.parse(filterByBook(splitTitleFromAuthorForJsonWithPartIncluded(originalData), {author: names[0], title: names[1]}));
    console.log(bookData);
    draw();
}

function draw() {
    var name = bookData.book.author + " " + bookData.book.title + " " + bookData.book.part;
    currentBook.push(name);
    for (var k = 0; k < bookData.arr.length; k++) {
        if (bookData.arr[k] <= 0.25) {
            similarity.push(new bubble(k, 0, bookData.arr[k]));
        } else if (bookData.arr[k] > 0.25 && bookData.arr[k] <= 0.5) {
            similarity2.push(new bubble(k, 0, bookData.arr[k]));
        } else if (bookData.arr[k] > 0.5 && bookData.arr[k] <= 0.75) {
            similarity3.push(new bubble(k, 0, bookData.arr[k]));
        } else if (bookData.arr[k] > 0.75) {
            similarity4.push(new bubble(k, 0, bookData.arr[k]));
        }
        var n = bookData.rowlabels[k].author + " " + bookData.rowlabels[k].title + " " + bookData.rowlabels[k].part;
        rowLabelNames.push(n);
    }

    var obj = {name: "0-25% similarity", data: similarity, color: "#3333FF", turboThreshold: 100000};
    var obj2 = {name: "26-50% similarity", data: similarity2, color: "#66B2FF", turboThreshold: 100000};
    var obj3 = {name: "51-75% similarity", data: similarity3, color: "#FFB266", turboThreshold: 100000};
    var obj4 = {name: "76-100% similarity", data: similarity4, color: "#FF3333", turboThreshold: 100000};

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
                    return currentBook[this.value];
                }
            }
        },
        tooltip: {
            formatter: function () {
                return 'Book 1:  ' + rowLabelNames[this.x] + '<br>' +
                    'Book 2: ' + currentBook[this.y] + '<br>' +
                    'Similarity: ' + bookData.arr[this.x];
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
}






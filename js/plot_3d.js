// Plotting the surfaces..
function datadraw_plot_3d(all, placeholder, range, fileSelector, colorSelector, cb1, cb2, cb3, cb4) {
    var file = document.getElementById(fileSelector).value;
    var min = $("#"+range).slider("values", 0)/100;
    var max = $("#"+range).slider("values", 1)/100;

    $.getJSON(file, function(json) {
        console.log(json); // this will show the info it in firebug console
        var todelete = [[]];
// Deletes those points which values are not in specified range.
if ($("#"+cb1).is(':checked')) {
    for (var i = 0; i < json.arr.length; i++) {
        todelete.push(new Array());
        for (var j = 0; j < json.arr[i].length; j++)
            if (json.arr[i][j] < min || json.arr[i][j] > max)
                todelete[i].push(1);
            else
                todelete[i].push(0);
        }
        for (var i = 0; i < todelete.length; i++) {
            for (var j = 0; j < todelete.length; j++) {
                if (todelete[i][j] == 1)
                    json.arr[i][j] = min - 0.01;
            }
        }
    }

    x = json.rowlabels;
    y = x;
// Deletes those points which similarity equals 1.
if ($("#"+cb2).is(':checked')) {
    for (var i = 0; i < json.arr.length; i++) {
        for (var j = 0; j < json.arr[i].length; j++)
            if (json.arr[i][j] == 1) {
                json.arr[i][j] = 0;
            }
        }
    }
    z = json.arr;
// Reverse scale of the chart
if ($("#"+cb3).is(':checked'))
    var scalereversed = false;
else
    var scalereversed = true;
var customcolorscale = [
['0.0', 'rgb(0,229,25)'],
['0.066666666667', 'rgb(0,226,88)'],
['0.133333333334', 'rgb(0,223,149)'],
['0.2', 'rgb(0,220,209)'],
['0.333333333', 'rgb(0,167,218)'],
['0.4', 'rgb(0,105,215)'],
['0.466666667', 'rgb(0,44,212)'],
['0.533333333', 'rgb(15,0,210)'],
['0.6', 'rgb(73,0,207)'],
['0.666666667', 'rgb(129,0,204)'],
['0.733333333', 'rgb(184,0,201)'],
['0.8', 'rgb(199,0,160)'],
['0.866666667', 'rgb(196,0,103)'],
['0.933333333', 'rgb(193,0,47)'],
['1', 'rgb(191,7,0)']
];

if($("#"+cb4).is(':checked')){
    var tmp = 0;
    console.log("Transforming...");
    for (var i = 0; i < json.arr.length; i++) {
        for (var j = 0; j < json.arr[i].length; j++) {
            if (json.arr[i][j] === json.arr[j][i]) {
                if (tmp % 2 === 0) {
                    json.arr[i][j] = 0;
                    tmp++;
                } else {
                    json.arr[j][i] = 0;
                    tmp++;
                }
            }
        }
    }
    console.log("Done.");
}
var colorscale = $("#"+colorSelector).val();
if(colorscale == "custom")
    colorscale = customcolorscale;

var data = {
    x: x,
    y: y,
    z: z,
    colorscale: colorscale,
    type: 'surface',
    cauto: false,
    cmin: min,
    cmax: max,
    autocolorscale: false,
    reversescale: scalereversed,
};
var width = document.getElementById(placeholder).offsetWidth;
var height = window.innerHeight - 100;
var layout = {
    scene: {
        zaxis: {
            range: [min, max],
        },
    },
    width: width,
    height: height,
    margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4
    },

};

Plotly.newPlot(placeholder, [data], layout);
});

}
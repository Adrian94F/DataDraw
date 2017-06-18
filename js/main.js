/**
 * Created by adika on 11.05.2017.
 * Completely changed by Dave - 18.06.2017.
 */

 function datadraw_init()
 {
    datadraw_initUI();
    datadraw_changeChart('datadraw_heat_map');
}

function datadraw_initUI() {
    $( "#datadraw_slider-range" ).slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 0, 100 ],
        change: function( event, ui ) {datadraw_drawChart();},
        slide: function( event, ui ) {$( "#datadraw_amount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%");}
    });
    $( "#datadraw_amount" ).val( $( "#datadraw_slider-range" ).slider( "values", 0 ) +
        "% - " + $( "#datadraw_slider-range" ).slider( "values", 1 ) + "%" );
    fillBooks();
}

function datadraw_drawChart(){
    window[datadraw_getChart()]( true,
        'datadraw_drawingCanvas',
        'datadraw_slider-range',
        'datadraw_fileSelector',
        'datadraw_colorSelector',
        'datadraw_cb1',
        'datadraw_cb2',
        'datadraw_cb3',
        'datadraw_cb4');
}

function datadraw_changeChart(chartName){
    datadraw_setChart(chartName);
    $("#datadraw_drawingCanvas").html("");
    // są brzydkie ify bo o case'y się pluły przeglądarki :(
    if(chartName=="datadraw_heat_map"){
        $("#datadraw_similarity").show();
        $("#datadraw_slider-range").show();
        $("#datadraw_plot3d").hide();
        $("#datadraw_heatmap").show();
    }
    if(chartName=="datadraw_scatter_plot"){
        $("#datadraw_similarity").show();
        $("#datadraw_slider-range").show();
        $("#datadraw_plot3d").hide();
        $("#datadraw_heatmap").hide();
    }

    if(chartName=="datadraw_plot_3d"){
        $("#datadraw_similarity").show();
        $("#datadraw_slider-range").show();
        $("#datadraw_heatmap").hide();
        $("#datadraw_plot3d").show();
    }
    datadraw_drawChart();
}

function datadraw_handleFileChange()
{
    fillBooks();
    datadraw_drawChart();
}

function datadraw_handleClick(cb) {
    datadraw_drawChart();
}

function datadraw_setChart(chart)
{
    window.datadraw_currentChart = chart;
}

function datadraw_getChart()
{
    return window.datadraw_currentChart;
}

function updateTextInput(val, m) {
    if (m===0) {
        document.getElementById('minValue').value = val;
        max = document.getElementById('maxValue');
        maxS = document.getElementById('maxValueSlider');
        if (maxS.value < val) {
            maxS.value = val;
            max.value = val;
        }
    }
    else {
        document.getElementById('maxValue').value = val;
        min = document.getElementById('minValue');
        minS = document.getElementById('minValueSlider');
        if (minS.value > val) {
            minS.value = val;
            min.value = val;
        }
    }
    d3map();
}

function fillBooks(){
    var list = [];
    var file = document.getElementById('datadraw_fileSelector').value;
    $.getJSON(file, function(json) {
        var select = document.getElementById("datadraw_filterbooks_select");
        var select_2 = document.getElementById("datadraw_filterbooks_select_2");

        for (var i = 0; i < json.rowlabels.length; i++){
            var author = json.rowlabels[i].split("_");
            var a = author[0] + " " + author[1];
            if ($.inArray(a, list) == -1) {
                list.push(a);
            }
        }

        for (var k = 0; k < list.length; k++) {
            select.options[k] = new Option(list[k], list[k]);
            select_2.options[k] = new Option(list[k], list[k]);
        }
    });
}
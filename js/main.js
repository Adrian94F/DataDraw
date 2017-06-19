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
        slide: function( event, ui ) {$( "#datadraw_amount" ).val( "%" + ui.values[ 0 ] + " - %" + ui.values[ 1 ] );}
    });
    $( "#datadraw_amount" ).val( "%" + $( "#datadraw_slider-range" ).slider( "values", 0 ) +
        " - %" + $( "#datadraw_slider-range" ).slider( "values", 1 ) );
    datadraw_fillBooks();
}


function datadraw_drawChart(){
    window[datadraw_getChart()](
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
        $("#datadraw_similarity").hide();
        $("#datadraw_slider-range").hide();
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
    datadraw_fillBooks();
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

function datadraw_readJson()
{
   var file = document.getElementById("datadraw_fileSelector").value;
   window.datadraw_originaldata = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': file,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 
window.datadraw_data = window.datadraw_originaldata;
}

function datadraw_fillBooks(){
    var list = [];
    datadraw_readJson();
    var select = document.getElementById("datadraw_filterbooks_select");

    for (var i = 0; i <  window.datadraw_data.rowlabels.length; i++){
        var author =  window.datadraw_data.rowlabels[i].split("_");
        var a = {value: author[0] + " " + author[1]};
        if ($.inArray(a.value, list) == -1) {
            list.push(a.value);
        }
    }

    for (var k = 0; k < list.length; k++) {
        select.options[k] = new Option(list[k], list[k]);
    }
}


function datadraw_changeBook(placeholder) {
    var selectedValues = $('#datadraw_filterbooks_select').val();
    var splitted=[];
    var rowLabelNames=[];
    for(var i =0;i<selectedValues.length; i++)
    {
        splitted.push(selectedValues[i].split(" ")[1]);
    }
    var data  = jQuery.extend(true, {}, filterByMultipleBooks(splitTitleFromAuthorForObject( window.datadraw_originaldata), splitted));

    for (var i = 0; i < data.rowlabels.length; i++) 
    { 
        if(data.rowlabels[i].part != null)            
            var n = data.rowlabels[i].author + " " + data.rowlabels[i].title + " " + data.rowlabels[i].part;
        else
            var n = data.rowlabels[i].author + " " + data.rowlabels[i].title;   
        rowLabelNames.push(n);
    }
    data.rowlabels = rowLabelNames;
    window.datadraw_data = data;
    datadraw_drawChart(placeholder, null, "datadraw_fileSelector");
}
/**
 * Created by adika on 11.05.2017.
 * Completely changed by Dave - 18.06.2017.
 */

function init()
{
    window.datadraw_colorSelector = 'datadraw_colorSelector';
    window.datadraw_placeholder = 'datadraw_drawingCanvas';
    setChart('daveChart');
    initUI();
    drawChart();
}

function initUI() {
    $( "#datadraw_slider-range" ).slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 0, 100 ],
        change: function( event, ui ) {window[getChart()](window.datadraw_placeholder, window.datadraw_colorSelector);},
        slide: function( event, ui ) {$( "#datadraw_amount" ).val( "%" + ui.values[ 0 ] + " - %" + ui.values[ 1 ] );}
    });
    $( "#datadraw_amount" ).val( "%" + $( "#datadraw_slider-range" ).slider( "values", 0 ) +
        " - %" + $( "#datadraw_slider-range" ).slider( "values", 1 ) );
}

function drawChart(){
    window[getChart()](window.datadraw_placeholder, window.datadraw_colorSelector);
}

function handleClick(cb) {
    window[getChart()](window.datadraw_placeholder, window.datadraw_colorSelector);
}

function setChart(chart)
{
    window.currentChart = chart;
}

function getChart()
{
    return window.currentChart;
}
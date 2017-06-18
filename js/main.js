/**
 * Created by adika on 11.05.2017.
 */

$(document).ready(function(){
    var jsonFile = "";

    $("#drawingCanvas").height = window.innerHeight;

    // $("#heatmaplink").click(function(event){
    //     d3map();
    // });

    // $("#heatmap2link").click(function(event){
    //     d3scatterPlot();
    // });

    // $("#cellslink").click(function(event){
    // });

    // $("#chartlink").click(function(event){
    //     daveChart();
    // });

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files;
        var output = [];
        var f = files[0];
        output.push('<li><strong>', escape(f.name), '</strong> (',
            f.size,
            ' bytes)',
            '</li>');
        document.getElementById('drop').innerText = "";
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        jsonFile = JSON.parse(JSON.stringify(f));
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    $('input[type=radio][name=colorRadio]').change(function() {
        d3map();
    });
    $('input[type=radio][name=scaleRadio]').change(function() {
        d3map();
    });
});

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
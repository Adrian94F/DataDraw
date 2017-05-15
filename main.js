/**
 * Created by adika on 11.05.2017.
 */
$(document).ready(function(){
    var jsonFile = "";

    $("#drawingCanvas").height = window.innerHeight;

    $("#mainlink").click(function(event){
        $("#drawingCanvas").html("");
    });

    $("#heatmaplink").click(function(event){
        $("#drawingCanvas").html("");
        d3map();
    });

    $("#heatmap2link").click(function(event){
        $("#drawingCanvas").html("");
    });

    $("#cellslink").click(function(event){
        $("#drawingCanvas").html("");
    });

    $("#chartlink").click(function(event){
        $("#drawingCanvas").html("");
        daveChart();
    });

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
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
});
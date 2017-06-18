var data;
function handleFileSelect(evt) {
    var files = evt.target.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function (e) {
        data = reader.result;
    
    }

    reader.readAsText(file);
}

function getData() {
    return data;
}


function getAuthors() {
    data[getAuthors];
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
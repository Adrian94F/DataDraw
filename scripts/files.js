var data; 
function handleFileSelect(evt) {
    var files = evt.target.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function (e) {
        var transformedData = splitTitleFromAuthorForJson(reader.result);
        var transformedObject = JSON.parse(transformedData);
        var rowlabels = transformedObject.rowlabels;

        var selectList = document.getElementById("sel1");

        rowlabels.forEach(function (entry) {

            var string = entry.author + " " + entry.title;
            if (entry.part) {
                string += " " + entry.part;
            }
            var option = document.createElement("option");
            option.text = string;
            selectList.add(option);

        })
        data = transformedData;
        document.getElementById('books').style.visibility = "visible";
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

splitAuthorsForDistanceAndSimilarity = function (json) {
    return splitAuthors(json);
}

// Return parsed JSON containing author labels and their comparison with other authors
var splitAuthors = function (json) {

    var authorsDataArray = [];
    var objects = JSON.parse(json);

    for (var i = 0; i < objects.rowlabels.length; i++) {
        var authorData = {
            author: objects.rowlabels[i],
            arr: objects.arr[i]
        }
        authorsDataArray.push(authorData);
    }

    return { rowlabels: objects.rowlabels, authorData: authorsDataArray };
}

splitAuthorsForClusters = function (json) {

    var authorsDataArray = [];
    var objects = JSON.parse(json);

    for (var i = 0; i < objects.rowlabels.length; i++) {
        var authorData = {
            author: objects.rowlabels[i],
            clusters: objects.clusters[i]
        }
        authorsDataArray.push(authorData);
    }

    return { rowlabels: objects.rowlabels, authorData: authorsDataArray }
}

splitAuthorsForTransformAndWeighted = function (json) {

    var authorsDataArray = [];
    var objects = JSON.parse(json);

    for (var i = 0; i < objects.rowlabels.length; i++) {
        var authorData = {
            author: objects.rowlabels[i],
            arr: objects.arr[i],
            collabels: objects.collabels[i]
        }
        authorsDataArray.push(authorData);
    }

    return { rowlabels: objects.rowlabels, authorData: authorsDataArray }
}




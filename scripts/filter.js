splitTitleFromAuthor = function (json) {
    var data = JSON.parse(json);

    var rowlabels = [];

    for (var i = 0; i < data.rowlabels.length; i++) {
        var book = data.rowlabels[i].split("_");
        var author = book[0];
        var title = book[1];

        var rowlabel = {
            author: author,
            title: title
        }

        rowlabels.push(rowlabel);
    }

    var arr;
    var clusters;
    var collabels;

    var newData = {};
    newData.rowlabels = rowlabels;

    if (data.arr) {
        arr = data.arr;
        newData.arr = arr;
    }

    if (data.clusters) {
        clusers = data.clusters;
        newData.clusters = clusters;
    }

    if (data.collabels) {
        collabels = data.collabels;
        newData.collabels = collabels;
    }

    return JSON.stringify(newData);
}

filterByBook = function (json, book) {
    var data = JSON.parse(json);
    var rowlabels = data.rowlabels;
    var bookIndex = rowlabels.findIndex((element) => element.author === book.author && element.title === book.title);

    if (bookIndex === -1) {
        return "No results";
    }

    var result = { rowlabels: rowlabels, book: rowlabels[bookIndex] };

    if (data.arr) {
        console.log("in arr");
        result.arr = data.arr[bookIndex];
    }

    if (data.clusters) {
        result.clusters = data.clusters[bookIndex];
    }

    if (data.collabels) {
        result.collabels = data.collabels[bookIndex];
    }

    return JSON.stringify(result);

}

filterByBookAndScore = function (json, book, score) {
    var data = JSON.parse(json);
    var rowlabels = data.rowlabels;

    var bookIndex = rowlabels.findIndex((element) => element.author === book.author && element.title === book.title);

    if (bookIndex === -1) {
        return "No results";
    }


    if (!data.arr) {
        return "No data to filter";
    }

    var arr = data.arr[bookIndex];

    var filteredRowlabels = [];
    var filteredScores = [];



    for (var i = 0; i < rowlabels.length; i++) {

        if (arr[i] >= score) {

            filteredRowlabels.push(rowlabels[i]);
            filteredScores.push(arr[i]);
        }
    }

    return JSON.stringify({ rowlabels: filteredRowlabels, arr: filteredScores });
}





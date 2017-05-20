splitTitleFromAuthorForJson = function (json) {
    var data = JSON.parse(json);

    var newData = splitTitleFromAuthorForObject(data);

    return JSON.stringify(newData);
}

splitTitleFromAuthorForObject = function (object) {
    var rowlabels = [];

    for (var i = 0; i < object.rowlabels.length; i++) {
        var book = object.rowlabels[i].split("_");
        var author = book[0];
        var title = book[1];

        var rowlabel = {
            author: author,
            title: title
        }

        if (book.length === 3) {
            rowlabel.part = book[2];
        }

        rowlabels.push(rowlabel);
    }

    var arr;
    var clusters;
    var collabels;

    var newData = {};
    newData.rowlabels = rowlabels;

    if (object.arr) {
        arr = object.arr;
        newData.arr = arr;
    }

    if (object.clusters) {
        clusers = object.clusters;
        newData.clusters = clusters;
    }

    if (object.collabels) {
        collabels = object.collabels;
        newData.collabels = collabels;
    }

    return newData;
}

filterByBook = function (json, book) {
    var data = JSON.parse(json);
    var rowlabels = data.rowlabels;

    var bookIndex = -1;

    if (book.part) {
        bookIndex = rowlabels.findIndex((element) => element.author === book.author && element.title === book.title && element.part === element.part);
    } else {
        bookIndex = rowlabels.findIndex((element) => element.author === book.author && element.title === book.title);
    }
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




splitTitleFromAuthorForJson = function (json) {
    var data = JSON.parse(json);
    var newData = splitTitleFromAuthorForObject(data);
    return JSON.stringify(newData);
}

splitTitleFromAuthorForObject = function (object) {
    var rowlabels = [];

    var regex = /[^A-Za-z0-9]/;
    for (var i = 0; i < object.rowlabels.length; i++) {
        var book = object.rowlabels[i].split(regex);
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

    var bookIndex = findBookIndex(rowlabels, book);

    if (bookIndex === -1) {
        return "No results";
    }

    var result = { book: rowlabels[bookIndex] };

    if (data.arr) {
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

    var bookIndex = findBookIndex(rowlabels, book);


    if (bookIndex === -1) {
        return "No results";
    }


    if (!data.arr) {
        return "No data to filter";
    }

    book = data.rowlabels[bookIndex];

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

filterByAuthor = function (data, author) {
    var newRowlabels = [];
    var similarities = [];

    var indexes = [];
    for (var i = 0; i < data.rowlabels.length; i++) {
        if (data.rowlabels[i].author === author) {
            indexes.push(i);
            newRowlabels.push(data.rowlabels[i]);
        }
    }

    for (var i = 0; i < indexes.length; i++) {
        var similarity = [];
        for (var j = 0; j < indexes.length; j++) {
            similarity.push(data.arr[indexes[i]][indexes[j]]);
        }
        similarities.push(similarity);
    }

    return { rowlabels: newRowlabels, arr: similarities };
}


filterByMultipleAuthors = function (data, authors) {
    let newRowlabels = [];
    let similarities = [];

    let indexes = [];
    for (let i = 0; i < data.rowlabels.length; i++) {
        for (let j = 0; j < authors.length; j++) {
            if (data.rowlabels[i].author === authors[j]) {
                indexes.push(i);
                newRowlabels.push(data.rowlabels[i]);
            }
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        let similarity = [];
        for (let j = 0; j < indexes.length; j++) {
            similarity.push(data.arr[indexes[i]][indexes[j]]);
        }
        similarities.push(similarity);
    }

    return { rowlabels: newRowlabels, arr: similarities };
}

filterByMultipleBooks = function (data, bookTitles) {
    let newRowlabels = [];
    let similarities = [];

    console.log(bookTitles);

    let indexes = [];
    for (let i = 0; i < data.rowlabels.length; i++) {
        for (let j = 0; j < bookTitles.length; j++) {
            if (data.rowlabels[i].title === bookTitles[j]) {
                indexes.push(i);
                newRowlabels.push(data.rowlabels[i]);
            }
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        let similarity = [];
        for (let j = 0; j < indexes.length; j++) {
            similarity.push(data.arr[indexes[i]][indexes[j]]);
        }
        similarities.push(similarity);
    }

    return { rowlabels: newRowlabels, arr: similarities };
}


var findBookIndex = function (rowlabels, book) {
    if (book.part) {
        return rowlabels.findIndex((element) => element.author === book.author && element.title === book.title && element.part === book.part);
    } else {
        return rowlabels.findIndex((element) => element.author === book.author && element.title === book.title);
    }
}
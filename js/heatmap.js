function d3map() {
    $("#colorScaleDiv").show();
    $("#drawingCanvas").html("");
    var domain = [];
    var scales = [["#fff", "#ff1100", "#ff2200", "#ff3300", "#ff4400", "#ff5500", "#ff6600", "#ff7700", "#ff8800", "#ff9900", "#ffaa00", "#ffbb00", "#ffcc00", "#ffdd00", "#ffee00", "#ffff00", "#eeff00", "#ddff00", "#ccff00", "#bbff00", "#aaff00", "#99ff00", "#88ff00", "#77ff00", "#66ff00", "#55ff00", "#44ff00", "#33ff00", "#22ff00", "#11ff00", "#fff"],
        ["#fff", "#11ff00", "#22ff00", "#33ff00", "#44ff00", "#55ff00", "#66ff00", "#77ff00", "#88ff00", "#99ff00", "#aaff00", "#bbff00", "#ccff00", "#ddff00", "#eeff00", "#ffff00", "#ffee00", "#ffdd00", "#ffcc00", "#ffbb00", "#ffaa00", "#ff9900", "#ff8800", "#ff7700", "#ff6600", "#ff5500", "#ff4400", "#ff3300", "#ff2200", "#ff1100", "#fff"]];

    var minValue = document.getElementById('minValueSlider').value;
    var maxValue = document.getElementById('maxValueSlider').value;
    var n = 31;
    for (i=0; i<n; i++) {
        domain.push((((maxValue - minValue) / n * i)) * 255);
    }

    d3mapDraw("data/1/similarity.json", domain, scales[$('input[type=radio][name=colorRadio]:checked').val()]);
}

function d3mapDraw(filename, mapDomain, mapScale) {
    d3.json(filename, function (error, heatmap) {
        if (error) {
            alert("Unable to load file: " + error);
            return;
        }
        var X = 0, Y = 1;
        var canvasDim = [$("#drawingCanvas").width, window.innerHeight - 100];
        var canvasAspect = canvasDim[Y] / canvasDim[X];
        var heatmapDim = [heatmap.rowlabels.length, heatmap.rowlabels.length];
        var heatmapAspect = heatmapDim[Y] / heatmapDim[X];

        if (heatmapAspect < canvasAspect)
            canvasDim[Y] = canvasDim[X] * heatmapAspect;
        else
            canvasDim[X] = canvasDim[Y] / heatmapAspect;

        var color = d3.scale.linear()
            .domain(mapDomain)
            .range(mapScale);

        var scale = [
            d3.scale.linear()
                .domain([0, heatmapDim[X]])
                .range([0, canvasDim[X]]),
            d3.scale.linear()
                .domain([0, heatmapDim[Y]])
                .range([canvasDim[Y], 0])
        ];

        var body = d3.select("#drawingCanvas");

        var canvas = body.append("canvas")
            .attr("width", heatmapDim[X])
            .attr("height", heatmapDim[Y])
            .style("width", canvasDim[X] + "px")
            .style("height", canvasDim[Y] + "px")
            .style("position", "absolute");

        var svg = body.append("svg")
            .attr("width", canvasDim[X])
            .attr("height", canvasDim[Y])
            .style("position", "relative");

        var zoom = d3.behavior.zoom()
            .center(canvasDim.map(
                function (v) {
                    return v / 2
                }))
            .scaleExtent([1, 10])
            .x(scale[X])
            .y(scale[Y])
            .on("zoom", zoomEvent);

        svg.append("rect")
            .style("pointer-events", "all")
            .attr("width", canvasDim[X])
            .attr("height", canvasDim[Y])
            .style("fill", "none")
            .call(zoom);

        var axis = [
            d3.svg.axis()
                .scale(scale[X])
                .tickFormat(function(d) {
                    return heatmap.rowlabels[d];
                })
                .orient("top")
                .ticks(heatmapDim[X] / 10),
            d3.svg.axis()
                .scale(scale[Y])
                .tickFormat(function(d) {
                    return heatmap.rowlabels[d];
                })
                .orient("right")
                .ticks(heatmapDim[Y] / 10)
        ];

        var axisElement = [
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + canvasDim[Y] + ")")
                .call(axis[X]),
            svg.append("g")
                .attr("class", "y axis")
        ];

        function drawAxes() {
            axisElement[X].call(axis[X]).selectAll("text").attr("transform", "rotate(90)").style("text-anchor", "end").attr("dy", ".15em");
            axisElement[Y].call(axis[Y]);
        }

        var context = canvas.node().getContext("2d");
        var imageObj;
        var imageDim;
        var imageScale;
        createImageObj();
        drawAxes();

        // Compute the pixel colors; scaled by CSS.
        function createImageObj() {
            imageObj = new Image();
            var image = context.createImageData(heatmapDim[X], heatmapDim[Y]);
            for (var y = 0, p = -1; y < heatmapDim[Y]; ++y) {
                for (var x = 0; x < heatmapDim[X]; ++x) {
                    var c = d3.rgb(color(heatmap.arr[y][x] * 255));
                    image.data[++p] = c.r;
                    image.data[++p] = c.g;
                    image.data[++p] = c.b;
                    image.data[++p] = 255;
                }
            }
            context.putImageData(image, 0, 0);
            imageObj.src = canvas.node().toDataURL();
            imageDim = [imageObj.width, imageObj.height];
            imageScale = imageDim.map(
                function (v, i) {
                    return v / canvasDim[i]
                });
        }

        function zoomEvent() {
            var s = d3.event.scale;
            var n = imageDim.map(
                function (v) {
                    return v * s
                });
            var t = d3.event.translate.map(function (v, i) {
                return Math.min(
                    0,
                    Math.max(v, canvasDim[i] - n[i] / imageScale[i]));
            });
            zoom.translate(t);
            var it = t.map(
                function (v, i) {
                    return v * imageScale[i]
                });
            context.clearRect(0, 0, canvasDim[X], canvasDim[Y]);
            context.drawImage(imageObj, it[X], it[Y], n[X], n[Y]);
            drawAxes();
        }
    });
}
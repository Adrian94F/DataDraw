var canvas = document.getElementById('main');
canvas.width = 800;
canvas.height = 600;
var gkhead = new Image;
var ball = new Image;
var similarity = {};
gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';
ball.src = 'http://phrogz.net/tmp/alphaball.png';
window.onload = function() {
    var context = canvas.getContext('2d');
    var scale = 1.1
    var lastX = canvas.width / 2;
    var lastY = canvas.height / 2;
    var dragStart;
    var dragged;
    trackTransforms(context);
    getSimilarity(drawStuff);

    function getSimilarity(callback) {
        $.ajax({
            url: 'similarity2.json',
            type: 'GET',
            success: function(result) {
                result = JSON.parse(result);
                for (var i = 0; i < result.rowlabels.length; i++) {
                    var similarArray = [];
                    for (var j = 0; j < result.arr[i].length; j++) {
                        if (result.arr[i][j] != 0 && result.arr[i][j] != 1) {
                            similarArray.push(result.arr[i][j]);
                        }
                    }
                    similarity[result.rowlabels[i]] = similarArray;
                    callback();
                }
            }
        });
    }
    var handleScroll = function(evt) {
        var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    };

    var zoom = function(clicks) {
        var pt = context.transformedPoint(lastX, lastY);
        context.translate(pt.x, pt.y);
        var factor = Math.pow(scale, clicks);
        context.scale(factor, factor);
        context.translate(-pt.x, -pt.y);
        drawStuff();
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function drawStuff() {
        var p1 = context.transformedPoint(0, 0);
        var p2 = context.transformedPoint(canvas.width, canvas.height);
        startRadiusX = 100;
        startRadiusY = 100;
        context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
        var count = 0;
        var count2 = 0;
        for (var key in similarity) {
            if (count % 5 == 0 && count != 0) {
                startRadiusY += 150;
                startRadiusX = 100;
                count = 0;
            }
            var x = startRadiusX + 150 * count;
            var y = startRadiusY;
            var radius = 15;
            var lines = similarity[key].length;
            var space = 360.0 / lines;
            context.beginPath();
            context.lineWidth = 0.5;
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fillStyle = getRandomColor();
            context.fill();
            context.stroke();
            context.save();
            context.translate(x, y);
            for (var i = 0; i < lines; ++i) {
                var xPoint = radius * Math.cos(i * space * Math.PI / 180);
                var yPoint = radius * Math.sin(i * space * Math.PI / 180);
                var length = similarity[key][i] * 100;
                var xPoint2 = (radius + length) * Math.cos(i * space * Math.PI / 180);
                var yPoint2 = (radius + length) * Math.sin(i * space * Math.PI / 180);
                context.beginPath();
                context.lineWidth = 0.5;
                context.moveTo(xPoint, yPoint);
                context.lineTo(xPoint2, yPoint2);
                context.strokeStyle = getRandomColor();
                context.stroke();
                var xPoint3 = xPoint2 + 2 * Math.cos(i * space * Math.PI / 180);
                var yPoint3 = yPoint2 + 2 * Math.sin(i * space * Math.PI / 180);
                context.beginPath();
                context.lineWidth = 0.05;
                context.arc(xPoint3, yPoint3, 2, 0, Math.PI * 2);
                context.fillStyle = getRandomColor();
                context.fill();
                context.stroke();
            }
            //context.stroke();
            context.restore();
            count++;
        }
    }

    canvas.addEventListener('mousedown', function(evt) {
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = context.transformedPoint(lastX, lastY);
        dragged = false;
    }, false);

    canvas.addEventListener('mousemove', function(evt) {
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if (dragStart) {
            var pt = context.transformedPoint(lastX, lastY);
            context.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            drawStuff();
        }
    }, false);

    canvas.addEventListener('mouseup', function(evt) {
        dragStart = null;
        if (!dragged) zoom(evt.shiftKey ? -1 : 1);
    }, false);

    canvas.addEventListener('DOMMouseScroll', handleScroll, false);
    canvas.addEventListener('mousewheel', handleScroll, false);

}

function trackTransforms(context) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var xform = svg.createSVGMatrix();
    context.getTransform = function() {
        return xform;
    };
    var savedTransforms = [];
    var save = context.save;
    context.save = function() {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(context);
    };
    var restore = context.restore;
    context.restore = function() {
        xform = savedTransforms.pop();
        return restore.call(context);
    };
    var scale = context.scale;
    context.scale = function(sx, sy) {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(context, sx, sy);
    };
    var rotate = context.rotate;
    context.rotate = function(radians) {
        xform = xform.rotate(radians * 180 / Math.PI);
        return rotate.call(context, radians);
    };
    var translate = context.translate;
    context.translate = function(dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(context, dx, dy);
    };
    var transform = context.transform;
    context.transform = function(a, b, c, d, e, f) {
        var m2 = svg.createSVGMatrix();
        m2.a = a;
        m2.b = b;
        m2.c = c;
        m2.d = d;
        m2.e = e;
        m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(context, a, b, c, d, e, f);
    };
    var setTransform = context.setTransform;
    context.setTransform = function(a, b, c, d, e, f) {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(context, a, b, c, d, e, f);
    };
    var pt = svg.createSVGPoint();
    context.transformedPoint = function(x, y) {
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(xform.inverse());
    }
}

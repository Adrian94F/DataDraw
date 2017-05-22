// Plotting the surfaces..
function daveChart() {
	$("#drawingCanvas").html("");
	$("#colorScaleDiv").hide();
	var file = document.getElementById('fileSelector').value;

	$.getJSON(file, function(json) {
        console.log(json); // this will show the info it in firebug console

        x = json.rowlabels;
        y = x;

        for (var i = 0; i < json.arr.length; i++)
        {
        	for(var j = 0; j< json.arr[i].length; j++)
        		if(json.arr[i][j]==1){
        			json.arr[i][j]=0;
        		}
        	}
        	z = json.arr;

        	var data = {x: x, y: y, z: z, type: 'surface',
        	contours:{
        		cauto: false,
        		cmin: 0.25,
        		cmax: 0.35
        	}
        };
        var width = $("#drawingCanvas").width;
        var height = window.innerHeight - 100;
        var layout = {
        	scene:{zaxis:{

                // range: [0.25, 0.35],
            },},
            width: width,
            height: height,
            margin: {
            	l: 50,
            	r: 50,
            	b: 100,
            	t: 100,
            	pad: 4
            },

        };

        Plotly.newPlot('drawingCanvas', [data], layout);
    });

}
<!DOCTYPE html>

<html>
<head>
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/font-awesome.css" />
	<link rel="stylesheet" href="css/jquery-ui.css">
	<link rel="shortcut icon" type="image/png" href="img/favicon.png"/>
	<link rel="stylesheet" href="css/style.css" type="text/css" />
	<title>Data Draw</title>
	<meta charset="utf-8">

	<!-- main -->

	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/main.js"></script>

	<!-- heatmap -->
	<script src="js/d3.v3.js"></script>
	<script src="js/heatmap.js"></script>

	<!-- chart -->
	<script src="js/plotly-latest.min.js"></script>
	<script src="js/chart.js"></script>

	<!-- scatterplot -->
	<script src="js/scatterPlot.js"> </script>
	<script src="js/highcharts.js"></script>
	<script src="js/exporting.js"></script>
	<script>
		$( function() {
			$( "#slider-range" ).slider({
				range: true,
				min: 0,
				max: 100,
				values: [ 0, 100 ],
				change: function( event, ui ) {daveChart('drawingCanvas');},
				slide: function( event, ui ) {
					$( "#amount" ).val( "%" + ui.values[ 0 ] + " - %" + ui.values[ 1 ] );

				}
				
			});
			$( "#amount" ).val( "%" + $( "#slider-range" ).slider( "values", 0 ) +
				" - %" + $( "#slider-range" ).slider( "values", 1 ) );
		} );
	</script>
	<script>
		function handleClick(cb) {
			daveChart();
		}
	</script>
</head>
<body id="drop_zone" onload="daveChart()">
	<header>
		<?php include("header.php") ?>
	</header>
	
	<div id="main" >
		<select id="fileSelector" style="visibility: hidden"> 
			<option value="data/1/distance.json">distance 1</option>
			<option value="data/1/similarity.json" selected>similarity 1</option>
			<option value="data/1/transform.json">transform 1</option>
			<option value="data/1/weighted.json">weighted 1</option>
			<option value="data/2/distance.json">distance 2</option>
			<option value="data/2/similarity.json">similarity 2</option>
			<option value="data/2/transform.json" >transform 2</option>
			<option value="data/2/weighted.json">weighted 2</option>
		</select>
		<div class="col-md-2">
			<p>
				<label for="amount">Similarity range:</label>
				<input type="text" id="amount" readonly style="background:none;border:0; color:#f6931f; font-weight:bold;">
			</p>
			<div id="slider-range"></div><br />
			<label for="cb1"><input id="cb1" type="checkbox" onclick="handleClick(this);">Hide objects which are not in scale</label><br />
			<label for="cb2"><input id="cb2" type="checkbox" onclick="handleClick(this);">Hide similarity of the same objects</label><br />
			<label for="cb3"><input id="cb3" type="checkbox" onclick="handleClick(this);">Reverse scale</label><br />
			<select id="colorSelector" onchange="handleClick(this);"> 
				<option value="custom" selected>Original</option>
				<option value="Blackbody">Blackbody</option>
				<option value="Electric">Electric</option>
				<option value="Earth">Earth</option>
				<option value="Bluered">Bluered</option>
				<option value="YIGnBu">YIGnBu</option>
				<option value="Portland" >Portland</option>
				<option value="Picnic">Picnic</option>
			</select>
		</div>

		<div class="col-md-10">
			<div id="drawingCanvas"></div>
		</div>
	</div>
</body>
</html>
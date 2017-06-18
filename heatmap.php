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
	
</head>
<body id="drop_zone" onload='d3map("drawingCanvas");'>
	<header>
		<?php include("header.php") ?>
	</header>
	
	<div id="main" >
		<div class="col-md-2">
		<?php include('heatmap_main.php') ?>
		</div>

		<div class="col-md-10">
			<div id="drawingCanvas"></div>
		</div>
	</div>
</body>
</html>
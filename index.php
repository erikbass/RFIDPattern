<html lang="pt-br">

	<head>
		<meta charset="UTF-8"/>
		<title>RFID Pattern - Decode</title>

		<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />

		<link href="style.css" rel="stylesheet" />

		<!--[if lt IE 9]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	</head>

	<body ng-app ng-controller="DecodeController" ng-init="Decode()">

		<div id="main" ng-click="hideTooltip()">
			<h3>Hexadecimal Encoded:</h3>
			<div class="tooltip" ng-click="$event.stopPropagation()" ng-show="showtooltip">
				<input type="text" ng-model="dataHex" ng-change="Decode()" />
			</div>

			<p ng-click="toggleTooltip($event)">{{dataHex}}</p>

		</div>
		
		<div id="dataOriginal" ng-show="dataHex.length > 0">
			<div ng-show="dataDecoded != null">
				<h3>Data Decoded:</h3>
				<span id="dataDecoded">{{dataDecoded}}</span>

				<table ng-show="dataPattern == 'GID-96'">
					<thead>
						<tr>
							<th>Pattern</th>
							<th>Manage Number</th>
							<th>Object Class</th>
							<th>Serial Number</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{{EPC.Pattern}}</td>
							<td>{{EPC.ManageNumber}}</td>
							<td>{{EPC.ObjectClass}}</td>
							<td>{{EPC.SerialNumber}}</td>
						</tr>
					</tbody>
				</table>

				<table ng-show="dataPattern == 'SGTIN-96'">
					<thead>
						<tr>
							<th>Pattern</th>
							<th>Filter</th>
							<th>Partition</th>
							<th>Company Prefix</th>
							<th>Item Reference</th>
							<th>Serial Number</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{{EPC.Pattern}}</td>
							<td>{{EPC.Filter}}</td>
							<td>{{EPC.Partition}}</td>
							<td>{{EPC.CompanyPrefix}}</td>
							<td>{{EPC.ItemReference}}</td>
							<td>{{EPC.SerialNumber}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<br><br>
			<div id="Bin" ng-show="dataBin != null">
				<label>Binary: </label><br>
				<span>{{dataBin}}</span>
			</div>

			<br>
			<div id="Pattern">
				<label>Pattern: </label><br>
				<span ng-show="dataPattern != null">{{dataPattern}}</span>
				<span ng-show="dataPattern == null">Pattern not found!</span>
			</div>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
		<script src="script.js"></script>
	</body>
</html>

function DecodeController($scope) {

	$scope.showtooltip = false;
	$scope.dataHex = '3074257B80625F0000000002';

	$scope.dataBin 		= Hex2Bin($scope.dataHex);
	$scope.dataPattern	= getPattern($scope.dataBin);

	$scope.hideTooltip = function () {
		$scope.showtooltip = false;
	}

	$scope.toggleTooltip = function (e) {
		e.stopPropagation ();
		$scope.showtooltip = !$scope.showtooltip;
	}
}


function getPattern(binaryFull){
	var header 	= binaryFull.substring(0, 8);
	var pattern = null;

	switch(header){
		case "11001110":
		 	pattern = "DOD-64";
		 	break;
		case "11001111":
		 	pattern = "DOD-96";
		 	break;
		case "00110000":
		 	pattern = "SGTIN-96";
		 	break;
		case "00110001":
		 	pattern = "SSCC-96";
		 	break;
		case "00110010":
		 	pattern = "GLN-96";
		 	break;
		case "00110011":
		 	pattern = "GRAI-96";
		 	break;
		case "00110100":
		 	pattern = "GIAI-96";
		 	break;
		case "00110101":
		 	pattern = "GID-96";
		 	break;
	 	default:
	 		pattern = null;
	}

	return pattern;
}
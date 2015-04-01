function DecodeController($scope) {

	$scope.showtooltip = false;
	$scope.dataHex = '350002800004B362DFDC1C35';
	
	$scope.hideTooltip = function () {
		$scope.showtooltip = false;
	}

	$scope.toggleTooltip = function (e) {
		e.stopPropagation ();
		$scope.showtooltip = !$scope.showtooltip;
	}

	$scope.Decode = function () {
		$scope.dataBin 		= Hex2Bin($scope.dataHex);
		$scope.dataPattern	= GetPattern($scope.dataBin);
		$scope.dataDecoded	= DecodeData($scope.dataHex);
	}
}

/////////////////// DECODE
	function DecodeData(Hex){
		var Bin 	= Hex2Bin(Hex);
		var Pattern = GetPattern(Bin);
		var decoded = null;

		if (Pattern != null){
			switch(Pattern){
				case "DOD-64":
				 	decoded = DOD64Decode(Bin);
				 	break;
				case "DOD-96":
				 	decoded = DOD96Decode(Bin);
				 	break;
				case "SGTIN-96":
				 	decoded = SGTIN96Decode(Bin);
				 	break;
				case "SSCC-96":
				 	decoded = SSCC96Decode(Bin);
				 	break;
				case "GLN-96":
				 	decoded = GLN96Decode(Bin);
				 	break;
				case "GRAI-96":
				 	decoded = GRAI96Decode(Bin);
				 	break;
				case "GIAI-96":
				 	decoded = GIAI96Decode(Bin);
				 	break;
				case "GID-96":
				 	decoded = GID96Decode(Bin);
				 	break;
			 	default:
			 		decoded = null;
			}
		}		

		return decoded;
	}

	function GetPattern(binaryFull){
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

/////////////////// CONVERT
	function Bin2Hex(s) {
	    var i, k, part, accum, ret = '';
	    for (i = s.length-1; i >= 3; i -= 4) {
	        part = s.substr(i+1-4, 4);
	        accum = 0;
	        for (k = 0; k < 4; k += 1) {
	            if (part[k] !== '0' && part[k] !== '1') {
	                return null;
	            }
	            accum = accum * 2 + parseInt(part[k], 10);
	        }
	        if (accum >= 10) {
	            ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
	        } else {
	            ret = String(accum) + ret;
	        }
	    }
	    if (i >= 0) {
	        accum = 0;
	        for (k = 0; k <= i; k += 1) {
	            if (s[k] !== '0' && s[k] !== '1') {
	                return null;
	            }
	            accum = accum * 2 + parseInt(s[k], 10);
	        }
	        ret = String(accum) + ret;
	    }
	    return ret;
	}

	function Hex2Bin(s) {
	    var i, k, part, ret = '';
	    var lookupTable = {
	        '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
	        '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
	        'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101',
	        'e': '1110', 'f': '1111',
	        'A': '1010', 'B': '1011', 'C': '1100', 'D': '1101',
	        'E': '1110', 'F': '1111'
	    };
	    for (i = 0; i < s.length; i += 1) {
	        if (lookupTable.hasOwnProperty(s[i])) {
	            ret += lookupTable[s[i]];
	        } else {
	            return null;
	        }
	    }
	    return ret;
	}

/////////////////// DECODE PATTERN
	function DOD64Decode(Binary){
		var decoded = null;
		return decoded;
	}
	function DOD96Decode(Binary){
		var decoded = null;
		return decoded;
	}
	function SGTIN96Decode(Binary){
		// Header (8); Filter (3); Partition (3); Company Prefix (20-40);
		// Item Reference (24-4); Serial Number (38)

		var decoded = null;
		return decoded;
	}
	function SSCC96Decode(Binary){
		var decoded = null;
		return decoded;
	}
	function GLN96Decode(Binary){
		var decoded = null;
		return decoded;
	}
	function GRAI96Decode(Binary){
		var decoded = null;
		return decoded;
	}
	function GIAI96Decode(Binary){
		var decoded = null;
		return decoded;
	}
	function GID96Decode(Binary){
		//Header (b - 8); Manager Number (n - 28);
		//Object Class (n - 24); Serial Number (n - 36)
		var decoded = null;
		var ManNum 	= parseInt(Binary.substring(8, 36), 2);
		var ObjCl 	= parseInt(Binary.substring(36, 60), 2);
		var SerNum 	= parseInt(Binary.substring(60, 96), 2);

		if (!isNaN(ManNum) && !isNaN(ObjCl) && !isNaN(SerNum)){
			decoded = "~b00800110101~n028"+ManNum+"~n024"+ObjCl+"~n036"+SerNum;	
		}
		return decoded;
	}
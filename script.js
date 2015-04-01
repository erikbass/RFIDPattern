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

function Bin2Hex(s) {
    var i, k, part, accum, ret = '';
    for (i = s.length-1; i >= 3; i -= 4) {
        // extract out in substrings of 4 and convert to hex
        part = s.substr(i+1-4, 4);
        accum = 0;
        for (k = 0; k < 4; k += 1) {
            if (part[k] !== '0' && part[k] !== '1') {
                // invalid character
                return { valid: false };
            }
            // compute the length 4 substring
            accum = accum * 2 + parseInt(part[k], 10);
        }
        if (accum >= 10) {
            // 'A' to 'F'
            ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
        } else {
            // '0' to '9'
            ret = String(accum) + ret;
        }
    }
    // remaining characters, i = 0, 1, or 2
    if (i >= 0) {
        accum = 0;
        // convert from front
        for (k = 0; k <= i; k += 1) {
            if (s[k] !== '0' && s[k] !== '1') {
                return { valid: false };
            }
            accum = accum * 2 + parseInt(s[k], 10);
        }
        // 3 bits, value cannot exceed 2^3 - 1 = 7, just convert
        ret = String(accum) + ret;
    }
    return ret;
}

function Hex2Bin(s) {
    var i, k, part, ret = '';
    // lookup table for easier conversion. '0' characters are padded for '1' to '7'
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
            return { valid: false };
        }
    }
    return ret;
}
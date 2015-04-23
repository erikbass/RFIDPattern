function DecodeController($scope) {

	$scope.showtooltip = false;
	$scope.dataDec = '51540009381';
	// 3028
	
	$scope.hideTooltip = function () {
		$scope.showtooltip = false;
	}

	$scope.toggleTooltip = function (e) {
		e.stopPropagation ();
		$scope.showtooltip = !$scope.showtooltip;
	}

	$scope.Decode = function () {
		$scope.dataBin 		= Dec2Bin($scope.dataDec);
		$scope.dataHex		= DataHex($scope.dataBin);
		$scope.dataDecoded  = DecodeData($scope.dataHex);
		$scope.arrayHex		= splitHex($scope.dataHex);
		$scope.checksum		= XOR($scope.arrayHex);
	}
}


/////////////////// DECODE
	function DecodeData(Hex){
		var decoded = null;	

		var obj = splitHex(Hex);

		var decoded = {
			DecWrited: Bin2Dec(Hex2Bin(Hex)),
			DecReaded: Bin2Dec(Hex2Bin(Hex + XOR(obj).Hex)),
			HexWrited: Hex,
			HexReaded: Hex + XOR(obj).Hex
		};

		return decoded;
	}

	function splitHex(Hex) {
		var arr = new Array();
		var x = 0;

		if ((Hex.length % 2) != 0) {
			Hex = "0" + Hex;
		}

		for (var c = 0; c < Hex.length; c++) {
			if ((c % 2) == 0) {
				var h = Hex.substring(c, c+2);
				var b = Hex2Bin(h);

				var bits = {
					Hex: h,
					Bin: b
				};
				arr[x] = bits;
				x++;
			}
		}

		return arr;
	}

	function DataHex(bin) {
		var Hex = Bin2Hex(bin);
		if ((Hex.length % 2) != 0) {
			Hex = "0" + Hex;
		}
		return Hex;
	}

	function XOR (obj) {
		
		var keep = Bin2Dec(obj[0].Bin);
		for (var x = 1; x < obj.length; x++) {
			//console.log(x + " = " + keep);
			keep = keep ^ Bin2Dec(obj[x].Bin);
		}

		var Bin = Dec2Bin(keep);
		var Hex = Bin2Hex(Bin);

		return { Bin: Bin, Hex: Hex};
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

	function Dec2Bin(s) {
		return parseInt(s, 10).toString(2);
	}

	function Bin2Dec(s) {
		return parseInt(s, 2);
	}
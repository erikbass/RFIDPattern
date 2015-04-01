function DecodeController ($scope) {

	$scope.showtooltip = false;
	$scope.value = '3074257B80625F0000000002';


	$scope.hideTooltip = function () {
		$scope.showtooltip = false;
	}

	$scope.toggleTooltip = function (e) {
		e.stopPropagation ();
		$scope.showtooltip = !$scope.showtooltip;
	}
}
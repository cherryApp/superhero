// Direktíva létrehozása.
superhero.directive("calcBrutto", [
    function () {
        return {
            restrict: "EA",
            scope: {
                label: '@myLabel',
                amount: '=',
                rate: '@'
            },
            templateUrl: '/templates/calcBrutto',
            link: function( $scope, el, attr ) {
                console.log( arguments );
                $scope.rate = $scope.rate ? parseFloat($scope.rate) : 1.27;
                $scope.calcBrutto = function(a) {
                    var a = parseFloat(
                                parseInt(a) * $scope.rate
                            );
                    return Math.round(a * 100) / 100;
                };
            }
        };
    }
]);

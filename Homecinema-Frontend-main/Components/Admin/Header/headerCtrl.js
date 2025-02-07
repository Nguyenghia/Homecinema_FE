app.controller("headerCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", function ($scope, $rootScope, $http, $window, $timeout, $location) {
    //-------------------------------------------------- Biến môi trường
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    
    $scope.isActive = function (viewLocation) {
        return $location.path().indexOf(viewLocation) !== -1;
    };
    //-------------------------------------------------- Xử lí tiện ích
    
    $scope.logout = function(){
        $rootScope.MyAccount = null;
        $rootScope.detailAccount = null;
        $rootScope.historyEpisode = [];
        localStorage.removeItem("account");
        localStorage.removeItem("detailAccount");
        localStorage.removeItem("historyEpisode");
        $location.path("/home");
    }
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);
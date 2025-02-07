app.controller("HomeCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", function ($scope, $rootScope, $http, $window, $timeout) {
    //-------------------------------------------------- Biến môi trường
    $scope.listTapPhimMoi = [];
    $scope.listPhimMoi = [];
    $scope.listPhimRandom = [];
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    
    
    
    //-------------------------------------------------- Xử lí tiện ích
    $scope.getAllMovieNew = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `phim/phimmoi`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listPhimMoi = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }

    $scope.getRandomMovie = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `phim/random`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listPhimRandom = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }
    
    $scope.getAllEposodeNew = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `tapphim/tapphimmoi`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listTapPhimMoi = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }
    $scope.getAllEposodeNew();
    $scope.getAllMovieNew();
    $scope.getRandomMovie();

    $timeout(function() {
        $('.carousel').flickity({
            autoPlay: 2000,
            contain: true,
            wrapAround: true,
            pageDots: false
        });
    }, 1000);
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);
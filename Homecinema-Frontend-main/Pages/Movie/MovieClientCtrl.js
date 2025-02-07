app.controller("MovieClientCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$routeParams", function ($scope, $rootScope, $http, $window, $timeout, $routeParams) {
    //-------------------------------------------------- Biến môi trường
    $scope.id = $routeParams.id;
    $scope.listCategories = [];
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    
    
    
    //-------------------------------------------------- Xử lí tiện ích
    
    $scope.getDetailPhim = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `phim/${$scope.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.phim = {
                    idPhim: response.data.result.idPhim,
                    tenPhim: response.data.result.tenPhim,
                    hinhPhim: response.data.result.hinhPhim,
                    moTa: response.data.result.moTa,
                    tacGia: response.data.result.tacGia,
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
        await $scope.getOneTapPhim();
    }
    $scope.getOneTapPhim = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `tapphim/byPhim/${$scope.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                if(response.data.result[0] != undefined){
                    $scope.idTapPhim = response.data.result[0].idTapphim;
                }else{
                    $scope.idTapPhim = 0;
                }
               
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }
    $scope.getAllCategoryByIdMovie = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloaiphim/${$scope.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                for (const element of  response.data.result) {
                    $scope.getDetailCategory(element);
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }

    $scope.getDetailCategory = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloai/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.listCategories.push(response.data.result)
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }
    
    $scope.getDetailPhim();
    $scope.getAllCategoryByIdMovie();
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);
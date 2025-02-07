app.controller("header_userCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", function ($scope, $rootScope, $http, $window, $timeout, $location) {
    //-------------------------------------------------- Biến môi trường

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường	
    $scope.listCategories = [];
    //-------------------------------------------------- Xử lí tiện ích

    $scope.getRandomCategory = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloai/random`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listCategories = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }

    $scope.search = async function (value) {
        $location.path(`/search/keywords/${value}`);
    }

    $scope.getRandomCategory();
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);
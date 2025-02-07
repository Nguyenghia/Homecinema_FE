app.controller("FormCategoryCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", "$routeParams", function ($scope, $rootScope, $http, $window, $timeout, $location, $routeParams) {
    //-------------------------------------------------- Biến môi trường
    $scope.flagAlert_true = false;
    $scope.flagAlert_false = false;
    $scope.flagAlertNotExits_true = false;
    $scope.id = $routeParams.id;
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadAdmin();
    $scope.addCategory = async function (category) {
        await $http({
            method: 'POST',
            url: $rootScope.Host + `theloai/add`,
            data: {tenLoai: category.tenLoai },
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.flagAlert_true = true;
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.flagAlert_false = true;
            }
        )
    }
    $scope.editCategory = async function (category) {
        await $http({
            method: 'PUT',
            url: $rootScope.Host + `theloai/${category.idLoai}`,
            data: {idLoai: category.idLoai , tenLoai: category.tenLoai},
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.flagAlert_true = true;
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.flagAlert_false = true;
            }
        )
    }
    $scope.getDetailCategory = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloai/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.category = {
                    idLoai: response.data.result.idLoai,
                    tenLoai: response.data.result.tenLoai
                }
            },
            function errorCallback(response) { 			// Nếu thất bại
               if(response.status == 401){
                $scope.flagAlertNotExits_true = true;
               }
            }
        )
    }
    $scope.resetForm = function () {
        if(confirm('Bạn có muốn để giá trị mặc định?')){
            $scope.category = {
                idLoai: "",
                nameLoai: "",
            }
        }
    };
    if($scope.id!=undefined || $scope.id != null) {
        $scope.getDetailCategory($scope.id);
    }
    // 
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);
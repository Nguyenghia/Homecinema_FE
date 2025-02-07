app.controller("FormUserCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", "$routeParams", function ($scope, $rootScope, $http, $window, $timeout, $location, $routeParams) {
    //-------------------------------------------------- Biến môi trường
    $scope.flagAlert_true = false;
    $scope.flagAlert_false = false;
    $scope.flagAlertNotExits_true = false;
    $scope.id = $routeParams.id;
    $scope.user={
        vaiTro: ""
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadAdmin();
    $scope.addUser = async function (user) {
        await $http({
            method: 'POST',
            url: $rootScope.Host + `user/add`,
            data: {gmail: user.email, matKhau: user.pass, vaiTro: user.vaiTro },
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
    $scope.editUser = async function (user) {
        await $http({
            method: 'PUT',
            url: $rootScope.Host + `user/${user.email}`,
            data: {gmail: user.email, matKhau: user.pass, vaiTro: user.vaiTro },
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.flagAlert_true = true;
            },
            function errorCallback(response) { 			// Nếu thất bại
                console.log(response)
                $scope.flagAlert_false = true;
            }
        )
    }
    $scope.getDetailUser = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `user/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                console.log(response)
                $scope.user = {
                    email: response.data.result.gmail,
                    vaiTro: response.data.result.vaiTro + ""
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
            $scope.user = {
                email: "",
                pass: "",
                vaiTro: "",
            }
        }
    };
    if($scope.id!=undefined || $scope.id != null) {
        $scope.getDetailUser($scope.id);
    }
    // 
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);
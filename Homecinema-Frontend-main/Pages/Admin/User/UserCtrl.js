app.controller("UserCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", function ($scope, $rootScope, $http, $window, $timeout, $location) {
    //-------------------------------------------------- Biến môi trường
    $scope.listUsers = [];
    $scope.flagAlert_true = false;
    $scope.flagAlert_false = false;
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadAdmin();
    $scope.deleteUser = async function (id) {
        if(confirm("Bạn có muốn xóa")){
            await $http({
                method: 'DELETE',
                url: $rootScope.Host + `user/${id}`,
                headers: {
                    'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                    'Content-Type': 'application/json'
                }
            }).then(
                function successCallback(response){			// Nếu thành công
                    $scope.getAllUser();
                    $scope.flagAlert_true = true;
                },
                function errorCallback(response) { 			// Nếu thất bại
                    $scope.flagAlert_false = true;
                }
            )
        }
    }
    $scope.getAllUser = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `user/all`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}` // include the token in the header
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listUsers = response.data.result;
               
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }
    $scope.getAllUser();
    $timeout(function() {
        $('#user').DataTable({
            "paging" : true,
            "lengthChange" : false,
            "searching" : false,
            "ordering" : true,
            "info" : true,
            "autoWidth" : false,
            "responsive" : true,
            "pageLength": 7,
        });
    }, 2000);
    // 
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);
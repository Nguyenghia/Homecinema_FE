app.controller("MovieCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", function ($scope, $rootScope, $http, $window, $timeout, $location) {
    //-------------------------------------------------- Biến môi trường
    $scope.listMovie = [];
    $scope.flagAlert_true = false;
    $scope.flagAlert_false = false;
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadAdmin();
    $scope.deleteMovie = async function (id) {
        if(confirm("Bạn có muốn xóa")){
            await $scope.deleteMovieCate(id);
            await $http({
                method: 'DELETE',
                url: $rootScope.Host + `phim/${id}`,
                headers: {
                    'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                    'Content-Type': 'application/json'
                }
            }).then(
                function successCallback(response){			// Nếu thành công
                    $scope.getAllMovie();
                    $scope.flagAlert_true = true;
                },
                function errorCallback(response) { 			// Nếu thất bại
                    $scope.flagAlert_false = true;
                }
            )
        }
    }
    $scope.deleteMovieCate = async function (id) {
        await $http({
            method: 'DELETE',
            url: $rootScope.Host + `theloaiphim/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.flagAlert_true = true;
            },
            function errorCallback(response) { 			// Nếu thất bại
                $scope.flagAlert_false = true;
            }
        )
    }
    $scope.getAllMovie = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `phim/all`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}` // include the token in the header
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listMovie = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }
    $scope.getAllMovie();
    $timeout(function() {
        $('#movie').DataTable({
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
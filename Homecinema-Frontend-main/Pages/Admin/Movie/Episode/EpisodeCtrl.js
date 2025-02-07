app.controller("EpisodeCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", "$routeParams", function ($scope, $rootScope, $http, $window, $timeout, $location, $routeParams) {
    //-------------------------------------------------- Biến môi trường
    $scope.listEpisode = [];
    $scope.id = $routeParams.id;
    $scope.flagAlert_true = false;
    $scope.flagAlert_false = false;
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadAdmin();
    $scope.deleteEpisode = async function (id) {
        if(confirm("Bạn có muốn xóa")){
            await $http({
                method: 'DELETE',
                url: $rootScope.Host + `tapphim/${id}`,
                headers: {
                    'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                    'Content-Type': 'application/json'
                }
            }).then(
                function successCallback(response){			// Nếu thành công
                    $scope.getAllEpisode($scope.id);
                    $scope.flagAlert_true = true;
                },
                function errorCallback(response) { 			// Nếu thất bại
                    $scope.flagAlert_false = true;
                }
            )
        }
    }
    $scope.getAllEpisode = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `tapphim/byPhim/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}` // include the token in the header
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listEpisode = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }
    if($scope.id!=undefined || $scope.id != null) {
        $scope.getAllEpisode($scope.id);
    }
   
    $timeout(function() {
        $('#episode').DataTable({
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
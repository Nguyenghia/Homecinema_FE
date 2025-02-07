app.controller("AdminCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout", "$location", function ($scope, $rootScope, $http, $window, $timeout, $location) {
    //-------------------------------------------------- Biến môi trường
    $scope.listEpisodes = [];
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadAdmin();
    $scope.getTop5Episode = async function () {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `tapphim/top-5-views`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}` // include the token in the header
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listEpisodes = response.data.result;
                new Chart($('#myChart'), {
                    type: 'bar',
                    data: {
                        labels: $scope.listEpisodes.map(item => item.linkVideo),
                        datasets: [{
                            label: "views",
                            data: $scope.listEpisodes.map(item => item.luotXem),
                            borderWidth: 1,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                            'rgba(255, 99, 132)',
                                'rgba(255, 159, 64)',
                                'rgba(54, 162, 235)',
                                'rgba(153, 102, 255)',
                                'rgba(54, 162, 235)'
                            ],
                        }
                        ]
                    }
                    
                });
               
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }
    

    $scope.getTop5Episode();

    

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);
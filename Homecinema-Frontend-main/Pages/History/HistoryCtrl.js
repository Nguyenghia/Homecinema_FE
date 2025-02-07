app.controller("HistoryCtrl", ["$scope", "$rootScope", "$http", "$location", "$window", "$timeout", "$interval", function ($scope, $rootScope, $http, $location, $window, $timeout, $translate, $interval) {
    //-------------------------------------------------- Biến môi trường
    
    $scope.listEpisode = [];
    $scope.checkflag = $location.path().includes("history");
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    
    //-------------------------------------------------- Xử lí tiện ích
    $rootScope.onloadUser();
    $scope.getAllEpisodeById = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `tapphim/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            async function successCallback(response) {			// Nếu thành công
                $scope.episode = {
                    idPhim: response.data.result.phim.idPhim,
                    tenPhim: response.data.result.phim.tenPhim,
                    idTapphim: response.data.result.idTapphim,
                    tenTapPhim: response.data.result.tenTapphim,
                    hinhTapPhim: response.data.result.hinhTapphim,
                    luotXem: response.data.result.luotXem,
                    ngayTao: response.data.result.ngayTao,
                };
                $scope.listEpisode.unshift($scope.episode);
            },
            function errorCallback(response) { 			// Nếu thất bại
                console.error('Error fetching episode details:', response);
            }
        );
    };

    $scope.getAllEpisodeLikedById = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `yeuthich/getAllVideoLike/${id}`,
            headers: {
                'Authorization': `Bearer ${$rootScope.MyAccount}`, // include the token in the header
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response) {			// Nếu thành công
                response.data.result.forEach(id => {
                    $scope.getAllEpisodeById(id);
                });
            },
            function errorCallback(response) { 			// Nếu thất bại
                console.error('Error fetching episode details:', response);
            }
        );
    };

    if($scope.checkflag) {
        if($rootScope.historyEpisode.length > 0) {
            $rootScope.historyEpisode.forEach(id => {
                $scope.getAllEpisodeById(id);
            });
        }
    }else{
       $scope.getAllEpisodeLikedById($rootScope.detailAccount.gmail);
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
    }]);